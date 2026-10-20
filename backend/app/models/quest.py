from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
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
    title_hi = Column(String(200))  # Hindi translation
    description = Column(Text)
    description_hi = Column(Text)
    difficulty = Column(Enum(QuestDifficulty), nullable=False)
    xp_reward = Column(Integer, nullable=False)
    options = Column(JSONB)  # {"a": "...", "b": "...", "c": "...", "d": "..."}
    options_hi = Column(JSONB)  # Hindi options
    correct_answer = Column(String(1))  # "a", "b", "c", or "d"
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
    completed_at = Column(DateTime(timezone=True), server_default=func.now())
    xp_earned = Column(Integer, default=0)
    answer_given = Column(String(1))
    is_correct = Column(Boolean)

    user = relationship("User", back_populates="quest_progress")
    quest = relationship("Quest")
