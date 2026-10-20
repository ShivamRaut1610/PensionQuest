import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    nav: { dashboard: 'Dashboard', quests: 'Quests', simulator: 'Simulator', coach: 'AI Coach', leaderboard: 'Leaderboard', profile: 'Profile', contributions: 'Contributions' },
    common: { xp: 'XP', level: 'Level', streak: 'Day Streak', badges: 'Badges', viewAll: 'View all', next: 'Next', submit: 'Submit', back: 'Back', save: 'Save', cancel: 'Cancel', settings: 'Settings', logout: 'Logout', language: 'Language', loading: 'Loading...', namaste: 'Namaste' },
    dashboard: {
      welcome: 'Welcome back,', heroSub: 'Complete today\'s quest to maintain your streak and level up!', todayQuest: "Today's Quest", projected: 'Projected NPS Corpus', basedOn: 'Based on', returns: 'returns', atAge: 'at age 60', futureTitle: 'Your Future Self at 60', upcomingQuests: 'Upcoming Quests', yourBadges: 'Your Badges', nextBadge: 'Next badge:', totalXp: 'Total XP', today: 'today',
      avatarStates: { thriving: 'Your future self is thriving! 🌟', stable: "You're on the right track!", struggling: 'Needs more help.', critical: 'In trouble — act now!', zero: "Hasn't started yet." },
      statLabels: { totalXp: 'Total XP', level: 'Level', streak: 'Day Streak', badges: 'Badges' },
    },
    quest: { title: 'Daily Quests', subtitle: 'Test your NPS knowledge and earn XP', correct: '🎉 Correct! Amazing!', incorrect: '❌ Not quite right', submitAnswer: 'Submit Answer', nextQuest: 'Next Quest', allDone: 'All quests completed!', explanation: 'Explanation', filter: { all: 'All', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' } },
    simulator: { title: 'Retirement Simulator', subtitle: 'See how your NPS contributions grow over time', yourAge: 'Your Age', retireAt: 'Retire At', monthly: 'Monthly (₹)', returnPct: 'Return %', projectedCorpus: 'Projected Corpus', monthlyPension: 'Monthly Pension', taxSaved: 'Tax Saved (Total)', costDelay: 'Cost of 5yr Delay', growthTitle: 'Corpus Growth Over Time', delayTitle: 'Cost of Delay', wait: 'Wait', year: 'year', years: 'years', compare: 'Scenario Comparison', dontWait: "Don't wait!", annuity: '40% annuity @ 6%', inYears: 'in {n} years' },
    coach: { title: 'AI Pension Coach', subtitle: 'Your personal NPS guide powered by AI', placeholder: 'Ask me anything about NPS...', disclaimer: 'AI responses are educational estimates, not financial advice.', greeting: 'Namaste {name}! 🙏 I\'m your NPS Pension Coach. I can help you understand the National Pension System, calculate your retirement savings, learn about tax benefits, and guide you through NPS enrollment. What would you like to know?', quickPrompts: ['💰 How much tax can I save?', '📊 What returns does NPS give?', '🏦 How to open NPS account?', '⚖️ Tier I vs Tier II?', '📈 Best fund for me?'] },
    leaderboard: { title: 'Leaderboard', subtitle: 'Compete with NPS learners across India', national: '🇮🇳 National', city: '🏙️ City', yourPosition: 'Your Position', top: 'Top', rank: 'Rank', player: 'Player', you: '(You)' },
    profile: { title: 'Profile', allBadges: 'All Badges', questsDone: 'Quests Done', contributed: 'Contributed', riskProfile: 'Risk Profile', retirementAge: 'Retirement Age', notifications: 'Notifications', enabled: 'Enabled' },
    contributions: { title: 'NPS Contributions', subtitle: 'Track and log your NPS investments', addNew: 'Add Contribution', amount: 'Amount (₹)', source: 'Source', history: 'Contribution History', total: 'Total Contributed', thisYear: 'This Year', monthly: 'Monthly Average', taxBenefit: 'Tax Benefit Used', fy: 'Financial Year', manual: 'Manual', salary: 'Salary Deduction', voluntary: 'Voluntary' },
    levelTitles: ['', 'NPS Rookie', 'NPS Learner', 'NPS Aware', 'NPS Saver', 'NPS Champion', 'NPS Master', 'NPS Legend'],
  },
  hi: {
    nav: { dashboard: 'डैशबोर्ड', quests: 'क्वेस्ट', simulator: 'सिम्युलेटर', coach: 'AI कोच', leaderboard: 'लीडरबोर्ड', profile: 'प्रोफ़ाइल', contributions: 'योगदान' },
    common: { xp: 'XP', level: 'स्तर', streak: 'दिन स्ट्रीक', badges: 'बैज', viewAll: 'सभी देखें', next: 'अगला', submit: 'सबमिट करें', back: 'वापस', save: 'सहेजें', cancel: 'रद्द करें', settings: 'सेटिंग्स', logout: 'लॉग आउट', language: 'भाषा', loading: 'लोड हो रहा है...', namaste: 'नमस्ते' },
    dashboard: {
      welcome: 'वापस स्वागत है,', heroSub: 'अपनी स्ट्रीक बनाए रखने और लेवल अप करने के लिए आज का क्वेस्ट पूरा करें!', todayQuest: 'आज का क्वेस्ट', projected: 'अनुमानित NPS कोष', basedOn: 'आधारित', returns: 'रिटर्न', atAge: '60 वर्ष पर', futureTitle: '60 साल में आपका भविष्य', upcomingQuests: 'आगामी क्वेस्ट', yourBadges: 'आपके बैज', nextBadge: 'अगला बैज:', totalXp: 'कुल XP', today: 'आज',
      avatarStates: { thriving: 'आपका भविष्य का स्व फल-फूल रहा है! 🌟', stable: 'आप सही रास्ते पर हैं!', struggling: 'और मदद चाहिए।', critical: 'मुसीबत में — अभी कार्रवाई करें!', zero: 'अभी शुरू नहीं किया।' },
      statLabels: { totalXp: 'कुल XP', level: 'स्तर', streak: 'दिन स्ट्रीक', badges: 'बैज' },
    },
    quest: { title: 'दैनिक क्वेस्ट', subtitle: 'अपने NPS ज्ञान का परीक्षण करें और XP कमाएं', correct: '🎉 सही! शानदार!', incorrect: '❌ सही नहीं', submitAnswer: 'उत्तर सबमिट करें', nextQuest: 'अगला क्वेस्ट', allDone: 'सभी क्वेस्ट पूरे!', explanation: 'व्याख्या', filter: { all: 'सभी', beginner: 'शुरुआती', intermediate: 'मध्यम', advanced: 'उन्नत' } },
    simulator: { title: 'सेवानिवृत्ति सिम्युलेटर', subtitle: 'देखें कि आपका NPS योगदान कैसे बढ़ता है', yourAge: 'आपकी आयु', retireAt: 'सेवानिवृत्ति', monthly: 'मासिक (₹)', returnPct: 'रिटर्न %', projectedCorpus: 'अनुमानित कोष', monthlyPension: 'मासिक पेंशन', taxSaved: 'कर बचत (कुल)', costDelay: '5 साल देरी की लागत', growthTitle: 'समय के साथ कोष वृद्धि', delayTitle: 'देरी की लागत', wait: 'प्रतीक्षा', year: 'साल', years: 'साल', compare: 'परिदृश्य तुलना', dontWait: 'इंतज़ार मत करो!', annuity: '40% वार्षिकी @ 6%', inYears: '{n} वर्षों में' },
    coach: { title: 'AI पेंशन कोच', subtitle: 'AI द्वारा संचालित आपका व्यक्तिगत NPS गाइड', placeholder: 'NPS के बारे में कुछ भी पूछें...', disclaimer: 'AI प्रतिक्रियाएं शैक्षिक अनुमान हैं, वित्तीय सलाह नहीं।', greeting: 'नमस्ते {name}! 🙏 मैं आपका NPS पेंशन कोच हूं। मैं आपको राष्ट्रीय पेंशन प्रणाली को समझने, सेवानिवृत्ति बचत की गणना करने, कर लाभ जानने और NPS नामांकन में मदद कर सकता हूं।', quickPrompts: ['💰 कितना टैक्स बचा सकता हूं?', '📊 NPS में कितना रिटर्न?', '🏦 NPS खाता कैसे खोलें?', '⚖️ टियर I बनाम टियर II?', '📈 मेरे लिए बेस्ट फंड?'] },
    leaderboard: { title: 'लीडरबोर्ड', subtitle: 'भारत भर के NPS सीखने वालों से प्रतिस्पर्धा करें', national: '🇮🇳 राष्ट्रीय', city: '🏙️ शहर', yourPosition: 'आपकी स्थिति', top: 'शीर्ष', rank: 'रैंक', player: 'खिलाड़ी', you: '(आप)' },
    profile: { title: 'प्रोफ़ाइल', allBadges: 'सभी बैज', questsDone: 'क्वेस्ट पूरे', contributed: 'योगदान', riskProfile: 'जोखिम प्रोफ़ाइल', retirementAge: 'सेवानिवृत्ति आयु', notifications: 'सूचनाएं', enabled: 'सक्षम' },
    contributions: { title: 'NPS योगदान', subtitle: 'अपने NPS निवेश ट्रैक करें', addNew: 'योगदान जोड़ें', amount: 'राशि (₹)', source: 'स्रोत', history: 'योगदान इतिहास', total: 'कुल योगदान', thisYear: 'इस वर्ष', monthly: 'मासिक औसत', taxBenefit: 'कर लाभ उपयोग', fy: 'वित्तीय वर्ष', manual: 'मैनुअल', salary: 'वेतन कटौती', voluntary: 'स्वैच्छिक' },
    levelTitles: ['', 'NPS नौसिखिया', 'NPS शिक्षार्थी', 'NPS जागरूक', 'NPS बचतकर्ता', 'NPS चैंपियन', 'NPS मास्टर', 'NPS लीजेंड'],
  }
}

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (path) => {
    const keys = path.split('.')
    let val = translations[lang]
    for (const k of keys) {
      val = val?.[k]
      if (val === undefined) {
        // fallback to English
        let fallback = translations.en
        for (const fk of keys) fallback = fallback?.[fk]
        return fallback || path
      }
    }
    return val
  }
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
