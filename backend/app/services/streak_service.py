from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date, timedelta

from app.models.streak import Streak
from app.models.user import User
from app.services.xp_service import award_xp, XPAction


async def update_streak(db: AsyncSession, user: User) -> dict:
    """Update user's daily streak on quest completion."""
    result = await db.execute(
        select(Streak).where(Streak.user_id == user.id)
    )
    streak = result.scalar_one_or_none()

    if not streak:
        streak = Streak(user_id=user.id, current_streak=0, longest_streak=0)
        db.add(streak)

    today = date.today()
    yesterday = today - timedelta(days=1)

    xp_bonus = 0
    if streak.last_active_date == today:
        # Already active today
        pass
    elif streak.last_active_date == yesterday:
        # Continuing streak
        streak.current_streak += 1
        streak.longest_streak = max(streak.longest_streak, streak.current_streak)

        if streak.current_streak == 7:
            xp_bonus = 200
            await award_xp(db, user, 200, XPAction.STREAK_7_DAY)
        elif streak.current_streak == 30:
            xp_bonus = 1000
            await award_xp(db, user, 1000, XPAction.STREAK_30_DAY)
    else:
        # Streak broken — reset
        streak.current_streak = 1

    streak.last_active_date = today

    return {
        "current_streak": streak.current_streak,
        "longest_streak": streak.longest_streak,
        "streak_bonus_xp": xp_bonus
    }
