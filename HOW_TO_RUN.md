# 🚀 PensionQuest: Setup & Technology Guide

This guide provides a comprehensive overview of the technology stack used in PensionQuest and step-by-step instructions on how to run the project locally.

## 🛠️ Technology Stack

### Frontend (Web)
* **Framework:** React.js 19
* **Build Tool:** Vite
* **Styling:** Tailwind CSS, Framer Motion (for animations)
* **Routing:** React Router DOM
* **Other:** Canvas-Confetti, Recharts, Lucide React (Icons)

### Frontend (Mobile)
* **Framework:** React Native (via Expo)

### Backend (API)
* **Framework:** FastAPI (Python 3.11+)
* **Database ORM:** SQLAlchemy (Async) with Alembic for migrations
* **Authentication:** Firebase Auth & JWT
* **Data Validation:** Pydantic

### Database & Infrastructure
* **Primary Database:** PostgreSQL 15
* **Caching & Leaderboards:** Redis 7.2
* **Containerization:** Docker & Docker Compose
* **Reverse Proxy:** Nginx

### AI & ML Engine
* **LLM Integration:** OpenAI / Google Generative AI (Gemini)
* **NLP Models:** Prompt engineering for the AI Pension Coach, Multilingual support via Translate APIs.

---

## 💻 How to Run the Project Locally

There are two primary ways to run the project. You can either run the individual services manually (best for active coding), or use Docker to spin up the entire backend stack at once.

### Option 1: Running Manually (Recommended for Active Development)

#### 1. Start the Backend Server (FastAPI)
You need Python 3.11+ installed on your system.
```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install the required dependencies
pip install -r requirements.txt

# Start the server (it will run on http://127.0.0.1:8000)
uvicorn app.main:app --reload
```
*API interactive documentation (Swagger UI) will automatically be generated and available at: **http://127.0.0.1:8000/docs***

#### 2. Start the Frontend Web App (React + Vite)
You need Node.js 20.x+ installed.
```bash
# Open a new terminal and navigate to the web frontend directory
cd frontend-web

# Install NPM dependencies
npm install

# Start the Vite development server (it will run on http://localhost:5173)
npm run dev
```

#### 3. Start the Frontend Mobile App (React Native Expo)
```bash
# Open a new terminal and navigate to the mobile frontend directory
cd frontend-mobile

# Install NPM dependencies
npm install

# Start the Expo development bundler
npx expo start
```
*You can scan the generated QR code with the Expo Go app on your phone to run the mobile app directly.*

---

### Option 2: Running with Docker (Backend, Database, Redis, Nginx)

If you have **Docker Desktop** installed and running, you can spin up the entire backend pipeline, including the PostgreSQL database and Redis, using Docker Compose safely.

```bash
# Navigate to the infrastructure directory
cd infra

# Start all containers in the background (detached mode)
docker-compose up -d
```
*Wait a few seconds for the database and containers to initialize. To view the status of your containers, you can run `docker ps`.*

---

## ⚙️ Environment Variables Setup

Before running the application, make sure your configurations are properly hooked up.

1. **Backend (`backend/.env`):**
   Copy the `backend/.env.example` file to `backend/.env` and update the necessary keys. Crucially, you will need to add your `OPENAI_API_KEY` or `GEMINI_API_KEY`, your database credentials, and any Firebase configs.

2. **Frontend Mobile (`frontend-mobile/.env`):**
   Copy `frontend-mobile/.env.example` to `frontend-mobile/.env` and make sure your API base URL points to your running backend (`http://localhost:8000` or your local IP address).
