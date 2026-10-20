import re
import logging

logger = logging.getLogger("pensionquest.multilingual")

SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "ta": "Tamil",
    "te": "Telugu",
    "bn": "Bengali",
    "mr": "Marathi"
}

NPS_GLOSSARY = {
    "hi": {
        "National Pension System": "राष्ट्रीय पेंशन प्रणाली",
        "contribution": "योगदान",
        "corpus": "कोष",
        "annuity": "वार्षिकी",
        "tier": "स्तर",
        "withdrawal": "निकासी",
        "PFRDA": "पीएफआरडीए",
        "retirement": "सेवानिवृत्ति",
        "pension fund": "पेंशन फंड"
    },
    "ta": {
        "National Pension System": "தேசிய ஓய்வூதிய திட்டம்",
        "contribution": "பங்களிப்பு",
        "corpus": "நிதி",
        "retirement": "ஓய்வு"
    }
}


def translate_nps_content(text: str, target_lang: str) -> str:
    """Translate text with NPS-specific financial glossary applied."""
    if target_lang == "en":
        return text

    # First apply glossary substitutions to preserve key terms
    for en_term, translated_term in NPS_GLOSSARY.get(target_lang, {}).items():
        text = text.replace(en_term, f"[PRESERVE:{translated_term}]")

    # In production, use Google Translate API here
    # For now, return the text with preserved terms restored
    translated = text

    # Restore preserved terms
    translated = re.sub(r'\[PRESERVE:(.*?)\]', r'\1', translated)

    return translated


def detect_language(text: str) -> str:
    """Detect the language of input text (simplified)."""
    # Simple heuristic: check for Devanagari script
    if re.search(r'[\u0900-\u097F]', text):
        return "hi"
    elif re.search(r'[\u0B80-\u0BFF]', text):
        return "ta"
    elif re.search(r'[\u0C00-\u0C7F]', text):
        return "te"
    elif re.search(r'[\u0980-\u09FF]', text):
        return "bn"
    elif re.search(r'[\u0900-\u097F]', text):
        return "mr"
    return "en"
