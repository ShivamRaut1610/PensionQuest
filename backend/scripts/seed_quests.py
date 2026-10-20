"""Seed 10 NPS quiz quests into the database."""
import asyncio
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.database import AsyncSessionLocal
from app.models.quest import Quest, QuestDifficulty

QUESTS = [
    {
        "title": "What is NPS?",
        "title_hi": "NPS क्या है?",
        "description": "National Pension System (NPS) is a government-sponsored pension scheme launched in 2004. Which organization regulates NPS?",
        "description_hi": "राष्ट्रीय पेंशन प्रणाली (NPS) 2004 में शुरू की गई सरकारी पेंशन योजना है। NPS को कौन सी संस्था नियंत्रित करती है?",
        "difficulty": QuestDifficulty.BEGINNER,
        "xp_reward": 50,
        "options": {"a": "RBI", "b": "SEBI", "c": "PFRDA", "d": "IRDAI"},
        "options_hi": {"a": "आरबीआई", "b": "सेबी", "c": "पीएफआरडीए", "d": "इरडाई"},
        "correct_answer": "c",
        "explanation": "PFRDA (Pension Fund Regulatory and Development Authority) regulates and develops the pension sector in India.",
        "explanation_hi": "पीएफआरडीए (पेंशन फंड विनियामक और विकास प्राधिकरण) भारत में पेंशन क्षेत्र को नियंत्रित और विकसित करता है।",
        "order_index": 1,
    },
    {
        "title": "Tier I vs Tier II Accounts",
        "title_hi": "टियर I बनाम टियर II खाते",
        "description": "NPS has two types of accounts. Which account is mandatory and has tax benefits under Section 80CCD?",
        "description_hi": "NPS में दो प्रकार के खाते होते हैं। धारा 80CCD के तहत कर लाभ के साथ कौन सा खाता अनिवार्य है?",
        "difficulty": QuestDifficulty.BEGINNER,
        "xp_reward": 50,
        "options": {"a": "Tier II", "b": "Tier I", "c": "Both", "d": "Neither"},
        "options_hi": {"a": "टियर II", "b": "टियर I", "c": "दोनों", "d": "कोई नहीं"},
        "correct_answer": "b",
        "explanation": "Tier I is the mandatory pension account with tax deductions. Tier II is voluntary with no lock-in.",
        "explanation_hi": "टियर I कर कटौती के साथ अनिवार्य पेंशन खाता है। टियर II स्वैच्छिक है और इसमें कोई लॉक-इन नहीं है।",
        "order_index": 2,
    },
    {
        "title": "Tax Benefits of NPS",
        "title_hi": "NPS के कर लाभ",
        "description": "Under Section 80CCD(1B), NPS offers an exclusive additional deduction. What is the maximum additional deduction allowed?",
        "description_hi": "धारा 80CCD(1B) के तहत NPS एक विशेष अतिरिक्त कटौती प्रदान करता है। अधिकतम अतिरिक्त कटौती कितनी है?",
        "difficulty": QuestDifficulty.INTERMEDIATE,
        "xp_reward": 150,
        "options": {"a": "₹25,000", "b": "₹1,50,000", "c": "₹50,000", "d": "₹75,000"},
        "options_hi": {"a": "₹25,000", "b": "₹1,50,000", "c": "₹50,000", "d": "₹75,000"},
        "correct_answer": "c",
        "explanation": "Under 80CCD(1B), you can claim an additional ₹50,000 deduction over and above the ₹1.5 lakh limit under 80C.",
        "explanation_hi": "80CCD(1B) के तहत, आप 80C की ₹1.5 लाख सीमा के ऊपर अतिरिक्त ₹50,000 की कटौती का दावा कर सकते हैं।",
        "order_index": 3,
    },
    {
        "title": "NPS Minimum Contribution",
        "title_hi": "NPS न्यूनतम योगदान",
        "description": "What is the minimum annual contribution required to keep a Tier I NPS account active?",
        "description_hi": "टियर I NPS खाता सक्रिय रखने के लिए न्यूनतम वार्षिक योगदान कितना है?",
        "difficulty": QuestDifficulty.BEGINNER,
        "xp_reward": 50,
        "options": {"a": "₹500", "b": "₹1,000", "c": "₹6,000", "d": "₹12,000"},
        "options_hi": {"a": "₹500", "b": "₹1,000", "c": "₹6,000", "d": "₹12,000"},
        "correct_answer": "a",
        "explanation": "The minimum annual contribution for Tier I is ₹500. However, ₹1,000 is required to open the account.",
        "explanation_hi": "टियर I के लिए न्यूनतम वार्षिक योगदान ₹500 है। हालांकि, खाता खोलने के लिए ₹1,000 आवश्यक है।",
        "order_index": 4,
    },
    {
        "title": "NPS Maturity Rules",
        "title_hi": "NPS परिपक्वता नियम",
        "description": "At age 60, what percentage of your NPS corpus can you withdraw as a tax-free lump sum?",
        "description_hi": "60 वर्ष की आयु में, आप अपने NPS कोष का कितना प्रतिशत कर-मुक्त एकमुश्त निकाल सकते हैं?",
        "difficulty": QuestDifficulty.INTERMEDIATE,
        "xp_reward": 150,
        "options": {"a": "40%", "b": "60%", "c": "80%", "d": "100%"},
        "options_hi": {"a": "40%", "b": "60%", "c": "80%", "d": "100%"},
        "correct_answer": "b",
        "explanation": "At 60, you can withdraw 60% tax-free. The remaining 40% must be used to purchase an annuity for monthly pension.",
        "explanation_hi": "60 पर, आप 60% कर-मुक्त निकाल सकते हैं। शेष 40% का उपयोग मासिक पेंशन के लिए वार्षिकी खरीदने में किया जाना चाहिए।",
        "order_index": 5,
    },
    {
        "title": "NPS Fund Managers",
        "title_hi": "NPS फंड मैनेजर",
        "description": "How many Pension Fund Managers (PFMs) are currently registered with PFRDA?",
        "description_hi": "वर्तमान में PFRDA के साथ कितने पेंशन फंड मैनेजर (PFM) पंजीकृत हैं?",
        "difficulty": QuestDifficulty.INTERMEDIATE,
        "xp_reward": 150,
        "options": {"a": "5", "b": "7", "c": "10", "d": "15"},
        "options_hi": {"a": "5", "b": "7", "c": "10", "d": "15"},
        "correct_answer": "c",
        "explanation": "There are currently 10 Pension Fund Managers registered with PFRDA including SBI, LIC, HDFC, ICICI, and others.",
        "explanation_hi": "वर्तमान में PFRDA के साथ SBI, LIC, HDFC, ICICI सहित 10 पेंशन फंड मैनेजर पंजीकृत हैं।",
        "order_index": 6,
    },
    {
        "title": "NPS Asset Classes",
        "title_hi": "NPS परिसंपत्ति वर्ग",
        "description": "In NPS Active Choice, what does Asset Class 'E' represent?",
        "description_hi": "NPS एक्टिव चॉइस में, परिसंपत्ति वर्ग 'E' क्या दर्शाता है?",
        "difficulty": QuestDifficulty.ADVANCED,
        "xp_reward": 250,
        "options": {"a": "Government Securities", "b": "Corporate Bonds", "c": "Equity", "d": "Alternative Investments"},
        "options_hi": {"a": "सरकारी प्रतिभूतियां", "b": "कॉर्पोरेट बॉन्ड", "c": "इक्विटी", "d": "वैकल्पिक निवेश"},
        "correct_answer": "c",
        "explanation": "E = Equity (company stocks, up to 75% under Auto Choice). Other classes: C = Corporate Bonds, G = Government Securities, A = Alternative.",
        "explanation_hi": "E = इक्विटी (कंपनी शेयर, ऑटो चॉइस में 75% तक)। अन्य: C = कॉर्पोरेट बॉन्ड, G = सरकारी प्रतिभूतियां, A = वैकल्पिक।",
        "order_index": 7,
    },
    {
        "title": "Auto Choice Strategy",
        "title_hi": "ऑटो चॉइस रणनीति",
        "description": "In NPS Auto Choice LC-75 (Aggressive), what is the maximum equity allocation for a 25-year-old?",
        "description_hi": "NPS ऑटो चॉइस LC-75 (आक्रामक) में, 25 वर्षीय के लिए अधिकतम इक्विटी आवंटन कितना है?",
        "difficulty": QuestDifficulty.ADVANCED,
        "xp_reward": 250,
        "options": {"a": "25%", "b": "50%", "c": "75%", "d": "100%"},
        "options_hi": {"a": "25%", "b": "50%", "c": "75%", "d": "100%"},
        "correct_answer": "c",
        "explanation": "LC-75 starts with 75% equity at age 25 and gradually reduces to 15% by age 55, automatically rebalancing each year.",
        "explanation_hi": "LC-75 25 वर्ष की उम्र में 75% इक्विटी से शुरू होता है और धीरे-धीरे 55 वर्ष तक 15% तक कम हो जाता है।",
        "order_index": 8,
    },
    {
        "title": "Partial Withdrawal Rules",
        "title_hi": "आंशिक निकासी नियम",
        "description": "After how many years can you make a partial withdrawal from NPS Tier I?",
        "description_hi": "NPS टियर I से आंशिक निकासी कितने वर्षों के बाद कर सकते हैं?",
        "difficulty": QuestDifficulty.BEGINNER,
        "xp_reward": 50,
        "options": {"a": "1 year", "b": "3 years", "c": "5 years", "d": "10 years"},
        "options_hi": {"a": "1 वर्ष", "b": "3 वर्ष", "c": "5 वर्ष", "d": "10 वर्ष"},
        "correct_answer": "b",
        "explanation": "You can withdraw up to 25% of your own contributions after 3 years for specific purposes like higher education, medical treatment, or buying a house.",
        "explanation_hi": "आप 3 वर्ष के बाद अपने योगदान का 25% तक उच्च शिक्षा, चिकित्सा उपचार या घर खरीदने जैसे विशिष्ट उद्देश्यों के लिए निकाल सकते हैं।",
        "order_index": 9,
    },
    {
        "title": "Employer Contribution Benefits",
        "title_hi": "नियोक्ता योगदान लाभ",
        "description": "Under Section 80CCD(2), what is the maximum deduction allowed for employer's NPS contribution for central government employees?",
        "description_hi": "धारा 80CCD(2) के तहत, केंद्र सरकार के कर्मचारियों के लिए नियोक्ता के NPS योगदान की अधिकतम कटौती कितनी है?",
        "difficulty": QuestDifficulty.ADVANCED,
        "xp_reward": 250,
        "options": {"a": "10% of salary", "b": "14% of salary", "c": "20% of salary", "d": "No limit"},
        "options_hi": {"a": "वेतन का 10%", "b": "वेतन का 14%", "c": "वेतन का 20%", "d": "कोई सीमा नहीं"},
        "correct_answer": "b",
        "explanation": "Central government employees can claim employer NPS contribution up to 14% of salary under 80CCD(2). Private sector employees get up to 10%.",
        "explanation_hi": "केंद्र सरकार के कर्मचारी 80CCD(2) के तहत वेतन के 14% तक नियोक्ता NPS योगदान का दावा कर सकते हैं। निजी क्षेत्र को 10% तक मिलता है।",
        "order_index": 10,
    },
]


async def seed():
    async with AsyncSessionLocal() as session:
        for q_data in QUESTS:
            quest = Quest(**q_data)
            session.add(quest)
        await session.commit()
        print(f"✅ Seeded {len(QUESTS)} quests successfully.")


if __name__ == "__main__":
    asyncio.run(seed())
