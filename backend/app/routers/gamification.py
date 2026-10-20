from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import User
from app.services.leaderboard_service import get_leaderboard, get_user_rank
from app.utils.auth import get_current_user

router = APIRouter()


@router.get("/leaderboard")
async def get_leaderboard_endpoint(
    board_type: str = Query(default="national", regex="^(national|city|streak|contribution)$"),
    city: str = Query(default=None),
    limit: int = Query(default=50, ge=1, le=100),
    current_user: User = Depends(get_current_user),
):
    """Get leaderboard rankings."""
    leaderboard = await get_leaderboard(board_type, city=city, limit=limit)
    user_rank = await get_user_rank(str(current_user.id), board_type)

    return {
        "leaderboard": leaderboard,
        "user_rank": user_rank,
    }


@router.get("/badges")
async def get_user_badges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all badges earned by the current user."""
    from sqlalchemy import select
    from app.models.badge import UserBadge, Badge

    result = await db.execute(
        select(UserBadge, Badge)
        .join(Badge, UserBadge.badge_id == Badge.id)
        .where(UserBadge.user_id == current_user.id)
    )

    badges = []
    for user_badge, badge in result.fetchall():
        badges.append({
            "id": str(badge.id),
            "name": badge.name,
            "description": badge.description,
            "category": badge.category.value,
            "icon_url": badge.icon_url,
            "unlocked_at": user_badge.unlocked_at.isoformat() if user_badge.unlocked_at else None,
        })

    return {"badges": badges, "total": len(badges)}


@router.get("/xp")
async def get_xp_status(
    current_user: User = Depends(get_current_user),
):
    """Get current XP and level status."""
    from app.services.xp_service import LEVEL_THRESHOLDS, LEVEL_TITLES

    current_level = current_user.level
    next_threshold = LEVEL_THRESHOLDS[min(current_level, len(LEVEL_THRESHOLDS) - 1)]
    prev_threshold = LEVEL_THRESHOLDS[max(current_level - 2, 0)] if current_level > 1 else 0

    return {
        "total_xp": current_user.total_xp,
        "level": current_level,
        "level_title": LEVEL_TITLES[min(current_level - 1, len(LEVEL_TITLES) - 1)],
        "xp_to_next_level": max(next_threshold - current_user.total_xp, 0),
        "level_progress_pct": round(
            (current_user.total_xp - prev_threshold) / max(next_threshold - prev_threshold, 1) * 100, 1
        )
    }
