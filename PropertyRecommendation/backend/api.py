import os
import pandas as pd
import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Setup FastAPI
app = FastAPI(title="Property Recommendation API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get absolute path to files
base_path = os.path.dirname(__file__)
csv_path = os.path.join(base_path, "Makaan_Properties_No_Duplicates.csv")
model_path = os.path.join(base_path, "knn_model.pkl")

# Load dataset
data = pd.read_csv(csv_path)

# Data Cleaning (from app.py)
if "Size" in data.columns:
    data["Size"] = pd.to_numeric(data["Size"].astype(str).str.replace(",", "").str.extract(r"(\d+)")[0], errors="coerce")
if "No_of_BHK" in data.columns:
    data["No_of_BHK"] = pd.to_numeric(data["No_of_BHK"].astype(str).str.extract(r"(\d+)")[0], errors="coerce")
if "Price" in data.columns:
    data["Price"] = pd.to_numeric(data["Price"].astype(str).str.replace(",", "", regex=True), errors="coerce")

# Drop NaN values
data.dropna(subset=["Size", "No_of_BHK", "Price", "Latitude", "Longitude"], inplace=True)

# Feature Selection
features = ["Size", "No_of_BHK", "City_name", "Property_type"]
target = "Price"

# Load Model
if os.path.exists(model_path):
    knn_model = joblib.load(model_path)
else:
    raise Exception("Model file not found. Please train the model first.")

# Function to format price
def format_price(price):
    if price >= 1_00_00_000:
        return f"₹{price / 1_00_00_000:.2f} Cr"
    elif price >= 1_00_000:
        return f"₹{price / 1_00_000:.2f} L"
    else:
        return f"₹{price:.2f}"

# Pydantic Models
class RecommendationRequest(BaseModel):
    city: str
    property_type: str
    bhk: int
    size: int

class PropertyResponse(BaseModel):
    Property_Name: str
    City_name: str
    Property_type: str
    No_of_BHK: int
    Price_per_sqft: float
    Size: float
    Price: str
    Future_Price: str
    Locality_Name: str
    Property_status: str
    Latitude: float
    Longitude: float

@app.get("/api/options")
def get_options():
    cities = sorted(data["City_name"].dropna().unique().tolist())
    property_types = sorted(data["Property_type"].dropna().unique().tolist())
    bhks = sorted([bhk for bhk in data["No_of_BHK"].dropna().unique().tolist() if 1 <= bhk <= 5])
    return {
        "cities": cities,
        "property_types": property_types,
        "bhks": bhks
    }

@app.post("/api/recommend", response_model=List[PropertyResponse])
def recommend_properties(req: RecommendationRequest):
    try:
        input_data = pd.DataFrame([[req.size, req.bhk, req.city, req.property_type]], columns=features)
        predicted_price = knn_model.predict(input_data)[0]

        recommended_properties = data[
            (data["City_name"] == req.city) &
            (data["Property_type"] == req.property_type) &
            (data["No_of_BHK"] == req.bhk) &
            (data["Price"].between(predicted_price * 0.8, predicted_price * 1.2))
        ].copy()

        appreciation_rate = 0.05
        years = 5
        recommended_properties["Future_Price"] = recommended_properties["Price"] * ((1 + appreciation_rate) ** years)

        results = []
        for _, row in recommended_properties.iterrows():
            price_per_sqft = float(row["Price"]) / row["Size"] if row["Size"] > 0 else 0
            
            results.append({
                "Property_Name": row.get("Property_Name", "Unknown"),
                "City_name": row["City_name"],
                "Property_type": row["Property_type"],
                "No_of_BHK": int(row["No_of_BHK"]),
                "Price_per_sqft": price_per_sqft,
                "Size": float(row["Size"]),
                "Price": format_price(row["Price"]),
                "Future_Price": format_price(row["Future_Price"]),
                "Locality_Name": row.get("Locality_Name", "Unknown"),
                "Property_status": row.get("Property_status", "Unknown"),
                "Latitude": float(row["Latitude"]),
                "Longitude": float(row["Longitude"])
            })

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
