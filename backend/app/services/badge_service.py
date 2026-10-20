from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime

from app.models.badge import Badge, UserBadge, BadgeCategory
from app.models.quest import QuestProgress
from app.models.contribution import Contribution
from app.models.user import User

BADGE_TRIGGERS = {
    "first_quest":       {"type": "quest_count",         "value": 1},
    "nps_scholar":       {"type": "quest_count",         "value": 10},
    "nps_expert":        {"type": "quest_count",         "value": 25},
    "streak_3":          {"type": "streak_days",         "value": 3},
    "streak_7":          {"type": "streak_days",         "value": 7},
    "streak_30":         {"type": "streak_days",         "value": 30},
    "first_step":        {"type": "contribution_count",  "value": 1},
    "saver_5k":          {"type": "contribution_total",  "value": 5000},
    "five_figure":       {"type": "contribution_total",  "value": 10000},
    "consistent_saver":  {"type": "contribution_months", "value": 6},
    "ambassador":        {"type": "referral_count",      "value": 3},
    "influencer":        {"type": "referral_count",      "value": 10},
}


async def check_and_award_badges(db: AsyncSession, user: User) -> list:
    """Check all badge conditions and award any newly earned badges."""
    new_badges = []

    # Get already unlocked badges
    unlocked = await db.execute(
        select(UserBadge.badge_id).where(UserBadge.user_id == user.id)
    )
    unlocked_ids = {str(r[0]) for r in unlocked.fetchall()}

    # Check quest count
    quest_count_result = await db.execute(
        select(func.count(QuestProgress.id))
        .where(QuestProgress.user_id == user.id)
        .where(QuestProgress.is_correct == True)
    )
    quest_count = quest_count_result.scalar() or 0

    # Check contribution total
    contrib_total_result = await db.execute(
        select(func.sum(Contribution.amount))
        .where(Contribution.user_id == user.id)
    )
    contrib_total = contrib_total_result.scalar() or 0

    # Check each badge condition
    all_badges = await db.execute(select(Badge))
    for badge in all_badges.scalars():
        if str(badge.id) in unlocked_ids:
            continue

        earned = False
        trigger = BADGE_TRIGGERS.get(badge.name.lower().replace(" ", "_"))
        if not trigger:
            continue

        if trigger["type"] == "quest_count" and quest_count >= trigger["value"]:
            earned = True
        elif trigger["type"] == "contribution_total" and contrib_total >= trigger["value"]:
            earned = True
        elif trigger["type"] == "streak_days" and user.streaks and \
             user.streaks.current_streak >= trigger["value"]:
            earned = True

        if earned:
            user_badge = UserBadge(
                user_id=user.id,
                badge_id=badge.id,
            )
            db.add(user_badge)
            new_badges.append({
                "id": str(badge.id),
                "name": badge.name,
                "description": badge.description,
                "category": badge.category.value if badge.category else None,
                "icon_url": badge.icon_url,
            })

    return new_badges
