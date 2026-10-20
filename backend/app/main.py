from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.routers import auth, users, quests, gamification, simulator, ai_coach, contributions, notifications

app = FastAPI(
    title="PensionQuest API",
    description="Backend API for PensionQuest — Gamified NPS Platform",
    version="1.0.0"
)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8081",
        "https://pensionquest.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/user", tags=["Users"])
app.include_router(quests.router, prefix="/api/quests", tags=["Quests"])
app.include_router(gamification.router, prefix="/api/gamification", tags=["Gamification"])
app.include_router(simulator.router, prefix="/api/simulator", tags=["Simulator"])
app.include_router(ai_coach.router, prefix="/api/ai", tags=["AI Coach"])
app.include_router(contributions.router, prefix="/api/contributions", tags=["Contributions"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "PensionQuest API"}
