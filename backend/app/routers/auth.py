from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.user import User
from app.models.streak import Streak
from app.schemas.user import UserCreate, UserResponse, UserProfile
from app.utils.auth import create_jwt_token
from app.config import settings

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=201)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Register a new user. Firebase token is verified server-side.
    User profile is created in PostgreSQL.
    """
    # For development: accept any firebase_token and use it as UID
    # In production: verify with firebase_auth.verify_id_token()
    firebase_uid = user_data.firebase_token  # Simplified for PoC

    try:
        # In production, uncomment:
        # from firebase_admin import auth as firebase_auth
        # decoded_token = firebase_auth.verify_id_token(user_data.firebase_token)
        # firebase_uid = decoded_token["uid"]
        pass
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
        email=f"{firebase_uid}@pensionquest.dev",  # Dev fallback
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

    user_profile = UserProfile(
        id=user.id,
        name=user.name,
        email=user.email,
        age=user.age,
        income_range=user.income_range,
        risk_profile=user.risk_profile,
        retirement_age=user.retirement_age,
        language=user.language.value if user.language else "en",
        avatar_state=user.avatar_state.value if user.avatar_state else "zero",
        total_xp=user.total_xp,
        level=user.level,
        is_nps_enrolled=user.is_nps_enrolled,
        created_at=user.created_at,
    )

    return UserResponse(user=user_profile, token=token)


@router.post("/login")
async def login(firebase_token: str, db: AsyncSession = Depends(get_db)):
    """Login with Firebase token, returns JWT for subsequent API calls."""
    # For development: use token directly as UID
    firebase_uid = firebase_token

    user = await db.execute(
        select(User).where(User.firebase_uid == firebase_uid)
    )
    user = user.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = create_jwt_token({"sub": str(user.id)})
    return {"token": token, "user_id": str(user.id)}
