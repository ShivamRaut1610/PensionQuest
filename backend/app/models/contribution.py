from sqlalchemy import Column, String, Float, DateTime, ForeignKey
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
