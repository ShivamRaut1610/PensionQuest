from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models.user import User
from app.models.contribution import Contribution
from app.services.avatar_service import calculate_avatar_state, get_recommended_contribution
from app.services.leaderboard_service import update_user_xp
from app.services.xp_service import award_xp, XPAction
from app.utils.auth import get_current_user

router = APIRouter()


class ContributionCreate(BaseModel):
    amount: float = Field(..., gt=0)
    source: str = Field(default="manual")
    financial_year: Optional[str] = None


@router.post("/add")
async def add_contribution(
    data: ContributionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Log a new NPS contribution and update avatar state."""
    # Determine financial year
    now = datetime.utcnow()
    fy = data.financial_year or (
        f"{now.year}-{str(now.year + 1)[-2:]}" if now.month >= 4
        else f"{now.year - 1}-{str(now.year)[-2:]}"
    )

    contribution = Contribution(
        user_id=current_user.id,
        amount=data.amount,
        source=data.source,
        financial_year=fy
    )
    db.add(contribution)

    # Check if this is first contribution
    count_result = await db.execute(
        select(func.count(Contribution.id))
        .where(Contribution.user_id == current_user.id)
    )
    is_first = (count_result.scalar() or 0) == 0

    if is_first:
        await award_xp(db, current_user, 500, XPAction.FIRST_CONTRIBUTION)
    else:
        await award_xp(db, current_user, 100, XPAction.MONTHLY_CONTRIBUTION)

    # Update avatar state
    total_result = await db.execute(
        select(func.sum(Contribution.amount))
        .where(Contribution.user_id == current_user.id)
    )
    total = (total_result.scalar() or 0) + data.amount

    count_for_avg = (count_result.scalar() or 0) + 1
    monthly_avg = total / max(count_for_avg, 1)

    recommended = get_recommended_contribution(current_user.income_range or "20000-30000")
    new_state = calculate_avatar_state(monthly_avg, recommended)
    current_user.avatar_state = new_state

    # Update leaderboard
    await update_user_xp(str(current_user.id), current_user.total_xp, current_user.city)

    await db.commit()

    return {
        "message": "Contribution logged",
        "amount": data.amount,
        "financial_year": fy,
        "avatar_state": new_state.value,
        "total_contributed": total,
    }


@router.get("/history")
async def get_contribution_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's contribution history."""
    result = await db.execute(
        select(Contribution)
        .where(Contribution.user_id == current_user.id)
        .order_by(Contribution.contributed_at.desc())
    )
    contributions = result.scalars().all()

    total_result = await db.execute(
        select(func.sum(Contribution.amount))
        .where(Contribution.user_id == current_user.id)
    )
    total = total_result.scalar() or 0

    return {
        "contributions": [
            {
                "id": str(c.id),
                "amount": c.amount,
                "source": c.source,
                "financial_year": c.financial_year,
                "contributed_at": c.contributed_at.isoformat() if c.contributed_at else None,
            }
            for c in contributions
        ],
        "total": total,
        "count": len(contributions),
    }
