from enum import Enum


class AvatarState(str, Enum):
    THRIVING = "thriving"
    STABLE = "stable"
    STRUGGLING = "struggling"
    CRITICAL = "critical"
    ZERO = "zero"


def calculate_avatar_state(
    monthly_contribution: float,
    recommended_contribution: float
) -> AvatarState:
    """
    Recommended contribution = 10% of monthly income (NPS guideline baseline).
    Avatar state is based on % of recommended contribution being made.
    """
    if recommended_contribution == 0 or monthly_contribution == 0:
        return AvatarState.ZERO

    pct = (monthly_contribution / recommended_contribution) * 100

    if pct >= 100:
        return AvatarState.THRIVING
    elif pct >= 80:
        return AvatarState.STABLE
    elif pct >= 50:
        return AvatarState.STRUGGLING
    elif pct >= 20:
        return AvatarState.CRITICAL
    else:
        return AvatarState.ZERO


def get_recommended_contribution(income_range: str) -> float:
    """Parse income range string and return 10% as recommended NPS contribution."""
    try:
        parts = income_range.split("-")
        avg_income = (int(parts[0]) + int(parts[1])) / 2
        return avg_income * 0.10
    except Exception:
        return 1000  # Default fallback
