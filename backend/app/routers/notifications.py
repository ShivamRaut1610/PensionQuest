from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional

from app.models.user import User
from app.utils.auth import get_current_user

router = APIRouter()


class NotificationSettings(BaseModel):
    daily_quest: bool = True
    streak_reminder: bool = True
    contribution_nudge: bool = True
    badge_unlocked: bool = True


@router.post("/register-token")
async def register_fcm_token(
    fcm_token: str,
    current_user: User = Depends(get_current_user),
):
    """Register FCM token for push notifications."""
    # In production, save to DB
    return {"message": "FCM token registered", "user_id": str(current_user.id)}


@router.get("/settings")
async def get_notification_settings(
    current_user: User = Depends(get_current_user),
):
    """Get notification preferences."""
    return NotificationSettings()


@router.put("/settings")
async def update_notification_settings(
    settings: NotificationSettings,
    current_user: User = Depends(get_current_user),
):
    """Update notification preferences."""
    return {"message": "Notification settings updated"}
