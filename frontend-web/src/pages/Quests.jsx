import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, ChevronRight, Star, Clock, BookOpen, Lightbulb } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const QS = [
  // Beginner
  { id:1, type:'mcq', title:'What is NPS?', titleHi:'NPS क्या है?', desc:'Which organization regulates NPS?', descHi:'NPS को कौन नियंत्रित करता है?', diff:'Beginner', diffHi:'शुरुआती', xp:50, opts:{a:'RBI',b:'SEBI',c:'PFRDA',d:'IRDAI'}, ans:'c', expl:'PFRDA regulates the pension sector.', explHi:'PFRDA पेंशन क्षेत्र को नियंत्रित करता है।', hint:'Starts with P and ends with A.', hintHi:'P से शुरू होता है और A पर समाप्त होता है।', done:true, ua:'c' },
  { id:2, type:'tf', title:'Tier I Account', titleHi:'टियर I खाता', desc:'Tier I account is mandatory to open Tier II.', descHi:'टियर II खोलने के लिए टियर I अनिवार्य है।', diff:'Beginner', diffHi:'शुरुआती', xp:50, opts:{t:'True',f:'False'}, ans:'t', expl:'You cannot open Tier II without an active Tier I account.', explHi:'आप सक्रिय टियर I के बिना टियर II नहीं खोल सकते।', hint:'Yes, there is a prerequisite rule.', hintHi:'हां, एक शर्त नियम है।', done:true, ua:'t' },
  { id:3, type:'mcq', title:'Minimum Contribution', titleHi:'न्यूनतम योगदान', desc:'Annual minimum for Tier I?', descHi:'टियर I के लिए वार्षिक न्यूनतम?', diff:'Beginner', diffHi:'शुरुआती', xp:50, opts:{a:'₹500',b:'₹1K',c:'₹6K',d:'₹12K'}, ans:'a', expl:'₹500/year minimum to keep the account active.', explHi:'खाते को सक्रिय रखने के लिए न्यूनतम ₹500/वर्ष।', hint:'It is less than ₹1000.', hintHi:'यह ₹1000 से कम है।', done:false },
  { id:4, type:'mcq', title:'Age Limit', titleHi:'आयु सीमा', desc:'Maximum joining age for NPS?', descHi:'NPS में जुड़ने की अधिकतम आयु?', diff:'Beginner', diffHi:'शुरुआती', xp:50, opts:{a:'60',b:'65',c:'70',d:'75'}, ans:'b', expl:'The maximum joining age was raised to 65 years.', explHi:'अधिकतम जुड़ने की आयु बढ़ाकर 65 वर्ष कर दी गई थी।', hint:'Retirement age + 5 years.', hintHi:'सेवानिवृत्ति की आयु + 5 वर्ष।', done:false },
  { id:5, type:'tf', title:'Tax on Maturity', titleHi:'परिपक्वता पर कर', desc:'The 60% lump sum at maturity is fully taxable.', descHi:'परिपक्वता पर 60% एकमुश्त पूरी तरह से कर योग्य है।', diff:'Beginner', diffHi:'शुरुआती', xp:50, opts:{t:'True',f:'False'}, ans:'f', expl:'The 60% lump sum withdrawal is completely tax-free.', explHi:'60% एकमुश्त निकासी पूरी तरह से कर-मुक्त है।', hint:'Actually, the government wants to encourage pensions.', hintHi:'दरअसल, सरकार पेंशन को प्रोत्साहित करना चाहती है।', done:false },
  { id:6, type:'tf', title:'Loan from NPS', titleHi:'NPS से ऋण', desc:'You can take a personal loan against your NPS balance.', descHi:'आप अपने NPS बैलेंस पर व्यक्तिगत ऋण ले सकते हैं।', diff:'Beginner', diffHi:'शुरुआती', xp:50, opts:{t:'True',f:'False'}, ans:'f', expl:'NPS does not allow loans; it only allows partial withdrawals.', explHi:'NPS ऋण की अनुमति नहीं देता; यह केवल आंशिक निकासी की अनुमति देता है।', hint:'It is not a bank fixed deposit.', hintHi:'यह बैंक एफडी नहीं है।', done:false },
  { id:7, type:'mcq', title:'PRAN Meaning', titleHi:'PRAN अर्थ', desc:'What does PRAN stand for?', descHi:'PRAN का क्या अर्थ है?', diff:'Beginner', diffHi:'शुरुआती', xp:100, opts:{a:'Primary Retirement Account Number',b:'Permanent Retirement Account Number',c:'PFRDA Registered Account Number',d:'Pension Registration Account Number'}, ans:'b', expl:'Permanent Retirement Account Number is unique to every subscriber.', explHi:'स्थायी सेवानिवृत्ति खाता संख्या प्रत्येक ग्राहक के लिए अद्वितीय है।', hint:'It lasts forever (Permanent).', hintHi:'यह हमेशा के लिए रहता है (स्थायी)।', done:false },
  
  // Intermediate
  { id:8, type:'mcq', title:'Tax Benefits', titleHi:'कर लाभ', desc:'Max 80CCD(1B) additional deduction?', descHi:'अधिकतम 80CCD(1B) अतिरिक्त कटौती?', diff:'Intermediate', diffHi:'मध्यम', xp:150, opts:{a:'₹25K',b:'₹1.5L',c:'₹50K',d:'₹75K'}, ans:'c', expl:'₹50,000 additional over 80C limit.', explHi:'80C सीमा के ऊपर ₹50,000 अतिरिक्त।', hint:'Half of a lakh.', hintHi:'एक लाख का आधा।', done:false },
  { id:9, type:'mcq', title:'Maturity Rules', titleHi:'परिपक्वता नियम', desc:'How much is tax-free lump sum at age 60?', descHi:'60 वर्ष की आयु में कर-मुक्त एकमुश्त राशि कितनी है?', diff:'Intermediate', diffHi:'मध्यम', xp:150, opts:{a:'40%',b:'60%',c:'80%',d:'100%'}, ans:'b', expl:'60% is tax-free. 40% goes to mandatory annuity.', explHi:'60% कर-मुक्त है। 40% अनिवार्य वार्षिकी में जाता है।', hint:'More than half.', hintHi:'आधे से अधिक।', done:false },
  { id:10, type:'mcq', title:'Fund Managers', titleHi:'फंड मैनेजर', desc:'Number of Pension Fund Managers currently?', descHi:'वर्तमान में पेंशन फंड मैनेजरों की संख्या?', diff:'Intermediate', diffHi:'मध्यम', xp:150, opts:{a:'5',b:'7',c:'10',d:'15'}, ans:'c', expl:'There are 10 PFMs registered (SBI, HDFC, ICICI, etc).', explHi:'10 PFM पंजीकृत हैं।', hint:'A nice round ten.', hintHi:'एक अच्छा गोल दस।', done:false },
  { id:11, type:'tf', title:'Switching PFMs', titleHi:'PFM बदलना', desc:'You can change your Pension Fund Manager once a year.', descHi:'आप साल में एक बार अपना PFM बदल सकते हैं।', diff:'Intermediate', diffHi:'मध्यम', xp:150, opts:{t:'True',f:'False'}, ans:'t', expl:'Yes, PFRDA allows changing PFMs once every financial year.', explHi:'हां, PFRDA हर वित्तीय वर्ष में एक बार PFM बदलने की अनुमति देता है।', hint:'Flexibility is a key feature.', hintHi:'लचीलापन एक प्रमुख विशेषता है।', done:false },
  { id:12, type:'mcq', title:'Partial Withdrawal', titleHi:'आंशिक निकासी', desc:'How many years before you can make a partial withdrawal?', descHi:'आंशिक निकासी करने से पहले कितने वर्ष?', diff:'Intermediate', diffHi:'मध्यम', xp:150, opts:{a:'1 yr',b:'3 yrs',c:'5 yrs',d:'10 yrs'}, ans:'b', expl:'You can withdraw 25% of your contributions after 3 years.', explHi:'आप 3 साल बाद अपने योगदान का 25% निकाल सकते हैं।', hint:'A prime number less than 5.', hintHi:'5 से कम एक अभाज्य संख्या।', done:false },
  { id:13, type:'mcq', title:'Partial Reasons', titleHi:'आंशिक कारण', desc:'Which is NOT a valid reason for partial withdrawal?', descHi:'आंशिक निकासी के लिए कौन सा कारण मान्य नहीं है?', diff:'Intermediate', diffHi:'मध्यम', xp:150, opts:{a:'Child Education',b:'Buying a Car',c:'Medical Emergency',d:'First Home Purchase'}, ans:'b', expl:'Buying a car is a luxury, not a permitted necessity.', explHi:'कार खरीदना एक विलासिता है।', hint:'Think about an unessential depreciating asset.', hintHi:'एक गैर-जरूरी घटते मूल्य वाली संपत्ति के बारे में सोचें।', done:false },
  { id:14, type:'tf', title:'Premature Exit', titleHi:'समयपूर्व निकास', desc:'You can exit NPS before 60, but you must put 80% into annuity.', descHi:'आप 60 से पहले NPS छोड़ सकते हैं, लेकिन 80% वार्षिकी में डालना होगा।', diff:'Intermediate', diffHi:'मध्यम', xp:150, opts:{t:'True',f:'False'}, ans:'t', expl:'If exiting before 60/superannuation, 80% MUST be annuitized.', explHi:'यदि 60 से पहले निकास होता है, तो 80% वार्षिकीकृत होना चाहिए।', hint:'There is a heavy penalty to ensure retirement security.', hintHi:'सेवानिवृत्ति सुरक्षा सुनिश्चित करने के लिए भारी जुर्माना है।', done:false },

  // Advanced
  { id:15, type:'mcq', title:'Asset Classes', titleHi:'परिसंपत्ति वर्ग', desc:'What does Asset Class E stand for?', descHi:'परिसंपत्ति वर्ग E का क्या अर्थ है?', diff:'Advanced', diffHi:'उन्नत', xp:250, opts:{a:'Govt Sec',b:'Corp Bonds',c:'Equity',d:'Alternative'}, ans:'c', expl:'E = Equity (Stock market).', explHi:'E = इक्विटी (शेयर बाजार)।', hint:'Shares of companies.', hintHi:'कंपनियों के शेयर।', done:false },
  { id:16, type:'mcq', title:'Auto Choice', titleHi:'ऑटो चॉइस', desc:'Under LC-75, what is the max equity exposure at age 25?', descHi:'LC-75 के तहत, 25 वर्ष की आयु में अधिकतम इक्विटी एक्सपोजर क्या है?', diff:'Advanced', diffHi:'उन्नत', xp:250, opts:{a:'25%',b:'50%',c:'75%',d:'100%'}, ans:'c', expl:'LC-75 stands for Life Cycle 75% equity.', explHi:'LC-75 का अर्थ 75% इक्विटी है।', hint:'It is in the name of the scheme.', hintHi:'यह योजना के नाम में है।', done:false },
  { id:17, type:'mcq', title:'Employer NPS', titleHi:'नियोक्ता NPS', desc:'Central govt employee 80CCD(2) max limit?', descHi:'केंद्र सरकार कर्मचारी 80CCD(2) अधिकतम सीमा?', diff:'Advanced', diffHi:'उन्नत', xp:250, opts:{a:'10%',b:'14%',c:'20%',d:'No limit'}, ans:'b', expl:'14% for Central Gov, 10% for Private Sector.', explHi:'केंद्र के लिए 14%, निजी के लिए 10%।', hint:'Higher than private sector.', hintHi:'निजी क्षेत्र से अधिक।', done:false },
  { id:18, type:'tf', title:'Alternative Assets', titleHi:'वैकल्पिक संपत्ति', desc:'Asset Class A (Alternative) has a maximum limit of 5%.', descHi:'परिसंपत्ति वर्ग A (वैकल्पिक) की अधिकतम सीमा 5% है।', diff:'Advanced', diffHi:'उन्नत', xp:250, opts:{t:'True',f:'False'}, ans:'t', expl:'Alternative investments (REITs, AIFs) are strictly capped at 5%.', explHi:'वैकल्पिक निवेश (REITs, AIFs) 5% तक सीमित हैं।', hint:'It is a very small, highly regulated limit.', hintHi:'यह बहुत छोटी, विनियमित सीमा है।', done:false },
  { id:19, type:'mcq', title:'Annuity Providers', titleHi:'वार्षिकी प्रदाता', desc:'Which regulatory body oversees the Annuity Service Providers?', descHi:'कौन सा नियामक निकाय वार्षिकी प्रदाताओं की देखरेख करता है?', diff:'Advanced', diffHi:'उन्नत', xp:250, opts:{a:'PFRDA',b:'SEBI',c:'IRDAI',d:'RBI'}, ans:'c', expl:'Insurance Regulatory and Development Authority of India manages life insurance companies that provide Annuities.', explHi:'IRDAI जीवन बीमा कंपनियों का प्रबंधन करता है जो वार्षिकी प्रदान करती हैं।', hint:'They are insurance products.', hintHi:'ये बीमा उत्पाद हैं।', done:false },
  { id:20, type:'mcq', title:'Scheme Preference', titleHi:'योजना वरीयता', desc:'How many times can you change your asset allocation scheme in a year?', descHi:'एक वर्ष में आप अपनी परिसंपत्ति आवंटन योजना कितनी बार बदल सकते हैं?', diff:'Advanced', diffHi:'उन्नत', xp:250, opts:{a:'1',b:'2',c:'4',d:'Unlimited'}, ans:'c', expl:'You can change your investment choice (Active/Auto) up to 4 times a year.', explHi:'आप वर्ष में 4 बार निवेश विकल्प बदल सकते हैं।', hint:'Once per quarter.', hintHi:'प्रति तिमाही एक बार।', done:false },
]

