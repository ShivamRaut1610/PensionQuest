from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.user import User
from app.models.streak import Streak
from app.schemas.user import UserProfile, UserUpdate
from app.utils.auth import get_current_user

router = APIRouter()


@router.get("/profile", response_model=UserProfile)
async def get_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get current user's profile."""
    # Load streak
    streak_result = await db.execute(
        select(Streak).where(Streak.user_id == current_user.id)
    )
    streak = streak_result.scalar_one_or_none()

    return UserProfile(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        age=current_user.age,
        income_range=current_user.income_range,
        risk_profile=current_user.risk_profile,
        retirement_age=current_user.retirement_age,
        language=current_user.language.value if current_user.language else "en",
        avatar_state=current_user.avatar_state.value if current_user.avatar_state else "zero",
        total_xp=current_user.total_xp,
        level=current_user.level,
        is_nps_enrolled=current_user.is_nps_enrolled,
        created_at=current_user.created_at,
    )


@router.put("/update")
async def update_profile(
    updates: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update current user's profile."""
    update_data = updates.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(current_user, field, value)

    await db.commit()
    await db.refresh(current_user)

    return {"message": "Profile updated", "user_id": str(current_user.id)}
