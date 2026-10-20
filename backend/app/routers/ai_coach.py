from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models.user import User
from app.models.contribution import Contribution
from app.schemas.ai_coach import ChatRequest, ChatResponse
from app.services.ai_service import get_ai_response
from app.utils.auth import get_current_user

router = APIRouter()

# Prompt templates
SYSTEM_PROMPT_EN = """
You are an NPS (National Pension System) Pension Coach for India.
You help young Indians aged 18-35 understand, enroll in, and contribute to NPS.

USER PROFILE:
- Name: {name}
- Age: {age}
- Monthly Income: ₹{income}
- Current NPS Contributions: ₹{monthly_contribution}/month
- Total Contributed: ₹{total_contributed}
- Retirement Age Goal: {retirement_age}
- Risk Profile: {risk_profile}
- Current Level: {level}

RULES YOU MUST FOLLOW:
1. Only give NPS-specific advice based on PFRDA guidelines.
2. Always end financial projections with: "This is an estimate based on historical NPS returns. Not financial advice."
3. For corpus calculations, use 10% annual return as the default.
4. Section 80CCD(1) allows deduction up to 10% of salary (max ₹1.5 lakh under 80C).
5. Section 80CCD(1B) allows additional ₹50,000 deduction.
6. Tier I has a lock-in until age 60; 60% withdrawal tax-free at maturity.
7. Minimum contribution for Tier I is ₹500/year (₹1,000 for account opening).
8. Be warm, encouraging, and use simple language.
9. Keep responses concise — maximum 4 sentences unless user asks for more.
10. If asked about anything unrelated to NPS/finance, politely redirect.

RESPONSE LANGUAGE: {language}
"""

SYSTEM_PROMPT_HI = """
आप भारत के लिए एक NPS (राष्ट्रीय पेंशन प्रणाली) पेंशन कोच हैं।
आप 18-35 आयु के युवा भारतीयों को NPS को समझने, उसमें नामांकन करने और योगदान करने में मदद करते हैं।

उपयोगकर्ता प्रोफ़ाइल:
- नाम: {name}
- आयु: {age}
- मासिक आय: ₹{income}
- वर्तमान NPS योगदान: ₹{monthly_contribution}/माह
- सेवानिवृत्ति आयु लक्ष्य: {retirement_age}

नियम:
1. केवल PFRDA दिशानिर्देशों के आधार पर NPS-विशिष्ट सलाह दें।
2. वित्तीय अनुमानों के अंत में हमेशा कहें: "यह एक अनुमान है, वित्तीय सलाह नहीं।"
3. सरल, मैत्रीपूर्ण हिंदी का उपयोग करें।
4. प्रतिक्रियाएं संक्षिप्त रखें।
"""


@router.post("/coach/chat", response_model=ChatResponse)
async def chat_with_coach(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Send message to AI Pension Coach and get personalized response."""

    # Get user's contribution data
    total_result = await db.execute(
        select(func.sum(Contribution.amount))
        .where(Contribution.user_id == current_user.id)
    )
    total_contributions = total_result.scalar() or 0

    count_result = await db.execute(
        select(func.count(Contribution.id))
        .where(Contribution.user_id == current_user.id)
    )
    contrib_count = count_result.scalar() or 0
    monthly_avg = total_contributions / max(contrib_count, 1)

    # Build system prompt
    lang = current_user.language.value if current_user.language else "en"
    system_template = SYSTEM_PROMPT_HI if lang == "hi" else SYSTEM_PROMPT_EN

    system_prompt = system_template.format(
        name=current_user.name,
        age=current_user.age,
        income=current_user.income_range or "Not specified",
        monthly_contribution=round(monthly_avg),
        total_contributed=round(total_contributions),
        retirement_age=current_user.retirement_age,
        risk_profile=current_user.risk_profile,
        level=current_user.level,
        language="Hindi" if lang == "hi" else "English"
    )

    # Build messages
    messages = [{"role": m.role, "content": m.content} for m in request.conversation_history[-10:]]
    messages.append({"role": "user", "content": request.message})

    # Call AI
    reply = await get_ai_response(system_prompt, messages)

    disclaimer = (
        "This is an AI estimate, not financial advice."
        if lang == "en"
        else "यह एक AI अनुमान है, वित्तीय सलाह नहीं।"
    )

    return ChatResponse(reply=reply, disclaimer=disclaimer)