const DC = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' }

export default function Quests() {
  const { lang, t } = useLang()
  const { theme } = useTheme()
  const [active, setActive] = useState(null)
  const [sel, setSel] = useState(null)
  const [done, setDone] = useState(false)
  const [filter, setFilter] = useState('all')
  const [timer, setTimer] = useState(30)
  const [showHint, setShowHint] = useState(false)

  const fk = { all: 'all', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
  const filtered = filter === 'all' ? QS : QS.filter(q => q.diff === fk[filter])
  const q = active ? QS.find(q => q.id === active) : null

  // Timer
  useEffect(() => {
    if (!active || done) return
    setTimer(30)
    const iv = setInterval(() => setTimer(time => { if (time <= 1) { clearInterval(iv); setDone(true); return 0 } return time - 1 }), 1000)
    return () => clearInterval(iv)
  }, [active, done])

  const triggerConfetti = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: [theme.accent, '#fbbf24', '#10b981', '#f97316'] })
  }

  const submit = () => { if (!sel) return; setDone(true); if (sel === q.ans) { triggerConfetti() } }
  const next = () => { 
    setShowHint(false)
    const i = QS.findIndex(x => x.id === active)
    if (i < QS.length - 1) { setActive(QS[i+1].id); setSel(null); setDone(false) } 
    else { setActive(null); setSel(null); setDone(false) } 
  }

  // Quiz view - Cinematic UI
  if (q) {
    const correct = sel === q.ans
    const color = DC[q.diff]
    const qIdx = QS.findIndex(x => x.id === q.id) + 1
    
    return (
      <div className="max-w-4xl mx-auto pb-10 flex gap-8 flex-col lg:flex-row">
        
        {/* Left column: Quiz Master Mascot */}
        <div className="hidden lg:flex flex-col items-center w-64 pt-10">
          <div className="w-56 h-64 relative drop-shadow-2xl animate-float">
            <img src="/images/quiz_master.png" alt="Quiz Master" className="w-full h-full object-contain" />
          </div>
          <div className="mt-6 text-center text-sm font-bold uppercase tracking-widest px-4 py-2 border rounded-full relative" 
               style={{ background: theme.card, borderColor: theme.cardBorder, color: theme.isDark ? '#fff' : theme.text }}>
             <p className="z-10 relative">"{lang === 'hi' ? 'सोच-समझकर चुनें!' : 'Choose wisely, seeker!'}"</p>
             <div className="absolute -top-2 left-1/2 -ml-2 w-4 h-4 rotate-45" style={{ background: theme.card, borderTop: `1px solid ${theme.cardBorder}`, borderLeft: `1px solid ${theme.cardBorder}` }} />
          </div>
        </div>

        {/* Right column: Question Card */}
        <div className="flex-1 space-y-6">
          <button onClick={() => { setActive(null); setSel(null); setDone(false); setShowHint(false) }} 
                  className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-transform hover:-translate-x-1" 
                  style={{ color: theme.textMuted }}>← {t('common.back')}</button>
          
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: theme.accent, fontFamily: 'Outfit' }}>
              {lang === 'hi' ? 'प्रश्न' : 'Question'} {qIdx}/{QS.length}
            </p>
            
            {/* AI Hint Button */}
            {!done && (
              <div className="relative group">
                <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all shadow-md hover:scale-105 border-2" style={{ background: theme.accentGlow, borderColor: theme.accent, color: theme.accent }}>
                  <img src="/images/ai_mascot.png" alt="AI" className="w-5 h-5 object-contain drop-shadow-md" />
                  <span className="text-[10px] font-black uppercase">{lang === 'hi' ? 'संकेत' : 'AI Hint'}</span>
                </button>
                {showHint && (
                  <div className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl shadow-2xl z-20 text-xs font-bold border" style={{ background: theme.sidebar, borderColor: theme.accent, color: theme.isDark ? 'white' : 'black' }}>
                     💡 {lang === 'hi' ? q.hintHi : q.hint}
                  </div>
                )}
              </div>
            )}
          </div>

          <Card className="animate-slide-up shadow-2xl border-4" style={{ borderColor: done ? (correct ? '#10b981' : '#ef4444') : theme.cardBorder }}>
            {!done && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs mb-2 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5" style={{ color: theme.textDim }}><Clock size={14} /> {lang === 'hi' ? 'समय' : 'Time'}</div>
                  <span className={`text-[16px] font-black ${timer <= 10 ? 'text-red-500 animate-pulse' : ''}`} style={{ fontFamily: 'Outfit', color: timer > 10 ? (theme.isDark ? 'white' : 'black') : undefined }}>00:{timer.toString().padStart(2, '0')}</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden shadow-inner border" style={{ background: theme.isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)', borderColor: theme.cardBorder }}>
                  <div className="h-full rounded-full transition-all duration-1000 relative" style={{ width: `${(timer / 30) * 100}%`, background: timer <= 10 ? 'linear-gradient(90deg, #ef4444, #f97316)' : `linear-gradient(90deg, ${color}, ${color}aa)` }}>
                     <div className="absolute inset-0 shimmer" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase text-white shadow-md shadow-black/20" style={{ background: color }}>{lang === 'hi' ? q.diffHi : q.diff}</span>
              <span className="px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>+{q.xp} XP</span>
              <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full uppercase" style={{ background: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: theme.textDim }}>{q.type.toUpperCase()}</span>
            </div>
            
            <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: 'Playfair Display', color: theme.isDark ? 'white' : 'black' }}>{lang === 'hi' ? q.titleHi : q.title}</h2>
            <p className="text-[17px] font-medium leading-relaxed" style={{ color: theme.textDim, fontFamily: 'Outfit' }}>{lang === 'hi' ? q.descHi : q.desc}</p>

            <div className={`mt-8 ${q.type === 'tf' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
              {Object.entries(q.opts).map(([k, v]) => {
                let bg = theme.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', brd = theme.cardBorder, txt = theme.isDark ? 'white' : 'black'
                if (done && k === q.ans) { bg = 'rgba(16,185,129,0.15)'; brd = '#10b981'; txt = theme.isDark?'white':'#065f46' }
                else if (done && k === sel && k !== q.ans) { bg = 'rgba(239,68,68,0.15)'; brd = '#ef4444'; txt = theme.isDark?'white':'#991b1b' }
                else if (!done && k === sel) { bg = theme.accentGlow; brd = theme.accent; txt = theme.accent }
                return (
                  <button key={k} disabled={done} onClick={() => setSel(k)} className={`w-full text-left p-5 rounded-3xl transition-all duration-300 flex items-center gap-5 hover:scale-[1.02] shadow-sm transform`} style={{ background: bg, border: `2px solid ${brd}` }}>
                    <span className="w-12 h-12 rounded-[18px] flex items-center justify-center font-black text-lg transition-all" style={{
                      background: done && k === q.ans ? '#10b981' : done && k === sel ? '#ef4444' : sel === k ? theme.accent : (theme.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                      color: done || sel === k ? 'white' : theme.textMuted,
                      boxShadow: (done && k === q.ans) ? '0 10px 25px rgba(16,185,129,0.4)' : sel === k ? `0 10px 25px ${theme.accentGlow}` : 'none',
                      fontFamily: 'Outfit'
                    }}>{k.toUpperCase()}</span>
                    <span className="font-extrabold text-[16px] tracking-wide" style={{ fontFamily: 'Inter', color: txt }}>{v}</span>
                    {done && k === q.ans && <CheckCircle size={24} className="ml-auto text-emerald-500 drop-shadow-md" />}
                    {done && k === sel && k !== q.ans && <XCircle size={24} className="ml-auto text-red-500 drop-shadow-md" />}
                    {!done && sel === k && <div className="ml-auto w-6 h-6 rounded-full border-[3px] flex items-center justify-center" style={{ borderColor: theme.accent }}><div className="w-3 h-3 rounded-full" style={{ background: theme.accent }} /></div>}
                  </button>
                )
              })}
            </div>

            {!done ? (
              <button onClick={submit} disabled={!sel} className="btn-primary w-full mt-8 py-5 text-lg font-black uppercase tracking-widest shadow-xl disabled:opacity-40 disabled:hover:translate-y-0 text-white" style={{ background: theme.cta }}>{t('quest.submitAnswer')}</button>
            ) : (
              <div className="mt-8 space-y-5 animate-slide-up" style={{ opacity: 0 }}>
                <div className="p-6 rounded-3xl shadow-inner border-2" style={{ background: correct ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', borderColor: correct ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    {correct ? <CheckCircle size={22} className="text-emerald-500" /> : <XCircle size={22} className="text-red-500" />}
                    <span className={`font-black text-lg uppercase tracking-wider ${correct ? 'text-emerald-500' : 'text-red-500'}`} style={{ fontFamily: 'Outfit' }}>{correct ? t('quest.correct') : t('quest.incorrect')}</span>
                    <span className="ml-auto text-xs font-black uppercase px-4 py-2 rounded-xl shadow-md" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))', color: '#fb923c', border: '1px solid rgba(251,191,36,0.3)' }}>+{correct ? q.xp : Math.max(q.xp / 5, 10)} XP</span>
                  </div>
                  <p className="text-[15px] font-medium leading-relaxed" style={{ color: theme.isDark?'#e2e8f0':'#334155', fontFamily: 'Inter' }}>{lang === 'hi' ? q.explHi : q.expl}</p>
                </div>
                <button onClick={next} className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-lg font-black uppercase tracking-widest text-white shadow-xl transition-transform hover:-translate-y-1" style={{ background: theme.accent }}>
                   {QS.findIndex(x => x.id === active) === QS.length - 1 ? (lang === 'hi' ? 'क्विज़ पूर्ण' : 'FINISH QUIZ') : t('quest.nextQuest')} <ChevronRight size={20} />
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-5xl font-extrabold drop-shadow-sm" style={{ fontFamily: 'Outfit', color: theme.isDark ? 'white' : 'black' }}>{t('quest.title')}</h2>
          <p className="text-[18px] font-medium mt-1" style={{ color: theme.textDim, fontFamily: 'Playfair Display', fontStyle: 'italic' }}>{t('quest.subtitle')}</p>
        </div>
        <div className="flex p-1.5 rounded-[20px] shadow-inner w-max" style={{ background: theme.isDark?'rgba(0,0,0,0.2)':'rgba(0,0,0,0.05)', border: `1px solid ${theme.cardBorder}` }}>
          {Object.entries(t('quest.filter')).map(([k, v]) => (
            <button key={k} onClick={() => setFilter(k)} className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${filter === k ? 'text-white shadow-lg scale-105' : 'hover:opacity-80'}`}
              style={filter === k ? { background: theme.cta, boxShadow: `0 8px 25px ${theme.ctaShadow}` } : { color: theme.textMuted }}>{v}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-2 px-2 snap-x scrollbar-hide">
        {[
          { icon: '💰', label: lang === 'hi' ? 'कर लाभ' : 'Tax Benefits', count: 2 },
          { icon: '🏦', label: lang === 'hi' ? 'खाता प्रकार' : 'Account Types', count: 5 },
          { icon: '📊', label: lang === 'hi' ? 'निवेश' : 'Investment', count: 7 },
          { icon: '📋', label: lang === 'hi' ? 'नियम' : 'Rules', count: 6 },
        ].map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-2.5 shrink-0 cursor-default snap-center min-w-[90px]">
             <div className="w-16 h-16 rounded-[24px] flex items-center justify-center text-3xl shadow-lg border-2" style={{ background: theme.cardHover, borderColor: theme.cardBorder }}>
              {c.icon}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-center" style={{ color: theme.textDim }}>{c.label} <span className="text-xs ml-1 opacity-50">({c.count})</span></span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((q, i) => (
          <Card key={q.id} onClick={() => !q.done && setActive(q.id)} hover={!q.done}
            className={`group relative overflow-hidden animate-slide-up border-2 ${q.done ? 'opacity-60 grayscale-[30%]' : ''}`} 
            style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}>
            
            {q.done && <div className="absolute top-4 right-4"><CheckCircle size={24} className="text-emerald-500 drop-shadow-md" /></div>}
            
            <div className="flex items-start gap-5 relative z-10 w-full cursor-pointer">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 text-white transition-all duration-500 group-hover:scale-110 shadow-xl"
                style={{ background: q.done ? '#10b981' : DC[q.diff], boxShadow: `0 5px 20px ${DC[q.diff]}40`, fontFamily: 'Outfit' }}>
                {q.done ? '✓' : i + 1}
              </div>
              <div className="flex-1 mt-1 pr-4 text-left">
                <h3 className="font-extrabold text-[17px] leading-tight" style={{ fontFamily: 'Outfit', color: theme.isDark?'white':'#0f172a' }}>{lang === 'hi' ? q.titleHi : q.title}</h3>
                <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
                  <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase text-white shadow-sm" style={{ background: DC[q.diff] }}>{lang === 'hi' ? q.diffHi : q.diff}</span>
                  <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center gap-1 shadow-sm" style={{ background: 'rgba(251,191,36,0.15)', color: theme.isDark?'#fbbf24':'#b45309' }}><Star size={11} /> {q.xp} XP</span>
                  <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase shadow-sm whitespace-nowrap" style={{ background: theme.isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)', color: theme.textDim }}>{q.type}</span>
                </div>
              </div>
              {!q.done && <ChevronRight size={20} className="mt-3 transition-all group-hover:translate-x-1 shrink-0" style={{ color: theme.accent }} />}
            </div>
            {/* Hover ambient glow */}
            {!q.done && <div className="absolute -bottom-10 -right-10 w-32 h-32 blur-[40px] rounded-full transition-opacity opacity-0 group-hover:opacity-100" style={{ background: theme.accentLight }} />}
          </Card>
        ))}
      </div>
    </div>
  )
}
