from openai import AsyncOpenAI
from app.config import settings

# Initialize based on provider
openai_client = None
if settings.OPENAI_API_KEY and settings.AI_PROVIDER == "openai":
    openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def get_ai_response(
    system_prompt: str,
    messages: list[dict],
    max_tokens: int = 500,
    temperature: float = 0.7
) -> str:
    """Get response from AI provider (OpenAI or Gemini)."""

    if settings.AI_PROVIDER == "openai" and openai_client:
        all_messages = [{"role": "system", "content": system_prompt}]
        all_messages.extend(messages)

        response = await openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=all_messages,
            max_tokens=max_tokens,
            temperature=temperature
        )
        return response.choices[0].message.content

    elif settings.AI_PROVIDER == "gemini":
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Combine system prompt and messages into a single prompt
        full_prompt = f"{system_prompt}\n\n"
        for msg in messages:
            role = msg["role"].upper()
            full_prompt += f"{role}: {msg['content']}\n"
        full_prompt += "ASSISTANT: "

        response = model.generate_content(full_prompt)
        return response.text

    else:
        return "AI service is not configured. Please set OPENAI_API_KEY or GEMINI_API_KEY in your environment."
