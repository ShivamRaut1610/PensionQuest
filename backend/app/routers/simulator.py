from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import Optional, List

from app.models.user import User
from app.services.simulator_service import run_simulation, run_comparison
from app.utils.auth import get_current_user

router = APIRouter()


class SimulationRequest(BaseModel):
    current_age: Optional[int] = None
    retirement_age: int = Field(default=60, ge=50, le=75)
    monthly_contribution: float = Field(..., ge=0, le=200000)
    annual_return_pct: float = Field(default=10.0, ge=0, le=30)
    risk_profile: str = "moderate"
    annual_income: float = Field(default=0, ge=0)


class ComparisonRequest(BaseModel):
    retirement_age: int = Field(default=60, ge=50, le=75)
    contributions: List[float] = Field(..., min_length=2, max_length=5)
    annual_return_pct: float = Field(default=10.0, ge=0, le=30)
    annual_income: float = Field(default=0, ge=0)


@router.post("/calculate")
async def calculate(
    params: SimulationRequest,
    current_user: User = Depends(get_current_user),
):
    """Calculate projected NPS corpus based on contribution parameters."""
    age = params.current_age or current_user.age

    result = await run_simulation(
        current_age=age,
        retirement_age=params.retirement_age,
        monthly_contribution=params.monthly_contribution,
        annual_return_pct=params.annual_return_pct,
        risk_profile=params.risk_profile,
        annual_income=params.annual_income
    )

    return result


@router.post("/compare")
async def compare_scenarios(
    params: ComparisonRequest,
    current_user: User = Depends(get_current_user),
):
    """Compare multiple contribution scenarios side by side."""
    results = await run_comparison(
        current_age=current_user.age,
        retirement_age=params.retirement_age,
        contributions=params.contributions,
        annual_return_pct=params.annual_return_pct,
        annual_income=params.annual_income
    )

    return {"scenarios": results}
