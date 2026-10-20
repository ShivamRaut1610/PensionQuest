from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserCreate(BaseModel):
    firebase_token: str
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=18, le=100)
    income_range: Optional[str] = None
    language: str = "en"
    retirement_age: int = Field(default=60, ge=50, le=75)
    risk_profile: str = Field(default="moderate")


class UserUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    income_range: Optional[str] = None
    language: Optional[str] = None
    retirement_age: Optional[int] = None
    risk_profile: Optional[str] = None
    fcm_token: Optional[str] = None
    city: Optional[str] = None


class UserProfile(BaseModel):
    id: UUID
    name: str
    email: Optional[str] = None
    age: int
    income_range: Optional[str] = None
    risk_profile: str
    retirement_age: int
    language: str
    avatar_state: str
    total_xp: int
    level: int
    is_nps_enrolled: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    user: UserProfile
    token: str
