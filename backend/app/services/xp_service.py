from enum import Enum
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update
from app.models.user import User


class XPAction(str, Enum):
    DAILY_LOGIN = "daily_login"
    QUEST_COMPLETE = "quest_complete"
    STREAK_7_DAY = "streak_7_day"
    STREAK_30_DAY = "streak_30_day"
    FIRST_CONTRIBUTION = "first_contribution"
    MONTHLY_CONTRIBUTION = "monthly_contribution"
    REFER_FRIEND = "refer_friend"
    SHARE_MILESTONE = "share_milestone"
    SIMULATOR_SESSION = "simulator_session"


XP_VALUES = {
    XPAction.DAILY_LOGIN: 10,
    XPAction.STREAK_7_DAY: 200,
    XPAction.STREAK_30_DAY: 1000,
    XPAction.FIRST_CONTRIBUTION: 500,
    XPAction.MONTHLY_CONTRIBUTION: 100,
    XPAction.REFER_FRIEND: 250,
    XPAction.SHARE_MILESTONE: 25,
    XPAction.SIMULATOR_SESSION: 75,
}

LEVEL_THRESHOLDS = [0, 500, 1500, 3500, 7500, 15000, 30000]
LEVEL_TITLES = [
    "NPS Rookie", "NPS Learner", "NPS Aware",
    "NPS Saver", "NPS Champion", "NPS Master", "NPS Legend"
]


async def award_xp(db: AsyncSession, user: User, xp: int, action: XPAction):
    """Award XP to user and level them up if needed."""
    user.total_xp += xp
    new_level = calculate_level(user.total_xp)

    level_up = new_level > user.level
    user.level = new_level

    await db.execute(
        update(User)
        .where(User.id == user.id)
        .values(total_xp=user.total_xp, level=user.level)
    )

    return {
        "xp_earned": xp,
        "total_xp": user.total_xp,
        "level": user.level,
        "level_title": LEVEL_TITLES[min(user.level - 1, len(LEVEL_TITLES) - 1)],
        "level_up": level_up
    }


def calculate_level(total_xp: int) -> int:
    level = 1
    for i, threshold in enumerate(LEVEL_THRESHOLDS):
        if total_xp >= threshold:
            level = i + 1
    return min(level, 7)
