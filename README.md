# PropFind: AI-Powered Property Recommendation 🏡

PropFind is a full-stack, AI-powered property recommendation engine designed to help users find their perfect real estate investments across India. The application not only searches for current available properties based on criteria like City, Locality, BHK, and Size, but also utilizes Machine Learning to **predict the estimated future price** of the property over the next 5 years. 

## 🛠️ Tech Stack
- **Frontend**: Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Lucide React
- **Backend**: Python, FastAPI, Scikit-Learn, Pandas

### 🧠 Machine Learning Model
The core recommendation engine relies on a **K-Nearest Neighbors (KNN) Regressor** trained on real estate data across India. 
- **Features Used**: Property Size (sqft), Number of BHKs, City, and Property Type.
- **Target**: Current Market Price
- **Recommendation Logic**: The model predicts an ideal baseline price for the user's requirements. It then filters the database for actual properties priced within a 20% variance (0.8x to 1.2x) of that prediction.
- **Future Valuation**: Estimated future prices are calculated using a compound annual growth rate (CAGR) model assuming a 5% baseline annual appreciation over 5 years.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Backend Setup (FastAPI & ML)
Navigate to the backend directory and start the Python API server.
```bash
cd backend

# Create a virtual environment and activate it (recommended)
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```
*The backend will be available at `http://localhost:8000`.*

### 2. Frontend Setup (Next.js)
Open a new terminal window, navigate to the frontend directory, and start the web application.
```bash
cd frontend

# Install Node.js dependencies
npm install

# Create environment variables file
# Make sure to add NEXT_PUBLIC_API_URL=http://localhost:8000 inside the .env.local file
touch .env.local 

# Run the development server
npm run dev
```
*The frontend will be available at `http://localhost:3000`.*

---

## 💡 Usage
1. Open `http://localhost:3000` in your browser.
2. The application will automatically check if the backend is running and display a status banner.
3. Select your desired City, Locality, Property Type, BHK, and Size.
4. Click **Search** to view property recommendations, estimated future prices, and view the properties directly on Google Maps.
