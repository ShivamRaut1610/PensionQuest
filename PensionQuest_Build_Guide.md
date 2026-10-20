# PensionQuest — Complete Developer Build Guide

> A Gamified NPS Awareness & Engagement Platform for Young India  
> PFRDA Hackathon 2026 | 8-Week PoC Build Plan

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Prerequisites & Installation](#3-prerequisites--installation)
4. [Environment Configuration](#4-environment-configuration)
5. [Database Setup](#5-database-setup)
6. [Backend — FastAPI](#6-backend--fastapi)
7. [Gamification Engine](#7-gamification-engine)
8. [AI Pension Coach](#8-ai-pension-coach)
9. [Multilingual NLP](#9-multilingual-nlp)
10. [Frontend — React Native & React.js](#10-frontend--react-native--reactjs)
11. [Retirement Simulator](#11-retirement-simulator)
12. [Retirement Avatar System](#12-retirement-avatar-system)
13. [Leaderboard with Redis](#13-leaderboard-with-redis)
14. [Push Notifications](#14-push-notifications)
15. [Security Architecture](#15-security-architecture)
16. [Cloud Deployment](#16-cloud-deployment)
17. [8-Week Sprint Plan](#17-8-week-sprint-plan)
18. [Team Responsibilities](#18-team-responsibilities)
19. [Testing Strategy](#19-testing-strategy)
20. [Demo Preparation](#20-demo-preparation)

---

## 1. Project Overview

### What We're Building

PensionQuest is a **mobile-first, AI-powered gamified platform** that makes NPS (National Pension System) engaging for Indians aged 18–35 through:

- **Daily Learning Quests** — Bite-sized NPS missions with XP rewards
- **Retirement Avatar** — Visual future-self that reacts to contribution behavior
- **AI Pension Coach** — LLM-powered personalized NPS guidance chatbot
- **Retirement Simulator** — Real-time drag-and-drop corpus projector
- **Leaderboards & Badges** — Social gamification layer for retention
- **Multilingual Support** — Hindi, Tamil, Telugu, Bengali, Marathi

### PoC Scope (What to Ship in 8 Weeks)

| Feature | Status |
|---|---|
| Daily Quest Module (10 quests, 3 levels) | Must Ship |
| AI Pension Coach (5+ scenarios) | Must Ship |
| Retirement Simulator (animated charts) | Must Ship |
| Retirement Avatar (3 states) | Must Ship |
| Leaderboard + 5 Badges | Must Ship |
| Hindi + English multilingual | Must Ship |
| Tamil, Telugu, Bengali, Marathi | Phase 2 |
| Live CRA API Integration | Phase 2 |

---

## 2. Repository Structure

```
pensionquest/
├── backend/                        # FastAPI Python backend
│   ├── app/
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── config.py               # Environment config
│   │   ├── database.py             # PostgreSQL connection
│   │   ├── redis_client.py         # Redis connection
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   ├── quest.py
│   │   │   ├── badge.py
│   │   │   ├── contribution.py
│   │   │   ├── streak.py
│   │   │   └── leaderboard.py
│   │   ├── routers/                # API route handlers
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── quests.py
│   │   │   ├── gamification.py
│   │   │   ├── simulator.py
│   │   │   ├── ai_coach.py
│   │   │   ├── contributions.py
│   │   │   └── notifications.py
│   │   ├── services/               # Business logic layer
│   │   │   ├── xp_service.py
│   │   │   ├── badge_service.py
│   │   │   ├── streak_service.py
│   │   │   ├── leaderboard_service.py
│   │   │   ├── ai_service.py
│   │   │   ├── simulator_service.py
│   │   │   └── notification_service.py
│   │   ├── schemas/                # Pydantic request/response schemas
│   │   │   ├── user.py
│   │   │   ├── quest.py
│   │   │   └── ai_coach.py
│   │   └── utils/
│   │       ├── auth.py             # JWT utilities
│   │       ├── encryption.py       # AES-256 helpers
│   │       └── nps_calculator.py   # Rule-based NPS math
│   ├── migrations/                 # Alembic DB migrations
│   ├── tests/                      # Pytest test suite
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend-mobile/                # React Native (Expo) app
│   ├── src/
│   │   ├── screens/
│   │   │   ├── Onboarding/
│   │   │   ├── Dashboard/
│   │   │   ├── Quest/
│   │   │   ├── Simulator/
│   │   │   ├── AICoach/
│   │   │   ├── Leaderboard/
│   │   │   └── Profile/
│   │   ├── components/
│   │   │   ├── Avatar/
│   │   │   ├── QuestCard/
│   │   │   ├── BadgeModal/
│   │   │   ├── XPBar/
│   │   │   └── Charts/
│   │   ├── services/               # API call functions
│   │   ├── store/                  # Zustand or Redux state
│   │   ├── i18n/                   # Language files (en, hi)
│   │   └── utils/
│   ├── app.json
│   ├── package.json
│   └── .env.example
│
├── frontend-web/                   # React.js web app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── i18n/
│   ├── package.json
│   └── .env.example
│
├── ml/                             # AI & NLP scripts
│   ├── pension_coach_prompts.py    # LLM prompt templates
│   ├── multilingual_handler.py     # IndicBERT / Translate API
│   └── nps_knowledge_base.json     # NPS rules & FAQs
│
├── infra/                          # Docker & deployment configs
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── aws/
│       ├── ec2-setup.sh
│       └── rds-init.sql
│
├── docs/
│   ├── api-spec.yaml               # OpenAPI / Swagger spec
│   └── database-schema.dbml        # DB diagram source
│
└── README.md
```

---

## 3. Prerequisites & Installation

### System Requirements

```bash
# Required versions
Python        >= 3.11
Node.js       >= 20.x
npm           >= 10.x
PostgreSQL    >= 15
Redis         >= 7.2
Docker        >= 24.x
Expo CLI      >= 6.x
```

### Install All Tools (macOS)

```bash
# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python
brew install python@3.11

# Node.js
brew install node

# PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# Redis
brew install redis
brew services start redis

# Docker Desktop
# Download from https://www.docker.com/products/docker-desktop

# Expo CLI
npm install -g expo-cli eas-cli

# Git
brew install git
```

### Install All Tools (Ubuntu / Linux)

```bash
# Python
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip -y

# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# PostgreSQL
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql

# Redis
sudo apt install redis-server -y
sudo systemctl start redis

# Docker
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
```

### Clone & Initialize the Repository

```bash
git clone https://github.com/your-org/pensionquest.git
cd pensionquest

# Backend setup
cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Mobile frontend setup
cd ../frontend-mobile
npm install

# Web frontend setup
cd ../frontend-web
npm install
```

### Backend requirements.txt

```txt
fastapi==0.111.0
uvicorn[standard]==0.30.0
sqlalchemy==2.0.30
alembic==1.13.1
asyncpg==0.29.0
psycopg2-binary==2.9.9
redis==5.0.4
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.9
pydantic==2.7.1
pydantic-settings==2.2.1
openai==1.30.1
google-generativeai==0.5.4
httpx==0.27.0
python-dotenv==1.0.1
firebase-admin==6.5.0
pytest==8.2.1
pytest-asyncio==0.23.7
cryptography==42.0.7
slowapi==0.1.9
```

---

## 4. Environment Configuration

### backend/.env

```env
# App
APP_NAME=PensionQuest
APP_ENV=development
DEBUG=true
SECRET_KEY=your-super-secret-key-min-32-chars-long

# Database
DATABASE_URL=postgresql+asyncpg://pensionquest:password@localhost:5432/pensionquest_db
DATABASE_POOL_SIZE=10
DATABASE_MAX_OVERFLOW=20

# Redis
REDIS_URL=redis://localhost:6379/0
REDIS_TTL_SECONDS=3600

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080

# AI — Choose one
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AI...
AI_PROVIDER=openai

# Google Translate
GOOGLE_TRANSLATE_API_KEY=...

# Firebase
FIREBASE_CREDENTIALS_PATH=./firebase-service-account.json

# Encryption
AES_KEY=your-32-byte-aes-key-here
```

### frontend-mobile/.env

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000/api
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
```

---

## 5. Database Setup

### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create DB and user
CREATE DATABASE pensionquest_db;
CREATE USER pensionquest WITH ENCRYPTED PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE pensionquest_db TO pensionquest;
\q
```

### SQLAlchemy Models

**backend/app/models/user.py**
```python
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.database import Base

class AvatarState(str, enum.Enum):
    THRIVING = "thriving"
    STABLE = "stable"
    STRUGGLING = "struggling"
    CRITICAL = "critical"
    ZERO = "zero"

class LanguagePreference(str, enum.Enum):
    EN = "en"
    HI = "hi"
    TA = "ta"
    TE = "te"
    BN = "bn"
    MR = "mr"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20), unique=True, nullable=True)
    age = Column(Integer, nullable=False)
    income_range = Column(String(50), nullable=True)  # "20000-30000"
    risk_profile = Column(String(20), default="moderate")
    retirement_age = Column(Integer, default=60)
    language = Column(Enum(LanguagePreference), default=LanguagePreference.EN)
    avatar_state = Column(Enum(AvatarState), default=AvatarState.ZERO)
    total_xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    is_nps_enrolled = Column(Boolean, default=False)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    contributions = relationship("Contribution", back_populates="user")
    quest_progress = relationship("QuestProgress", back_populates="user")
    badges = relationship("UserBadge", back_populates="user")
    streaks = relationship("Streak", back_populates="user", uselist=False)
```

**backend/app/models/quest.py**
```python
from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import uuid
import enum
from app.database import Base

class QuestDifficulty(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class Quest(Base):
    __tablename__ = "quests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    title_hi = Column(String(200))          # Hindi translation
    description = Column(Text)
    description_hi = Column(Text)
    difficulty = Column(Enum(QuestDifficulty), nullable=False)
    xp_reward = Column(Integer, nullable=False)
    options = Column(JSONB)                  # {"a": "...", "b": "...", "c": "...", "d": "..."}
    options_hi = Column(JSONB)              # Hindi options
    correct_answer = Column(String(1))       # "a", "b", "c", or "d"
    explanation = Column(Text)
    explanation_hi = Column(Text)
    badge_id = Column(UUID(as_uuid=True), ForeignKey("badges.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    order_index = Column(Integer, default=0)

class QuestProgress(Base):
    __tablename__ = "quest_progress"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    quest_id = Column(UUID(as_uuid=True), ForeignKey("quests.id"), nullable=False)
    completed_at = Column(DateTime(timezone=True))
    xp_earned = Column(Integer, default=0)
    answer_given = Column(String(1))
    is_correct = Column(Boolean)

    user = relationship("User", back_populates="quest_progress")
    quest = relationship("Quest")
```

**backend/app/models/badge.py**
```python
from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
import enum
from app.database import Base

class BadgeCategory(str, enum.Enum):
    LEARNING = "learning"
    STREAK = "streak"
    CONTRIBUTION = "contribution"
    SOCIAL = "social"
    SPECIAL = "special"

class Badge(Base):
    __tablename__ = "badges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    category = Column(Enum(BadgeCategory), nullable=False)
    icon_url = Column(String(500))
    trigger_type = Column(String(50))       # "quest_count", "streak_days", "contribution_amount"
    trigger_value = Column(Integer)         # e.g., 10 quests, 7 days, 5000 rupees
    xp_bonus = Column(Integer, default=0)

class UserBadge(Base):
    __tablename__ = "user_badges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    badge_id = Column(UUID(as_uuid=True), ForeignKey("badges.id"), nullable=False)
    unlocked_at = Column(DateTime(timezone=True))

    user = relationship("User", back_populates="badges")
    badge = relationship("Badge")
```

**backend/app/models/contribution.py**
```python
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Contribution(Base):
    __tablename__ = "contributions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    source = Column(String(50), default="manual")   # "manual", "employer", "auto"
    contributed_at = Column(DateTime(timezone=True), server_default=func.now())
    financial_year = Column(String(10))              # "2025-26"

    user = relationship("User", back_populates="contributions")
```

**backend/app/models/streak.py**
```python
from sqlalchemy import Column, Integer, DateTime, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.database import Base

class Streak(Base):
    __tablename__ = "streaks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    last_active_date = Column(Date)

    user = relationship("User", back_populates="streaks")
```

### Run Migrations

```bash
cd backend

# Initialize Alembic
alembic init migrations

# Edit migrations/env.py to import your models
# Generate first migration
alembic revision --autogenerate -m "initial_schema"

# Apply migration
alembic upgrade head
```

### Seed NPS Quest Data

**backend/scripts/seed_quests.py**
```python
import asyncio
from app.database import AsyncSessionLocal
from app.models.quest import Quest, QuestDifficulty

QUESTS = [
    {
        "title": "What is NPS?",
        "title_hi": "NPS क्या है?",
        "description": "National Pension System (NPS) is a government-sponsored pension scheme launched in 2004. Which organization regulates NPS?",
        "description_hi": "राष्ट्रीय पेंशन प्रणाली (NPS) 2004 में शुरू की गई सरकारी पेंशन योजना है। NPS को कौन सी संस्था नियंत्रित करती है?",
        "difficulty": QuestDifficulty.BEGINNER,
        "xp_reward": 50,
        "options": {"a": "RBI", "b": "SEBI", "c": "PFRDA", "d": "IRDAI"},
        "options_hi": {"a": "आरबीआई", "b": "सेबी", "c": "पीएफआरडीए", "d": "इरडाई"},
        "correct_answer": "c",
        "explanation": "PFRDA (Pension Fund Regulatory and Development Authority) regulates and develops the pension sector in India.",
        "explanation_hi": "पीएफआरडीए (पेंशन फंड विनियामक और विकास प्राधिकरण) भारत में पेंशन क्षेत्र को नियंत्रित और विकसित करता है।"
    },
    {
        "title": "Tier I vs Tier II Accounts",
        "title_hi": "टियर I बनाम टियर II खाते",
        "description": "NPS has two types of accounts. Which account is mandatory and has tax benefits under Section 80CCD?",
        "description_hi": "NPS में दो प्रकार के खाते होते हैं। धारा 80CCD के तहत कर लाभ के साथ कौन सा खाता अनिवार्य है?",
        "difficulty": QuestDifficulty.BEGINNER,
        "xp_reward": 50,
        "options": {"a": "Tier II", "b": "Tier I", "c": "Both", "d": "Neither"},
        "options_hi": {"a": "टियर II", "b": "टियर I", "c": "दोनों", "d": "कोई नहीं"},
        "correct_answer": "b",
        "explanation": "Tier I is the mandatory pension account with tax deductions. Tier II is voluntary with no lock-in.",
        "explanation_hi": "टियर I कर कटौती के साथ अनिवार्य पेंशन खाता है। टियर II स्वैच्छिक है और इसमें कोई लॉक-इन नहीं है।"
    },
    {
        "title": "Tax Benefits of NPS",
        "title_hi": "NPS के कर लाभ",
        "description": "Under Section 80CCD(1B), NPS offers an exclusive additional deduction. What is the maximum additional deduction allowed?",
        "description_hi": "धारा 80CCD(1B) के तहत NPS एक विशेष अतिरिक्त कटौती प्रदान करता है। अधिकतम अतिरिक्त कटौती कितनी है?",
        "difficulty": QuestDifficulty.INTERMEDIATE,
        "xp_reward": 150,
        "options": {"a": "₹25,000", "b": "₹1,50,000", "c": "₹50,000", "d": "₹75,000"},
        "options_hi": {"a": "₹25,000", "b": "₹1,50,000", "c": "₹50,000", "d": "₹75,000"},
        "correct_answer": "c",
        "explanation": "Under 80CCD(1B), you can claim an additional ₹50,000 deduction over and above the ₹1.5 lakh limit under 80C.",
        "explanation_hi": "80CCD(1B) के तहत, आप 80C की ₹1.5 लाख सीमा के ऊपर अतिरिक्त ₹50,000 की कटौती का दावा कर सकते हैं।"
    },
    # Add 7 more quests here...
]

async def seed():
    async with AsyncSessionLocal() as session:
        for q_data in QUESTS:
            quest = Quest(**q_data)
            session.add(quest)
        await session.commit()
        print(f"Seeded {len(QUESTS)} quests.")

if __name__ == "__main__":
    asyncio.run(seed())
```

---

## 6. Backend — FastAPI

### App Entry Point

**backend/app/main.py**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.routers import auth, users, quests, gamification, simulator, ai_coach, contributions, notifications
from app.database import engine, Base

app = FastAPI(
    title="PensionQuest API",
    description="Backend API for PensionQuest — Gamified NPS Platform",
    version="1.0.0"
)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pensionquest.in"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/user", tags=["Users"])
app.include_router(quests.router, prefix="/api/quests", tags=["Quests"])
app.include_router(gamification.router, prefix="/api/gamification", tags=["Gamification"])
app.include_router(simulator.router, prefix="/api/simulator", tags=["Simulator"])
app.include_router(ai_coach.router, prefix="/api/ai", tags=["AI Coach"])
app.include_router(contributions.router, prefix="/api/contributions", tags=["Contributions"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "PensionQuest API"}
```

### Database Connection

**backend/app/database.py**
```python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    pool_size=settings.DATABASE_POOL_SIZE,
    max_overflow=settings.DATABASE_MAX_OVERFLOW,
    echo=settings.DEBUG
)

AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
```

### Authentication Router

**backend/app/routers/auth.py**
```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from firebase_admin import auth as firebase_auth
import firebase_admin
from firebase_admin import credentials

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.utils.auth import create_jwt_token
from app.config import settings

# Initialize Firebase
cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
firebase_admin.initialize_app(cred)

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=201)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Register a new user. Firebase token is verified server-side.
    User profile is created in PostgreSQL.
    """
    try:
        # Verify Firebase token
        decoded_token = firebase_auth.verify_id_token(user_data.firebase_token)
        firebase_uid = decoded_token["uid"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")

    # Check if user exists
    existing = await db.execute(
        select(User).where(User.firebase_uid == firebase_uid)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="User already registered")

    # Create user
    user = User(
        name=user_data.name,
        email=decoded_token.get("email"),
        age=user_data.age,
        income_range=user_data.income_range,
        language=user_data.language,
        retirement_age=user_data.retirement_age,
        risk_profile=user_data.risk_profile,
        firebase_uid=firebase_uid
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # Create streak record
    streak = Streak(user_id=user.id)
    db.add(streak)
    await db.commit()

    token = create_jwt_token({"sub": str(user.id)})
    return UserResponse(user=user, token=token)


@router.post("/login")
async def login(firebase_token: str, db: AsyncSession = Depends(get_db)):
    """Login with Firebase token, returns JWT for subsequent API calls."""
    try:
        decoded = firebase_auth.verify_id_token(firebase_token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await db.execute(
        select(User).where(User.firebase_uid == decoded["uid"])
    )
    user = user.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = create_jwt_token({"sub": str(user.id)})
    return {"token": token, "user_id": str(user.id)}
```

### Quest Router

**backend/app/routers/quests.py**
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date

from app.database import get_db
from app.models.quest import Quest, QuestProgress, QuestDifficulty
from app.models.user import User
from app.services.xp_service import award_xp, XPAction
from app.services.badge_service import check_and_award_badges
from app.services.streak_service import update_streak
from app.utils.auth import get_current_user

router = APIRouter()

@router.get("/daily")
async def get_daily_quest(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Returns today's quest for the user based on their level."""
    # Get quests not yet completed by this user
    completed_ids = await db.execute(
        select(QuestProgress.quest_id)
        .where(QuestProgress.user_id == current_user.id)
    )
    completed_ids = [str(r[0]) for r in completed_ids.fetchall()]

    # Select difficulty based on user level
    if current_user.level <= 2:
        difficulty = QuestDifficulty.BEGINNER
    elif current_user.level <= 4:
        difficulty = QuestDifficulty.INTERMEDIATE
    else:
        difficulty = QuestDifficulty.ADVANCED

    quest = await db.execute(
        select(Quest)
        .where(Quest.is_active == True)
        .where(Quest.difficulty == difficulty)
        .where(~Quest.id.in_(completed_ids))
        .order_by(Quest.order_index)
        .limit(1)
    )
    quest = quest.scalar_one_or_none()

    if not quest:
        # Fall back to any difficulty
        quest = await db.execute(
            select(Quest)
            .where(Quest.is_active == True)
            .where(~Quest.id.in_(completed_ids))
            .limit(1)
        )
        quest = quest.scalar_one_or_none()

    if not quest:
        return {"message": "All quests completed! New quests coming soon.", "quest": None}

    # Return language-appropriate content
    lang = current_user.language.value
    return {
        "id": str(quest.id),
        "title": quest.title_hi if lang == "hi" else quest.title,
        "description": quest.description_hi if lang == "hi" else quest.description,
        "difficulty": quest.difficulty,
        "xp_reward": quest.xp_reward,
        "options": quest.options_hi if lang == "hi" else quest.options,
    }


@router.post("/submit")
async def submit_quest_answer(
    quest_id: str,
    answer: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Submit a quest answer, award XP, check badges, update streak."""
    quest = await db.get(Quest, quest_id)
    if not quest:
        raise HTTPException(status_code=404, detail="Quest not found")

    # Check if already completed
    existing = await db.execute(
        select(QuestProgress)
        .where(QuestProgress.user_id == current_user.id)
        .where(QuestProgress.quest_id == quest_id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Quest already completed")

    is_correct = answer.lower() == quest.correct_answer.lower()
    xp_earned = quest.xp_reward if is_correct else max(quest.xp_reward // 5, 10)

    # Log progress
    progress = QuestProgress(
        user_id=current_user.id,
        quest_id=quest.id,
        xp_earned=xp_earned,
        answer_given=answer,
        is_correct=is_correct
    )
    db.add(progress)

    # Award XP
    await award_xp(db, current_user, xp_earned, XPAction.QUEST_COMPLETE)

    # Update streak
    streak_result = await update_streak(db, current_user)

    # Check badge conditions
    new_badges = await check_and_award_badges(db, current_user)

    await db.commit()

    lang = current_user.language.value
    explanation = quest.explanation_hi if lang == "hi" else quest.explanation

    return {
        "is_correct": is_correct,
        "correct_answer": quest.correct_answer,
        "explanation": explanation,
        "xp_earned": xp_earned,
        "total_xp": current_user.total_xp,
        "streak": streak_result,
        "new_badges": new_badges,
    }
```

---

## 7. Gamification Engine

### XP Service

**backend/app/services/xp_service.py**
```python
from enum import Enum
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update
from app.models.user import User

class XPAction(str, Enum):
    DAILY_LOGIN = "daily_login"
    QUEST_COMPLETE = "quest_complete"
    STREAK_7_DAY = "streak_7_day"
    STREAK_30_DAY = "streak_30_day"
    FIRST_CONTRIBUTION = "first_contribution"
    MONTHLY_CONTRIBUTION = "monthly_contribution"
    REFER_FRIEND = "refer_friend"
    SHARE_MILESTONE = "share_milestone"
    SIMULATOR_SESSION = "simulator_session"

XP_VALUES = {
    XPAction.DAILY_LOGIN: 10,
    XPAction.STREAK_7_DAY: 200,
    XPAction.STREAK_30_DAY: 1000,
    XPAction.FIRST_CONTRIBUTION: 500,
    XPAction.MONTHLY_CONTRIBUTION: 100,
    XPAction.REFER_FRIEND: 250,
    XPAction.SHARE_MILESTONE: 25,
    XPAction.SIMULATOR_SESSION: 75,
}

LEVEL_THRESHOLDS = [0, 500, 1500, 3500, 7500, 15000, 30000]
LEVEL_TITLES = [
    "NPS Rookie", "NPS Learner", "NPS Aware",
    "NPS Saver", "NPS Champion", "NPS Master", "NPS Legend"
]

async def award_xp(db: AsyncSession, user: User, xp: int, action: XPAction):
    """Award XP to user and level them up if needed."""
    user.total_xp += xp
    new_level = calculate_level(user.total_xp)

    level_up = new_level > user.level
    user.level = new_level

    await db.execute(
        update(User)
        .where(User.id == user.id)
        .values(total_xp=user.total_xp, level=user.level)
    )

    return {
        "xp_earned": xp,
        "total_xp": user.total_xp,
        "level": user.level,
        "level_title": LEVEL_TITLES[user.level - 1],
        "level_up": level_up
    }

def calculate_level(total_xp: int) -> int:
    level = 1
    for i, threshold in enumerate(LEVEL_THRESHOLDS):
        if total_xp >= threshold:
            level = i + 1
    return min(level, 7)
```

### Badge Service

**backend/app/services/badge_service.py**
```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime

from app.models.badge import Badge, UserBadge, BadgeCategory
from app.models.quest import QuestProgress
from app.models.contribution import Contribution
from app.models.user import User

BADGE_TRIGGERS = {
    "first_quest":       {"type": "quest_count",         "value": 1},
    "nps_scholar":       {"type": "quest_count",         "value": 10},
    "nps_expert":        {"type": "quest_count",         "value": 25},
    "streak_3":          {"type": "streak_days",         "value": 3},
    "streak_7":          {"type": "streak_days",         "value": 7},
    "streak_30":         {"type": "streak_days",         "value": 30},
    "first_step":        {"type": "contribution_count",  "value": 1},
    "saver_5k":          {"type": "contribution_total",  "value": 5000},
    "five_figure":       {"type": "contribution_total",  "value": 10000},
    "consistent_saver":  {"type": "contribution_months", "value": 6},
    "ambassador":        {"type": "referral_count",      "value": 3},
    "influencer":        {"type": "referral_count",      "value": 10},
}

async def check_and_award_badges(db: AsyncSession, user: User) -> list:
    """Check all badge conditions and award any newly earned badges."""
    new_badges = []

    # Get already unlocked badges
    unlocked = await db.execute(
        select(UserBadge.badge_id).where(UserBadge.user_id == user.id)
    )
    unlocked_ids = {str(r[0]) for r in unlocked.fetchall()}

    # Check quest count badges
    quest_count = await db.execute(
        select(func.count(QuestProgress.id))
        .where(QuestProgress.user_id == user.id)
        .where(QuestProgress.is_correct == True)
    )
    quest_count = quest_count.scalar()

    # Check contribution total
    contrib_total = await db.execute(
        select(func.sum(Contribution.amount))
        .where(Contribution.user_id == user.id)
    )
    contrib_total = contrib_total.scalar() or 0

    # Check each badge condition
    all_badges = await db.execute(select(Badge))
    for badge in all_badges.scalars():
        if str(badge.id) in unlocked_ids:
            continue

        earned = False
        trigger = BADGE_TRIGGERS.get(badge.name.lower().replace(" ", "_"))
        if not trigger:
            continue

        if trigger["type"] == "quest_count" and quest_count >= trigger["value"]:
            earned = True
        elif trigger["type"] == "contribution_total" and contrib_total >= trigger["value"]:
            earned = True
        elif trigger["type"] == "streak_days" and user.streaks and \
             user.streaks.current_streak >= trigger["value"]:
            earned = True

        if earned:
            user_badge = UserBadge(
                user_id=user.id,
                badge_id=badge.id,
                unlocked_at=datetime.utcnow()
            )
            db.add(user_badge)
            new_badges.append({
                "id": str(badge.id),
                "name": badge.name,
                "description": badge.description,
                "category": badge.category,
                "icon_url": badge.icon_url,
            })

    return new_badges
```

### Streak Service

**backend/app/services/streak_service.py**
```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from datetime import date, timedelta

from app.models.streak import Streak
from app.models.user import User
from app.services.xp_service import award_xp, XPAction

async def update_streak(db: AsyncSession, user: User) -> dict:
    """Update user's daily streak on quest completion."""
    streak = await db.execute(
        select(Streak).where(Streak.user_id == user.id)
    )
    streak = streak.scalar_one_or_none()

    if not streak:
        streak = Streak(user_id=user.id)
        db.add(streak)

    today = date.today()
    yesterday = today - timedelta(days=1)

    xp_bonus = 0
    if streak.last_active_date == today:
        # Already active today
        pass
    elif streak.last_active_date == yesterday:
        # Continuing streak
        streak.current_streak += 1
        streak.longest_streak = max(streak.longest_streak, streak.current_streak)

        if streak.current_streak == 7:
            xp_bonus = 200
            await award_xp(db, user, 200, XPAction.STREAK_7_DAY)
        elif streak.current_streak == 30:
            xp_bonus = 1000
            await award_xp(db, user, 1000, XPAction.STREAK_30_DAY)
    else:
        # Streak broken — reset
        streak.current_streak = 1

    streak.last_active_date = today

    return {
        "current_streak": streak.current_streak,
        "longest_streak": streak.longest_streak,
        "streak_bonus_xp": xp_bonus
    }
```

---

## 8. AI Pension Coach

### Prompt Engineering

**ml/pension_coach_prompts.py**
```python
SYSTEM_PROMPT_EN = """
You are an NPS (National Pension System) Pension Coach for India.
You help young Indians aged 18-35 understand, enroll in, and contribute to NPS.

USER PROFILE:
- Name: {name}
- Age: {age}
- Monthly Income: ₹{income}
- Current NPS Contributions: ₹{monthly_contribution}/month
- Total Contributed: ₹{total_contributed}
- Retirement Age Goal: {retirement_age}
- Risk Profile: {risk_profile}
- Current Level: {level}

RULES YOU MUST FOLLOW:
1. Only give NPS-specific advice based on PFRDA guidelines.
2. Always end financial projections with: "This is an estimate based on historical NPS returns. Not financial advice."
3. For corpus calculations, use 10% annual return as the default.
4. Section 80CCD(1) allows deduction up to 10% of salary (max ₹1.5 lakh under 80C).
5. Section 80CCD(1B) allows additional ₹50,000 deduction.
6. Tier I has a lock-in until age 60; 60% withdrawal tax-free at maturity.
7. Minimum contribution for Tier I is ₹500/year (₹1,000 for account opening).
8. Be warm, encouraging, and use simple language.
9. Keep responses concise — maximum 4 sentences unless user asks for more.
10. If asked about anything unrelated to NPS/finance, politely redirect.

RESPONSE LANGUAGE: {language}
"""

SYSTEM_PROMPT_HI = """
आप भारत के लिए एक NPS (राष्ट्रीय पेंशन प्रणाली) पेंशन कोच हैं।
आप 18-35 आयु के युवा भारतीयों को NPS को समझने, उसमें नामांकन करने और योगदान करने में मदद करते हैं।

उपयोगकर्ता प्रोफ़ाइल:
- नाम: {name}
- आयु: {age}
- मासिक आय: ₹{income}
- वर्तमान NPS योगदान: ₹{monthly_contribution}/माह
- सेवानिवृत्ति आयु लक्ष्य: {retirement_age}

नियम:
1. केवल PFRDA दिशानिर्देशों के आधार पर NPS-विशिष्ट सलाह दें।
2. वित्तीय अनुमानों के अंत में हमेशा कहें: "यह एक अनुमान है, वित्तीय सलाह नहीं।"
3. सरल, मैत्रीपूर्ण हिंदी का उपयोग करें।
4. प्रतिक्रियाएं संक्षिप्त रखें।
"""

SCENARIO_PROMPTS = {
    "starter_nudge": """
        The user has ₹{monthly_contribution}/month in contributions.
        Give a personalized nudge showing what increasing by ₹{suggested_increase} would do
        to their retirement corpus. Calculate using 10% annual return, {years_to_retire} years.
        Be specific with rupee amounts. Be encouraging.
    """,

    "tax_benefit": """
        The user earns ₹{annual_income}/year.
        Explain exactly how much tax they can save through NPS under 80CCD(1) and 80CCD(1B).
        Show the net tax saving assuming 30% tax bracket if income > ₹10L, else 20%.
        Keep it simple and exciting.
    """,

    "delay_cost": """
        The user is {age} years old and contributing ₹{monthly_contribution}/month.
        Show them the corpus difference between starting today vs 5 years from now.
        Use 10% annual return. Make it emotionally impactful.
    """,

    "fund_guidance": """
        The user is {age} years old with {risk_profile} risk profile.
        Explain which NPS fund allocation is best for them:
        Auto Choice (LC-75, LC-50, LC-25) vs Active Choice.
        Keep it simple with a clear recommendation.
    """,

    "faq": """
        Answer this NPS-related question based on PFRDA official guidelines: {question}
        If the question is not NPS-related, politely redirect.
    """
}
```

### AI Coach Router

**backend/app/routers/ai_coach.py**
```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from openai import AsyncOpenAI
import json

from app.database import get_db
from app.models.user import User
from app.utils.auth import get_current_user
from app.services.simulator_service import calculate_corpus
from ml.pension_coach_prompts import SYSTEM_PROMPT_EN, SYSTEM_PROMPT_HI
from app.config import settings

router = APIRouter()
openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

@router.post("/coach/chat")
async def chat_with_coach(
    message: str,
    conversation_history: list = [],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Send message to AI Pension Coach and get personalized response."""

    # Get user's contribution data
    total_contributions = await get_user_total_contributions(db, current_user.id)
    monthly_avg = total_contributions / max(1, get_months_active(current_user))

    # Build system prompt
    lang = current_user.language.value
    system_template = SYSTEM_PROMPT_HI if lang == "hi" else SYSTEM_PROMPT_EN

    system_prompt = system_template.format(
        name=current_user.name,
        age=current_user.age,
        income=current_user.income_range or "Not specified",
        monthly_contribution=round(monthly_avg),
        total_contributed=round(total_contributions),
        retirement_age=current_user.retirement_age,
        risk_profile=current_user.risk_profile,
        level=current_user.level,
        language="Hindi" if lang == "hi" else "English"
    )

    # Build messages
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(conversation_history[-10:])  # Last 10 messages for context
    messages.append({"role": "user", "content": message})

    # Call LLM
    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=500,
        temperature=0.7
    )

    reply = response.choices[0].message.content

    # Log interaction
    await log_ai_interaction(db, current_user.id, message, reply, lang)

    return {
        "reply": reply,
        "disclaimer": "This is an AI estimate, not financial advice." if lang == "en"
                     else "यह एक AI अनुमान है, वित्तीय सलाह नहीं।"
    }
```

---

## 9. Multilingual NLP

### Language Handler

**ml/multilingual_handler.py**
```python
import os
from google.cloud import translate_v2 as translate
from indicnlp.tokenize import indic_tokenize

translate_client = translate.Client()

SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "ta": "Tamil",
    "te": "Telugu",
    "bn": "Bengali",
    "mr": "Marathi"
}

NPS_GLOSSARY = {
    "hi": {
        "National Pension System": "राष्ट्रीय पेंशन प्रणाली",
        "contribution": "योगदान",
        "corpus": "कोष",
        "annuity": "वार्षिकी",
        "tier": "स्तर",
        "withdrawal": "निकासी",
        "PFRDA": "पीएफआरडीए",
        "retirement": "सेवानिवृत्ति",
        "pension fund": "पेंशन फंड"
    },
    "ta": {
        "National Pension System": "தேசிய ஓய்வூதிய திட்டம்",
        "contribution": "பங்களிப்பு",
        "corpus": "நிதி",
        "retirement": "ஓய்வு"
    }
    # Add more languages as needed
}

def translate_nps_content(text: str, target_lang: str) -> str:
    """Translate text with NPS-specific financial glossary applied."""
    if target_lang == "en":
        return text

    # First apply glossary substitutions to preserve key terms
    for en_term, translated_term in NPS_GLOSSARY.get(target_lang, {}).items():
        text = text.replace(en_term, f"[PRESERVE:{translated_term}]")

    # Translate
    result = translate_client.translate(
        text,
        target_language=target_lang,
        source_language="en"
    )
    translated = result["translatedText"]

    # Restore preserved terms
    import re
    translated = re.sub(r'\[PRESERVE:(.*?)\]', r'\1', translated)

    return translated

def detect_language(text: str) -> str:
    """Detect the language of input text."""
    result = translate_client.detect_language(text)
    return result["language"]
```

---

## 10. Frontend — React Native & React.js

### Project Setup

```bash
# Create Expo React Native project
npx create-expo-app frontend-mobile --template blank-typescript
cd frontend-mobile

# Install dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install axios zustand
npm install react-native-reanimated lottie-react-native
npm install i18next react-i18next
npm install @react-native-firebase/app @react-native-firebase/messaging
npm install react-native-svg victory-native
npm install expo-notifications expo-secure-store
```

### i18n Language Files

**frontend-mobile/src/i18n/en.json**
```json
{
  "onboarding": {
    "welcome": "Welcome to PensionQuest",
    "subtitle": "Your journey to a secure retirement starts here",
    "start_button": "Start My Quest",
    "age_question": "How old are you?",
    "income_question": "What is your monthly income?",
    "nps_question": "Are you currently enrolled in NPS?",
    "retirement_age_question": "At what age do you want to retire?"
  },
  "quest": {
    "daily_quest": "Daily Quest",
    "complete": "Complete",
    "streak": "Day Streak",
    "xp_earned": "XP Earned",
    "correct": "Correct!",
    "incorrect": "Not quite!",
    "explanation": "Here's why:"
  },
  "avatar": {
    "thriving": "Your future self is thriving!",
    "stable": "You're on the right track!",
    "struggling": "Your future self needs more help.",
    "critical": "Your future self is in trouble.",
    "zero": "Your future self hasn't started yet."
  },
  "coach": {
    "greeting": "Hi {{name}}! How can I help you today?",
    "disclaimer": "This is an estimate, not financial advice.",
    "placeholder": "Ask me anything about NPS..."
  },
  "simulator": {
    "title": "Retirement Simulator",
    "monthly_contribution": "Monthly Contribution",
    "projected_corpus": "Projected Corpus",
    "monthly_pension": "Monthly Pension",
    "tax_saved": "Tax Saved",
    "delay_warning": "Waiting {{years}} years costs you ₹{{amount}}"
  }
}
```

**frontend-mobile/src/i18n/hi.json**
```json
{
  "onboarding": {
    "welcome": "PensionQuest में आपका स्वागत है",
    "subtitle": "एक सुरक्षित भविष्य की ओर आपकी यात्रा यहाँ शुरू होती है",
    "start_button": "मेरी यात्रा शुरू करें",
    "age_question": "आपकी उम्र क्या है?",
    "income_question": "आपकी मासिक आय क्या है?",
    "nps_question": "क्या आप वर्तमान में NPS में नामांकित हैं?",
    "retirement_age_question": "आप किस उम्र में सेवानिवृत्त होना चाहते हैं?"
  },
  "quest": {
    "daily_quest": "दैनिक क्वेस्ट",
    "complete": "पूर्ण करें",
    "streak": "दिन की स्ट्रीक",
    "xp_earned": "XP अर्जित",
    "correct": "सही!",
    "incorrect": "बिल्कुल नहीं!",
    "explanation": "यहाँ जानें क्यों:"
  },
  "avatar": {
    "thriving": "आपका भविष्य का स्व फल-फूल रहा है!",
    "stable": "आप सही रास्ते पर हैं!",
    "struggling": "आपके भविष्य के स्व को और मदद चाहिए।",
    "critical": "आपका भविष्य का स्व मुसीबत में है।",
    "zero": "आपके भविष्य के स्व ने अभी शुरुआत नहीं की है।"
  }
}
```

### i18n Setup

**frontend-mobile/src/i18n/index.ts**
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

### Dashboard Screen

**frontend-mobile/src/screens/Dashboard/index.tsx**
```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RetirementAvatar } from '../../components/Avatar';
import { XPBar } from '../../components/XPBar';
import { DailyQuestCard } from '../../components/QuestCard';
import { MiniLeaderboard } from '../../components/Leaderboard';
import { useUserStore } from '../../store/userStore';
import { api } from '../../services/api';

export default function DashboardScreen({ navigation }) {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [dailyQuest, setDailyQuest] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const [questRes, profileRes] = await Promise.all([
      api.get('/quests/daily'),
      api.get('/user/profile')
    ]);
    setDailyQuest(questRes.data);
    setStreak(profileRes.data.streak?.current_streak || 0);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Namaste, {user?.name}! 🙏</Text>
        <Text style={styles.streak}>🔥 {streak} Day Streak</Text>
      </View>

      {/* Retirement Avatar */}
      <RetirementAvatar state={user?.avatar_state} />

      {/* XP Bar */}
      <XPBar
        currentXP={user?.total_xp}
        level={user?.level}
        levelTitle={getLevelTitle(user?.level)}
      />

      {/* Daily Quest Card */}
      {dailyQuest && (
        <DailyQuestCard
          quest={dailyQuest}
          onPress={() => navigation.navigate('Quest', { quest: dailyQuest })}
        />
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Simulator')}
        >
          <Text style={styles.actionBtnText}>📊 Simulator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('AICoach')}
        >
          <Text style={styles.actionBtnText}>🤖 AI Coach</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.actionBtnText}>🏆 Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {/* Mini Leaderboard */}
      <MiniLeaderboard />
    </ScrollView>
  );
}
```

---

## 11. Retirement Simulator

### Backend Calculation Service

**backend/app/utils/nps_calculator.py**
```python
from dataclasses import dataclass
from typing import Literal

@dataclass
class SimulationResult:
    projected_corpus: float
    monthly_pension: float
    tax_saved_total: float
    years_to_retire: int
    cost_of_delay_1yr: float
    cost_of_delay_3yr: float
    cost_of_delay_5yr: float

def calculate_nps_corpus(
    current_age: int,
    retirement_age: int,
    monthly_contribution: float,
    annual_return_pct: float = 10.0,
    risk_profile: Literal["conservative", "moderate", "aggressive"] = "moderate",
    annual_income: float = 0
) -> SimulationResult:
    """
    Rule-based NPS corpus calculation per PFRDA methodology.
    Uses compound interest formula: FV = P * [((1+r)^n - 1) / r] * (1+r)
    """
    years = retirement_age - current_age
    months = years * 12
    monthly_rate = annual_return_pct / 100 / 12

    # Future Value of monthly SIP
    if monthly_rate == 0:
        corpus = monthly_contribution * months
    else:
        corpus = monthly_contribution * (
            ((1 + monthly_rate) ** months - 1) / monthly_rate
        ) * (1 + monthly_rate)

    # Annuity calculation (40% of corpus goes to annuity at 6% annual)
    annuity_amount = corpus * 0.40
    monthly_pension = (annuity_amount * 0.06) / 12

    # Tax savings (80CCD - simplified)
    annual_contribution = monthly_contribution * 12
    taxable_80ccd_1 = min(annual_contribution, annual_income * 0.10, 150000)
    taxable_80ccd_1b = min(max(annual_contribution - taxable_80ccd_1, 0), 50000)
    tax_rate = 0.30 if annual_income > 1000000 else 0.20 if annual_income > 500000 else 0.05
    annual_tax_saving = (taxable_80ccd_1 + taxable_80ccd_1b) * tax_rate
    total_tax_saved = annual_tax_saving * years

    # Cost of delay
    def corpus_at_years(y: int) -> float:
        m = y * 12
        if monthly_rate == 0:
            return monthly_contribution * m
        return monthly_contribution * (
            ((1 + monthly_rate) ** m - 1) / monthly_rate
        ) * (1 + monthly_rate)

    delay_1yr = corpus - corpus_at_years(years - 1)
    delay_3yr = corpus - corpus_at_years(years - 3)
    delay_5yr = corpus - corpus_at_years(years - 5)

    return SimulationResult(
        projected_corpus=round(corpus, 2),
        monthly_pension=round(monthly_pension, 2),
        tax_saved_total=round(total_tax_saved, 2),
        years_to_retire=years,
        cost_of_delay_1yr=round(delay_1yr, 2),
        cost_of_delay_3yr=round(delay_3yr, 2),
        cost_of_delay_5yr=round(delay_5yr, 2)
    )
```

### Frontend Simulator Screen

**frontend-mobile/src/screens/Simulator/index.tsx**
```typescript
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { LineChart } from 'react-native-chart-kit';
import debounce from 'lodash/debounce';
import { api } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';

export default function RetirementSimulatorScreen() {
  const [contribution, setContribution] = useState(1000);
  const [retirementAge, setRetirementAge] = useState(60);
  const [returnRate, setReturnRate] = useState(10);
  const [result, setResult] = useState(null);

  const calculateCorpus = useCallback(
    debounce(async (params) => {
      const res = await api.post('/simulator/calculate', params);
      setResult(res.data);
    }, 300),
    []
  );

  const onContributionChange = (value: number) => {
    const rounded = Math.round(value / 100) * 100;
    setContribution(rounded);
    calculateCorpus({ monthly_contribution: rounded, retirement_age: retirementAge, annual_return: returnRate });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Retirement Simulator</Text>

      {/* Contribution Slider */}
      <View style={styles.sliderSection}>
        <Text style={styles.label}>Monthly Contribution</Text>
        <Text style={styles.value}>{formatCurrency(contribution)}/month</Text>
        <Slider
          minimumValue={200}
          maximumValue={50000}
          value={contribution}
          onValueChange={onContributionChange}
          minimumTrackTintColor="#4F46E5"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#4F46E5"
        />
      </View>

      {/* Retirement Age Slider */}
      <View style={styles.sliderSection}>
        <Text style={styles.label}>Retirement Age: {retirementAge}</Text>
        <Slider
          minimumValue={55}
          maximumValue={70}
          step={1}
          value={retirementAge}
          onValueChange={(v) => {
            setRetirementAge(v);
            calculateCorpus({ monthly_contribution: contribution, retirement_age: v, annual_return: returnRate });
          }}
          minimumTrackTintColor="#4F46E5"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#4F46E5"
        />
      </View>

      {/* Results */}
      {result && (
        <View style={styles.resultsCard}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Projected Corpus</Text>
            <Text style={styles.resultValue}>{formatCurrency(result.projected_corpus)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Monthly Pension</Text>
            <Text style={styles.resultValue}>{formatCurrency(result.monthly_pension)}/mo</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Tax Saved</Text>
            <Text style={styles.resultValue}>{formatCurrency(result.tax_saved_total)}</Text>
          </View>
          <View style={[styles.resultRow, styles.warningRow]}>
            <Text style={styles.warningText}>
              ⚠️ Waiting 5 years costs you {formatCurrency(result.cost_of_delay_5yr)}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
```

---

## 12. Retirement Avatar System

### Avatar Component

**frontend-mobile/src/components/Avatar/index.tsx**
```typescript
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';

type AvatarState = 'thriving' | 'stable' | 'struggling' | 'critical' | 'zero';

interface RetirementAvatarProps {
  state: AvatarState;
  contributionPercent?: number;
}

const AVATAR_CONFIG = {
  thriving:   { animation: require('./animations/thriving.json'),   color: '#10B981', emoji: '🌟' },
  stable:     { animation: require('./animations/stable.json'),     color: '#3B82F6', emoji: '😊' },
  struggling: { animation: require('./animations/struggling.json'), color: '#F59E0B', emoji: '😟' },
  critical:   { animation: require('./animations/critical.json'),   color: '#EF4444', emoji: '😰' },
  zero:       { animation: require('./animations/zero.json'),       color: '#6B7280', emoji: '👤' },
};

export function RetirementAvatar({ state = 'zero', contributionPercent = 0 }: RetirementAvatarProps) {
  const { t } = useTranslation();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const config = AVATAR_CONFIG[state];

  useEffect(() => {
    // Pulse animation when state is critical
    if (state === 'critical') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.05, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Future Self at 60</Text>
      <Animated.View style={[styles.avatarContainer, { transform: [{ scale: pulseAnim }] }]}>
        <LottieView
          source={config.animation}
          autoPlay
          loop
          style={styles.animation}
        />
      </Animated.View>
      <View style={[styles.statusBadge, { backgroundColor: config.color }]}>
        <Text style={styles.statusEmoji}>{config.emoji}</Text>
        <Text style={styles.statusText}>{t(`avatar.${state}`)}</Text>
      </View>
      {contributionPercent > 0 && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {
            width: `${Math.min(contributionPercent, 100)}%`,
            backgroundColor: config.color
          }]} />
        </View>
      )}
    </View>
  );
}
```

### Avatar State Calculator

**backend/app/services/avatar_service.py**
```python
from enum import Enum

class AvatarState(str, Enum):
    THRIVING = "thriving"
    STABLE = "stable"
    STRUGGLING = "struggling"
    CRITICAL = "critical"
    ZERO = "zero"

def calculate_avatar_state(
    monthly_contribution: float,
    recommended_contribution: float
) -> AvatarState:
    """
    Recommended contribution = 10% of monthly income (NPS guideline baseline).
    Avatar state is based on % of recommended contribution being made.
    """
    if recommended_contribution == 0 or monthly_contribution == 0:
        return AvatarState.ZERO

    pct = (monthly_contribution / recommended_contribution) * 100

    if pct >= 100:
        return AvatarState.THRIVING
    elif pct >= 80:
        return AvatarState.STABLE
    elif pct >= 50:
        return AvatarState.STRUGGLING
    elif pct >= 20:
        return AvatarState.CRITICAL
    else:
        return AvatarState.ZERO

def get_recommended_contribution(income_range: str) -> float:
    """Parse income range string and return 10% as recommended NPS contribution."""
    try:
        parts = income_range.split("-")
        avg_income = (int(parts[0]) + int(parts[1])) / 2
        return avg_income * 0.10
    except Exception:
        return 1000  # Default fallback
```

---

## 13. Leaderboard with Redis

### Redis Leaderboard Service

**backend/app/services/leaderboard_service.py**
```python
import redis.asyncio as redis
from app.config import settings

redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

LEADERBOARD_KEYS = {
    "national": "lb:national:xp",
    "city": "lb:city:{city}:xp",
    "friends": "lb:friends:{user_id}:xp",
    "streak": "lb:streak:all",
    "contribution": "lb:contribution:all"
}

async def update_user_xp(user_id: str, total_xp: int, city: str = None):
    """Update user's XP in national and city leaderboards."""
    await redis_client.zadd("lb:national:xp", {user_id: total_xp})
    if city:
        await redis_client.zadd(f"lb:city:{city}:xp", {user_id: total_xp})

async def get_leaderboard(board_type: str, city: str = None, limit: int = 50) -> list:
    """Get top users from a leaderboard."""
    key = f"lb:{board_type}:xp"
    if board_type == "city" and city:
        key = f"lb:city:{city}:xp"

    # Get top N users with scores (descending)
    results = await redis_client.zrevrange(key, 0, limit - 1, withscores=True)

    leaderboard = []
    for rank, (user_id, score) in enumerate(results, start=1):
        user_data = await redis_client.hgetall(f"user:{user_id}:profile")
        leaderboard.append({
            "rank": rank,
            "user_id": user_id,
            "name": user_data.get("name", "Anonymous"),
            "level": user_data.get("level", 1),
            "xp": int(score)
        })

    return leaderboard

async def get_user_rank(user_id: str, board_type: str = "national") -> dict:
    """Get user's rank in a leaderboard."""
    key = f"lb:{board_type}:xp"
    rank = await redis_client.zrevrank(key, user_id)
    score = await redis_client.zscore(key, user_id)
    total = await redis_client.zcard(key)

    return {
        "rank": (rank + 1) if rank is not None else None,
        "xp": int(score) if score else 0,
        "total_users": total,
        "percentile": round((1 - (rank / max(total, 1))) * 100, 1) if rank is not None else 0
    }

async def cache_user_profile(user_id: str, name: str, level: int):
    """Cache user profile data in Redis for leaderboard display."""
    await redis_client.hset(f"user:{user_id}:profile", mapping={
        "name": name,
        "level": level
    })
    await redis_client.expire(f"user:{user_id}:profile", 3600)
```

---

## 14. Push Notifications

### Notification Service

**backend/app/services/notification_service.py**
```python
import firebase_admin
from firebase_admin import messaging
from datetime import datetime
import asyncio

NOTIFICATION_TEMPLATES = {
    "daily_quest": {
        "en": {
            "title": "🎯 Your Daily Quest Awaits!",
            "body": "Complete today's NPS mission and earn {xp} XP. Keep your {streak}-day streak alive!"
        },
        "hi": {
            "title": "🎯 आपका दैनिक क्वेस्ट इंतजार कर रहा है!",
            "body": "आज का NPS मिशन पूरा करें और {xp} XP कमाएं। अपनी {streak} दिन की स्ट्रीक बनाए रखें!"
        }
    },
    "contribution_nudge": {
        "en": {
            "title": "💰 Time for Your NPS Contribution!",
            "body": "You're ₹{amount} away from your next milestone badge. Contribute today!"
        },
        "hi": {
            "title": "💰 NPS योगदान का समय!",
            "body": "आप अपने अगले मील-स्टोन बैज से ₹{amount} दूर हैं। आज योगदान करें!"
        }
    },
    "badge_unlocked": {
        "en": {
            "title": "🏆 Badge Unlocked: {badge_name}!",
            "body": "Congratulations! Share your achievement with friends!"
        }
    },
    "streak_reminder": {
        "en": {
            "title": "⚠️ Don't break your {streak}-day streak!",
            "body": "Complete today's quest before midnight to keep going!"
        },
        "hi": {
            "title": "⚠️ अपनी {streak} दिन की स्ट्रीक मत तोड़ें!",
            "body": "स्ट्रीक जारी रखने के लिए आधी रात से पहले आज का क्वेस्ट पूरा करें!"
        }
    }
}

async def send_push_notification(
    fcm_token: str,
    notification_type: str,
    lang: str = "en",
    data: dict = {}
):
    """Send a push notification to a specific device."""
    template = NOTIFICATION_TEMPLATES.get(notification_type, {}).get(lang, {})
    if not template:
        return

    title = template["title"].format(**data)
    body = template["body"].format(**data) if "body" in template else ""

    message = messaging.Message(
        notification=messaging.Notification(title=title, body=body),
        token=fcm_token,
        data={k: str(v) for k, v in data.items()},
        android=messaging.AndroidConfig(priority="high"),
        apns=messaging.APNSConfig(
            payload=messaging.APNSPayload(
                aps=messaging.Aps(sound="default")
            )
        )
    )

    try:
        response = messaging.send(message)
        return response
    except Exception as e:
        print(f"FCM send error: {e}")
        return None
```

---

## 15. Security Architecture

### JWT Utilities

**backend/app/utils/auth.py**
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta

from app.config import settings
from app.database import get_db
from app.models.user import User

security = HTTPBearer()

def create_jwt_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### AES Encryption

**backend/app/utils/encryption.py**
```python
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os

from app.config import settings

def get_fernet():
    key = base64.urlsafe_b64encode(settings.AES_KEY.encode()[:32].ljust(32, b'0'))
    return Fernet(key)

def encrypt(plaintext: str) -> str:
    f = get_fernet()
    return f.encrypt(plaintext.encode()).decode()

def decrypt(ciphertext: str) -> str:
    f = get_fernet()
    return f.decrypt(ciphertext.encode()).decode()
```

---

## 16. Cloud Deployment

### Docker Compose (Development)

**infra/docker-compose.yml**
```yaml
version: '3.9'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file: ./backend/.env
    depends_on:
      - db
      - redis
    volumes:
      - ./backend:/app
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: pensionquest_db
      POSTGRES_USER: pensionquest
      POSTGRES_PASSWORD: your-password
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7.2-alpine
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infra/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - backend

volumes:
  pgdata:
  redisdata:
```

### Backend Dockerfile

**backend/Dockerfile**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Run Locally

```bash
# Start all services
cd infra
docker-compose up -d

# Run migrations
cd ../backend
source venv/bin/activate
alembic upgrade head

# Seed data
python scripts/seed_quests.py
python scripts/seed_badges.py

# Start backend (development)
uvicorn app.main:app --reload

# Start mobile frontend
cd ../frontend-mobile
npx expo start

# Start web frontend
cd ../frontend-web
npm run dev
```

---

## 17. 8-Week Sprint Plan

### Week 1 — Architecture & Design (All Team)

```
Deliverables:
  ✅ Git monorepo created, all team members have access
  ✅ Docker Compose running locally (Postgres + Redis)
  ✅ FastAPI project scaffolded
  ✅ React Native project initialized
  ✅ Figma design system created (colors, typography, components)
  ✅ Database schema finalized and documented
  ✅ API contract written (OpenAPI spec)
  ✅ Firebase project created

Owner: All
Daily Standup: 9 AM (30 min)
```

### Week 2 — Foundation Setup (Aryan + Pranjali + Vedika)

```
Aryan:
  ✅ All database models created
  ✅ Alembic migrations running
  ✅ Auth endpoints (register, login) working
  ✅ Redis connected and leaderboard structure ready

Pranjali:
  ✅ React Native navigation set up
  ✅ i18n configured (English + Hindi)
  ✅ Design system components built (buttons, cards, headers)
  ✅ Auth screens (login, register) complete

Vedika:
  ✅ Figma mockups for all 6 screens complete
  ✅ Avatar visual states designed (5 states)
  ✅ Badge icons designed (15 badges)
  ✅ 10 NPS quest questions written and reviewed
```

### Week 3 — Daily Quest Module (Aryan + Pranjali)

```
Aryan:
  ✅ /api/quests/daily endpoint
  ✅ /api/quests/submit endpoint with XP logic
  ✅ Badge trigger engine (quest_count conditions)
  ✅ Quest data seeded (10 quests)

Pranjali:
  ✅ Quest card component with 4-option MCQ UI
  ✅ Answer reveal animation
  ✅ XP celebration animation (confetti)
  ✅ Badge unlock modal
  ✅ Streak display on dashboard
```

### Week 4 — Retirement Avatar (Pranjali + Vedika)

```
Pranjali:
  ✅ Avatar component with Lottie animations
  ✅ State transitions animated
  ✅ Avatar integrated into dashboard
  ✅ Real-time avatar update on contribution change

Vedika:
  ✅ 5 avatar animation files (Lottie JSON)
  ✅ Avatar state logic documented
  ✅ User testing with 3 external users — feedback collected
```

### Week 5 — AI Pension Coach (Shivam)

```
Shivam:
  ✅ OpenAI/Gemini API integrated in FastAPI
  ✅ Prompt templates for 5 NPS scenarios
  ✅ /api/ai/coach/chat endpoint
  ✅ Conversation history management
  ✅ Hindi language responses working
  ✅ AI interaction logging in DB

Pranjali:
  ✅ Chat UI component (bubble messages)
  ✅ AI Coach screen complete
  ✅ Typing indicator animation
  ✅ Disclaimer shown below AI responses
```

### Week 6 — Retirement Simulator (Pranjali + Aryan)

```
Aryan:
  ✅ /api/simulator/calculate endpoint
  ✅ NPS corpus calculation (rule-based)
  ✅ All 6 output fields returned
  ✅ Scenario comparison (3 scenarios)

Pranjali:
  ✅ Slider UI components
  ✅ Real-time chart updates (Recharts / Victory)
  ✅ Scenario comparison UI
  ✅ Cost of delay display
  ✅ "Start NPS Now" CTA button
  ✅ Avatar reacts to simulator changes
```

### Week 7 — Gamification + Multilingual (Shivam + Aryan)

```
Aryan:
  ✅ Full leaderboard endpoints (national, city, friends)
  ✅ Redis sorted sets for real-time ranking
  ✅ Streak cron job (daily midnight)
  ✅ Push notification triggers (FCM)
  ✅ Contribution logging endpoint

Shivam:
  ✅ Hindi translations for all quest content
  ✅ IndicBERT integration for language detection
  ✅ Social share card generation (badge PNG)
  ✅ Referral tracking endpoint
  ✅ All 15 badges seeded and trigger logic complete
```

### Week 8 — Testing & Demo Prep (All Team)

```
All:
  ✅ End-to-end user journey tested (Riya's journey)
  ✅ Ramesh's journey tested (Hindi mode)
  ✅ Performance: app loads under 3 seconds on 4G
  ✅ API response times under 500ms
  ✅ All 6 PoC deliverables working
  ✅ Demo video recorded (3–5 minutes)
  ✅ Pitch deck finalized (Vedika)
  ✅ APIX API documentation complete

Final Demo Checklist:
  □ Daily Quest flow: user answers → XP → badge → share
  □ AI Coach: 3 live conversations in English + Hindi
  □ Retirement Simulator: slider → real-time corpus → avatar update
  □ Leaderboard: show national + friend rankings
  □ Avatar: show 3 state transitions
  □ Multilingual: toggle English ↔ Hindi live
```

---

## 18. Team Responsibilities

| Task | Shivam | Aryan | Pranjali | Vedika |
|---|---|---|---|---|
| Project Architecture | ✅ Lead | Support | | |
| FastAPI Setup | ✅ | Support | | |
| Database Schema | | ✅ Lead | | Support |
| Gamification Engine | | ✅ Lead | | |
| Leaderboard (Redis) | | ✅ Lead | | |
| AI Pension Coach | ✅ Lead | | | |
| Multilingual NLP | ✅ Lead | | | |
| Push Notifications | Support | ✅ Lead | | |
| React Native Setup | | | ✅ Lead | |
| Quest UI | | | ✅ Lead | |
| Avatar Animations | | | ✅ Lead | Designs |
| Simulator Charts | | Support | ✅ Lead | |
| AI Chat UI | | | ✅ Lead | |
| Figma Design System | | | | ✅ Lead |
| Avatar Visuals | | | | ✅ Lead |
| Badge Icons | | | | ✅ Lead |
| Quest Content Writing | Support | | | ✅ Lead |
| UX Research | | | | ✅ Lead |
| Business Strategy | | | | ✅ Lead |
| Pitch Deck | Support | | | ✅ Lead |
| AWS/GCP Deployment | Support | ✅ Lead | | |
| API Documentation | Support | ✅ Lead | | |

---

## 19. Testing Strategy

### Backend Tests

**backend/tests/test_quests.py**
```python
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_get_daily_quest():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Login first
        login_res = await client.post("/api/auth/login", json={"firebase_token": "test_token"})
        token = login_res.json()["token"]

        # Get daily quest
        res = await client.get(
            "/api/quests/daily",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert res.status_code == 200
        data = res.json()
        assert "title" in data
        assert "options" in data
        assert "xp_reward" in data

@pytest.mark.asyncio
async def test_submit_quest_correct_answer():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # ...setup
        res = await client.post("/api/quests/submit", json={
            "quest_id": "test-quest-id",
            "answer": "c"  # correct answer
        }, headers={"Authorization": "Bearer test_token"})

        assert res.status_code == 200
        data = res.json()
        assert data["is_correct"] == True
        assert data["xp_earned"] > 0

@pytest.mark.asyncio
async def test_nps_corpus_calculation():
    """Validate corpus calculation matches manual calculation."""
    from app.utils.nps_calculator import calculate_nps_corpus
    result = calculate_nps_corpus(
        current_age=25,
        retirement_age=60,
        monthly_contribution=1000,
        annual_return_pct=10.0
    )
    # 35 years at 10% with ₹1000/month ≈ ₹38.4 Lakhs
    assert 3500000 <= result.projected_corpus <= 4000000
    assert result.monthly_pension > 0
    assert result.tax_saved_total > 0

@pytest.mark.asyncio
async def test_ai_coach_response():
    """AI Coach should include disclaimer."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        res = await client.post("/api/ai/coach/chat", json={
            "message": "How much will I have at 60 if I save ₹1000/month?"
        }, headers={"Authorization": "Bearer test_token"})

        assert res.status_code == 200
        data = res.json()
        assert "disclaimer" in data
        assert len(data["reply"]) > 10
```

### Run Tests

```bash
cd backend
source venv/bin/activate

# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html

# Run specific test file
pytest tests/test_quests.py -v
```

### Performance Testing

```bash
# Install k6 for load testing
brew install k6

# Create load test script
cat > load_test.js << 'EOF'
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 100,           // 100 virtual users
  duration: '30s',
};

export default function () {
  let res = http.get('https://api.pensionquest.in/api/quests/daily', {
    headers: { Authorization: `Bearer ${__ENV.TOKEN}` }
  });
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
EOF

k6 run load_test.js
```

---

## 20. Demo Preparation

### Demo Script (10 Minutes)

```
[0:00 – 1:00] Problem Statement
  → "Only 8% of Indians under 35 have NPS. Here's why that's a problem."
  → Show the data gap: 460M+ untapped users

[1:00 – 3:00] Live Demo: Riya's Journey
  → Open app as new user "Riya, 24, Pune"
  → Show language selection → onboarding quiz → Avatar appears (Zero state)
  → Complete first quest → XP awarded → Badge unlocks → Share card shown

[3:00 – 5:00] Retirement Simulator
  → Open simulator → set contribution to ₹0 → show empty corpus
  → Drag to ₹1,000 → corpus jumps to ₹38L → Avatar changes to Struggling
  → Drag to ₹3,000 → corpus ₹1.1 Cr → Avatar becomes Thriving
  → Show "Cost of Delay: waiting 5 years costs ₹24 Lakhs"

[5:00 – 7:00] AI Pension Coach
  → Open AI Coach (English mode)
  → Ask: "How much tax can I save with NPS?"
  → Show personalized tax calculation response
  → Switch to Hindi mode → ask same question → response in Hindi
  → Show disclaimer at bottom

[7:00 – 8:30] Leaderboard + Social
  → Show national leaderboard with rankings
  → Show friend group leaderboard
  → Show shareable badge card (WhatsApp format)

[8:30 – 9:30] Impact & Roadmap
  → Show quantitative projections slide
  → Phase 2: Live CRA integration, Tamil/Telugu/Bengali/Marathi
  → Phase 3: 50 Lakh users, full PFRDA deployment

[9:30 – 10:00] Team + CTA
  → Team slide
  → "PensionQuest is ready to make NPS the most exciting financial decision for every young Indian."
```

### Demo Checklist

```
□ App running on physical Android device (not emulator)
□ Backend running on cloud (not localhost) for demo
□ Test data pre-loaded (Riya's account at Day 3)
□ Demo video recorded as backup (in case of internet issues)
□ Hindi mode tested and working
□ All 3 avatar states demonstrated
□ Leaderboard showing real-looking data (seeded)
□ AI Coach responsive (< 3 seconds)
□ Simulator sliders smooth on device
□ Share card generates correctly
□ Backup: PDF of all screens ready
```

---

## Quick Start Commands Summary

```bash
# Clone repo
git clone https://github.com/your-org/pensionquest && cd pensionquest

# Start all Docker services
cd infra && docker-compose up -d

# Setup backend
cd ../backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
python scripts/seed_quests.py
python scripts/seed_badges.py
uvicorn app.main:app --reload

# Start mobile app
cd ../frontend-mobile && npm install && npx expo start

# Start web app
cd ../frontend-web && npm install && npm run dev

# Run tests
cd ../backend && pytest tests/ -v

# View API docs
open http://localhost:8000/docs
```

---

> **Built by Team PensionQuest**  
> Shivam Raut · Aryan Tandale · Pranjali Kale · Vedika Sonnekar  
> PFRDA Hackathon 2026 | SIIC IIT Kanpur | Powered by APIX
```
