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
    fcm_token = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    contributions = relationship("Contribution", back_populates="user")
    quest_progress = relationship("QuestProgress", back_populates="user")
    badges = relationship("UserBadge", back_populates="user")
    streaks = relationship("Streak", back_populates="user", uselist=False)
