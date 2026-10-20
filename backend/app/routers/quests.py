from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.quest import Quest, QuestProgress, QuestDifficulty
from app.models.user import User
from app.services.xp_service import award_xp, XPAction
from app.services.badge_service import check_and_award_badges
from app.services.streak_service import update_streak
from app.utils.auth import get_current_user
from app.schemas.quest import QuestSubmit

router = APIRouter()


@router.get("/daily")
async def get_daily_quest(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Returns today's quest for the user based on their level."""
    # Get quests already completed by this user
    completed_result = await db.execute(
        select(QuestProgress.quest_id)
        .where(QuestProgress.user_id == current_user.id)
    )
    completed_ids = [str(r[0]) for r in completed_result.fetchall()]

    # Select difficulty based on user level
    if current_user.level <= 2:
        difficulty = QuestDifficulty.BEGINNER
    elif current_user.level <= 4:
        difficulty = QuestDifficulty.INTERMEDIATE
    else:
        difficulty = QuestDifficulty.ADVANCED

    quest_result = await db.execute(
        select(Quest)
        .where(Quest.is_active == True)
        .where(Quest.difficulty == difficulty)
        .where(~Quest.id.in_(completed_ids) if completed_ids else True)
        .order_by(Quest.order_index)
        .limit(1)
    )
    quest = quest_result.scalar_one_or_none()

    if not quest:
        # Fall back to any difficulty
        quest_result = await db.execute(
            select(Quest)
            .where(Quest.is_active == True)
            .where(~Quest.id.in_(completed_ids) if completed_ids else True)
            .limit(1)
        )
        quest = quest_result.scalar_one_or_none()

    if not quest:
        return {"message": "All quests completed! New quests coming soon.", "quest": None}

    # Return language-appropriate content
    lang = current_user.language.value if current_user.language else "en"
    return {
        "id": str(quest.id),
        "title": quest.title_hi if lang == "hi" and quest.title_hi else quest.title,
        "description": quest.description_hi if lang == "hi" and quest.description_hi else quest.description,
        "difficulty": quest.difficulty.value,
        "xp_reward": quest.xp_reward,
        "options": quest.options_hi if lang == "hi" and quest.options_hi else quest.options,
    }


@router.post("/submit")
async def submit_quest_answer(
    submission: QuestSubmit,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Submit a quest answer, award XP, check badges, update streak."""
    quest = await db.get(Quest, submission.quest_id)
    if not quest:
        raise HTTPException(status_code=404, detail="Quest not found")

    # Check if already completed
    existing = await db.execute(
        select(QuestProgress)
        .where(QuestProgress.user_id == current_user.id)
        .where(QuestProgress.quest_id == submission.quest_id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Quest already completed")

    is_correct = submission.answer.lower() == quest.correct_answer.lower()
    xp_earned = quest.xp_reward if is_correct else max(quest.xp_reward // 5, 10)

    # Log progress
    progress = QuestProgress(
        user_id=current_user.id,
        quest_id=quest.id,
        xp_earned=xp_earned,
        answer_given=submission.answer,
        is_correct=is_correct
    )
    db.add(progress)

    # Award XP
    await award_xp(db, current_user, xp_earned, XPAction.QUEST_COMPLETE)

    # Update streak
    streak_result = await update_streak(db, current_user)

    # Check badge conditions
    new_badges = await check_and_award_badges(db, current_user)

    await db.commit()

    lang = current_user.language.value if current_user.language else "en"
    explanation = quest.explanation_hi if lang == "hi" and quest.explanation_hi else quest.explanation

    return {
        "is_correct": is_correct,
        "correct_answer": quest.correct_answer,
        "explanation": explanation,
        "xp_earned": xp_earned,
        "total_xp": current_user.total_xp,
        "streak": streak_result,
        "new_badges": new_badges,
    }
