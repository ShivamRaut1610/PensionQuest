from pydantic import BaseModel, Field
from typing import Optional, Dict
from uuid import UUID


class QuestResponse(BaseModel):
    id: UUID
    title: str
    description: str
    difficulty: str
    xp_reward: int
    options: Dict[str, str]

    class Config:
        from_attributes = True


class QuestSubmit(BaseModel):
    quest_id: str
    answer: str = Field(..., min_length=1, max_length=1)


class QuestResultResponse(BaseModel):
    is_correct: bool
    correct_answer: str
    explanation: str
    xp_earned: int
    total_xp: int
    streak: dict
    new_badges: list
