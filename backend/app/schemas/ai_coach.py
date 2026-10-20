from pydantic import BaseModel, Field
from typing import Optional, List


class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    conversation_history: List[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str
    disclaimer: str
