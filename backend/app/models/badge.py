from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
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
    trigger_type = Column(String(50))   # "quest_count", "streak_days", "contribution_amount"
    trigger_value = Column(Integer)     # e.g., 10 quests, 7 days, 5000 rupees
    xp_bonus = Column(Integer, default=0)


class UserBadge(Base):
    __tablename__ = "user_badges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    badge_id = Column(UUID(as_uuid=True), ForeignKey("badges.id"), nullable=False)
    unlocked_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="badges")
    badge = relationship("Badge")
