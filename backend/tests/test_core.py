"""Tests for PensionQuest API."""
import pytest
from app.utils.nps_calculator import calculate_nps_corpus


class TestNPSCalculator:
    """Test NPS corpus calculation logic."""

    def test_basic_corpus_calculation(self):
        """25yr old, retire at 60, ₹1000/mo, 10% return → ~₹38.4L"""
        result = calculate_nps_corpus(
            current_age=25,
            retirement_age=60,
            monthly_contribution=1000,
            annual_return_pct=10.0
        )
        assert 3500000 <= result.projected_corpus <= 4500000
        assert result.monthly_pension > 0
        assert result.years_to_retire == 35

    def test_zero_contribution(self):
        """Zero contribution should yield zero corpus."""
        result = calculate_nps_corpus(
            current_age=25,
            retirement_age=60,
            monthly_contribution=0,
            annual_return_pct=10.0
        )
        assert result.projected_corpus == 0
        assert result.monthly_pension == 0

    def test_higher_contribution_yields_more(self):
        """Doubling contribution should roughly double corpus."""
        result_1k = calculate_nps_corpus(25, 60, 1000, 10.0)
        result_2k = calculate_nps_corpus(25, 60, 2000, 10.0)
        assert result_2k.projected_corpus > result_1k.projected_corpus * 1.9

    def test_cost_of_delay_positive(self):
        """Delaying should always cost money."""
        result = calculate_nps_corpus(25, 60, 1000, 10.0)
        assert result.cost_of_delay_1yr > 0
        assert result.cost_of_delay_3yr > result.cost_of_delay_1yr
        assert result.cost_of_delay_5yr > result.cost_of_delay_3yr

    def test_tax_savings_with_income(self):
        """Tax savings should be positive when income is provided."""
        result = calculate_nps_corpus(
            current_age=25,
            retirement_age=60,
            monthly_contribution=5000,
            annual_return_pct=10.0,
            annual_income=800000
        )
        assert result.tax_saved_total > 0

    def test_short_investment_period(self):
        """Near-retirement age with small period."""
        result = calculate_nps_corpus(
            current_age=55,
            retirement_age=60,
            monthly_contribution=1000,
            annual_return_pct=10.0
        )
        assert result.years_to_retire == 5
        assert result.projected_corpus > 0


class TestXPService:
    """Test XP level calculation."""

    def test_level_calculation(self):
        from app.services.xp_service import calculate_level
        assert calculate_level(0) == 1
        assert calculate_level(499) == 1
        assert calculate_level(500) == 2
        assert calculate_level(1500) == 3
        assert calculate_level(30000) == 7
        assert calculate_level(999999) == 7


class TestAvatarService:
    """Test avatar state calculation."""

    def test_zero_state(self):
        from app.services.avatar_service import calculate_avatar_state, AvatarState
        assert calculate_avatar_state(0, 1000) == AvatarState.ZERO

    def test_thriving_state(self):
        from app.services.avatar_service import calculate_avatar_state, AvatarState
        assert calculate_avatar_state(1000, 1000) == AvatarState.THRIVING

    def test_stable_state(self):
        from app.services.avatar_service import calculate_avatar_state, AvatarState
        assert calculate_avatar_state(800, 1000) == AvatarState.STABLE

    def test_struggling_state(self):
        from app.services.avatar_service import calculate_avatar_state, AvatarState
        assert calculate_avatar_state(500, 1000) == AvatarState.STRUGGLING

    def test_critical_state(self):
        from app.services.avatar_service import calculate_avatar_state, AvatarState
        assert calculate_avatar_state(200, 1000) == AvatarState.CRITICAL

    def test_recommended_contribution(self):
        from app.services.avatar_service import get_recommended_contribution
        assert get_recommended_contribution("20000-30000") == 2500.0
        assert get_recommended_contribution("invalid") == 1000  # fallback
