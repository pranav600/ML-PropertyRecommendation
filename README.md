# 🏠 ML Property Recommendation

> An AI-powered full-stack property recommendation platform that predicts real estate prices using Machine Learning and suggests properties based on your preferences.

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.5+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)

---

## ✨ Features

- 🤖 **AI Price Prediction** — Uses a trained K-Nearest Neighbors (KNN) model to predict property prices based on your inputs
- 📊 **Smart Filtering** — Recommends properties within ±20% of the predicted price range
- 📈 **5-Year Future Price Estimate** — Projects appreciation at a 5% annual rate for smarter investment decisions
- 🌙 **Dark Mode** — Elegant dark/light theme toggle with smooth Framer Motion animations
- 📱 **Fully Responsive** — Works seamlessly across all screen sizes
- 🗺️ **Google Maps Integration** — Direct links to view any property location on the map
- 🔄 **Paginated Results** — Displays up to 12 properties per page (4 columns × 3 rows)
- ⚡ **Fast API** — FastAPI backend with millisecond response times

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | FastAPI, Uvicorn, Pydantic |
| **ML Model** | scikit-learn (KNN Regressor), pandas, joblib |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
ML-PropertyRecommendation/
│
├── PropertyRecommendation/
│   ├── backend/                  # FastAPI Python backend
│   │   ├── api.py                # Main API with endpoints
│   │   ├── app.py                # Original Streamlit app (legacy)
│   │   ├── model.ipynb           # Model training notebook
│   │   ├── knn_model.pkl         # Trained KNN model
│   │   ├── scaler.pkl            # Data scaler
│   │   ├── Makaan_Properties_No_Duplicates.csv  # Dataset
│   │   └── requirements.txt      # Python dependencies
│   │
│   └── frontend/                 # Next.js frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx      # Main search & results UI
│       │   │   ├── layout.tsx    # Root layout with Navbar & Footer
│       │   │   └── globals.css   # Global styles & color tokens
│       │   └── components/
│       │       ├── Navbar.tsx    # Responsive navbar with dark mode toggle
│       │       ├── Footer.tsx    # Site footer
│       │       └── ThemeProvider.tsx  # Dark/light mode context
│       └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+
- **npm** 9+

---

### 1. Clone the Repository

```bash
git clone https://github.com/pranav600/ML-PropertyRecommendation.git
cd ML-PropertyRecommendation/PropertyRecommendation
```

---

### 2. Start the Backend

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn api:app --reload --port 8000
```

The backend will be available at: **http://localhost:8000**
Interactive API docs: **http://localhost:8000/docs**

---

### 3. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at: **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/options` | Returns available cities, property types, and BHK options |
| `POST` | `/api/recommend` | Returns AI-recommended properties based on user input |

### Sample Request — `/api/recommend`

```json
{
  "city": "Ahmedabad",
  "property_type": "Apartment",
  "bhk": 2,
  "size": 1000
}
```

### Sample Response

```json
[
  {
    "Property_Name": "Trilokesh Gulmohar Nirvana II",
    "City_name": "Ahmedabad",
    "Property_type": "Apartment",
    "No_of_BHK": 2,
    "Size": 1050.0,
    "Price": "₹45.00 L",
    "Future_Price": "₹57.43 L",
    "Locality_Name": "Bopal",
    "Property_status": "Ready to move",
    "Latitude": 23.034,
    "Longitude": 72.471
  }
]
```

---

## 🤖 How the ML Model Works

1. **Dataset** — Uses the `Makaan_Properties_No_Duplicates.csv` dataset with real Indian property listings.
2. **Preprocessing** — Cleans size, BHK, and price columns; drops nulls; applies `OrdinalEncoder` for categorical features via a `Pipeline`.
3. **Model** — A `KNeighborsRegressor` with `k=5` and euclidean distance is trained on features: `[Size, No_of_BHK, City_name, Property_type]`.
4. **Prediction** — Given user inputs, the model predicts a target price, then filters real listings within ±20% of that price.
5. **Future Estimation** — A 5% annual compound appreciation rate is applied to estimate the 5-year value.

---

## 🎨 Design System

The UI uses a **Golden Taupe** color palette for a luxurious and premium feel:

| Token | Color | Usage |
|---|---|---|
| `--color-primary` | `#D4AF37` | Accent, buttons, highlights |
| `--color-secondary` | `#BDB76B` | Secondary elements |
| `--color-accent` | `#CE8946` | Hover states, price labels |
| `--color-lightbg` | `#FDFBD4` | Light background |

---

## 📸 UI Highlights

- **3D Hero Section** — Entrance animations using `framer-motion` with `rotateX` perspective transforms
- **Animated Dark Mode Toggle** — Sun/moon icons animate in/out with a rotate + slide transition
- **Property Cards** — Hover glow, zoom-on-image, and smooth border transitions
- **Pagination** — Arrow icon navigation with auto-scroll back to the top of results

---

## 👨‍💻 Developer

**Pranav** — Full Stack & ML Developer

> Built with ❤️ using FastAPI, Next.js, and scikit-learn.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
