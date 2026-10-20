from app.utils.nps_calculator import calculate_nps_corpus, SimulationResult


async def run_simulation(
    current_age: int,
    retirement_age: int,
    monthly_contribution: float,
    annual_return_pct: float = 10.0,
    risk_profile: str = "moderate",
    annual_income: float = 0
) -> dict:
    """Run NPS retirement simulation and return results as dict."""
    result = calculate_nps_corpus(
        current_age=current_age,
        retirement_age=retirement_age,
        monthly_contribution=monthly_contribution,
        annual_return_pct=annual_return_pct,
        risk_profile=risk_profile,
        annual_income=annual_income
    )

    return {
        "projected_corpus": result.projected_corpus,
        "monthly_pension": result.monthly_pension,
        "tax_saved_total": result.tax_saved_total,
        "years_to_retire": result.years_to_retire,
        "cost_of_delay_1yr": result.cost_of_delay_1yr,
        "cost_of_delay_3yr": result.cost_of_delay_3yr,
        "cost_of_delay_5yr": result.cost_of_delay_5yr,
    }


async def run_comparison(
    current_age: int,
    retirement_age: int,
    contributions: list[float],
    annual_return_pct: float = 10.0,
    annual_income: float = 0
) -> list[dict]:
    """Run multiple scenarios for side-by-side comparison."""
    results = []
    for contribution in contributions:
        result = await run_simulation(
            current_age=current_age,
            retirement_age=retirement_age,
            monthly_contribution=contribution,
            annual_return_pct=annual_return_pct,
            annual_income=annual_income
        )
        result["monthly_contribution"] = contribution
        results.append(result)
    return results
