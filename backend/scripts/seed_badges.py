"""Seed 15 badges into the database."""
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.database import AsyncSessionLocal
from app.models.badge import Badge, BadgeCategory

BADGES = [
    # Learning badges
    {"name": "First Quest", "description": "Complete your first NPS quest", "category": BadgeCategory.LEARNING, "trigger_type": "quest_count", "trigger_value": 1, "xp_bonus": 50},
    {"name": "NPS Scholar", "description": "Complete 10 NPS quests", "category": BadgeCategory.LEARNING, "trigger_type": "quest_count", "trigger_value": 10, "xp_bonus": 200},
    {"name": "NPS Expert", "description": "Complete 25 NPS quests", "category": BadgeCategory.LEARNING, "trigger_type": "quest_count", "trigger_value": 25, "xp_bonus": 500},

    # Streak badges
    {"name": "Streak 3", "description": "Maintain a 3-day learning streak", "category": BadgeCategory.STREAK, "trigger_type": "streak_days", "trigger_value": 3, "xp_bonus": 100},
    {"name": "Streak 7", "description": "Maintain a 7-day learning streak", "category": BadgeCategory.STREAK, "trigger_type": "streak_days", "trigger_value": 7, "xp_bonus": 300},
    {"name": "Streak 30", "description": "Maintain a 30-day learning streak", "category": BadgeCategory.STREAK, "trigger_type": "streak_days", "trigger_value": 30, "xp_bonus": 1000},

    # Contribution badges
    {"name": "First Step", "description": "Make your first NPS contribution", "category": BadgeCategory.CONTRIBUTION, "trigger_type": "contribution_count", "trigger_value": 1, "xp_bonus": 150},
    {"name": "Saver 5K", "description": "Contribute ₹5,000 total to NPS", "category": BadgeCategory.CONTRIBUTION, "trigger_type": "contribution_total", "trigger_value": 5000, "xp_bonus": 300},
    {"name": "Five Figure", "description": "Contribute ₹10,000 total to NPS", "category": BadgeCategory.CONTRIBUTION, "trigger_type": "contribution_total", "trigger_value": 10000, "xp_bonus": 500},
    {"name": "Consistent Saver", "description": "Contribute for 6 consecutive months", "category": BadgeCategory.CONTRIBUTION, "trigger_type": "contribution_months", "trigger_value": 6, "xp_bonus": 750},

    # Social badges
    {"name": "Ambassador", "description": "Refer 3 friends to PensionQuest", "category": BadgeCategory.SOCIAL, "trigger_type": "referral_count", "trigger_value": 3, "xp_bonus": 400},
    {"name": "Influencer", "description": "Refer 10 friends to PensionQuest", "category": BadgeCategory.SOCIAL, "trigger_type": "referral_count", "trigger_value": 10, "xp_bonus": 1000},

    # Special badges
    {"name": "Simulator Pro", "description": "Use the retirement simulator 5 times", "category": BadgeCategory.SPECIAL, "trigger_type": "simulator_sessions", "trigger_value": 5, "xp_bonus": 200},
    {"name": "AI Explorer", "description": "Have 10 conversations with the AI Coach", "category": BadgeCategory.SPECIAL, "trigger_type": "ai_chats", "trigger_value": 10, "xp_bonus": 200},
    {"name": "Multilingual", "description": "Use PensionQuest in 2 different languages", "category": BadgeCategory.SPECIAL, "trigger_type": "languages_used", "trigger_value": 2, "xp_bonus": 150},
]


async def seed():
    async with AsyncSessionLocal() as session:
        for b_data in BADGES:
            badge = Badge(**b_data)
            session.add(badge)
        await session.commit()
        print(f"✅ Seeded {len(BADGES)} badges successfully.")


if __name__ == "__main__":
    asyncio.run(seed())
