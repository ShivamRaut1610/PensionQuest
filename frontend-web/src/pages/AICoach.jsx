import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Info } from 'lucide-react'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const AI = {
  tax:{en:'With NPS, you can save up to **₹2 lakh in taxes** annually:\n\n• **80CCD(1):** Up to 10% salary (₹1.5L 80C limit)\n• **80CCD(1B):** Additional **₹50,000** exclusively for NPS\n\nThat\'s ~₹15,600 annual tax savings — a 31% instant return! 🎉',hi:'NPS से आप सालाना **₹2 लाख तक टैक्स** बचा सकते हैं:\n\n• **80CCD(1):** वेतन का 10% (₹1.5L 80C सीमा)\n• **80CCD(1B):** NPS के लिए अतिरिक्त **₹50,000**\n\nयह ~₹15,600 वार्षिक कर बचत है — 31% तत्काल रिटर्न! 🎉'},
  return:{en:'NPS historical returns:\n\n• **Equity (E):** ~12-14% (10yr)\n• **Corp Bonds (C):** ~9-11%\n• **Govt Securities (G):** ~8-10%\n\n**LC-75 Auto Choice** = ~10-12% average. Start early! 📈',hi:'NPS ऐतिहासिक रिटर्न:\n\n• **इक्विटी (E):** ~12-14% (10वर्ष)\n• **कॉर्प बॉन्ड (C):** ~9-11%\n• **सरकारी (G):** ~8-10%\n\n**LC-75 ऑटो चॉइस** = ~10-12% औसत। जल्दी शुरू करें! 📈'},
  open:{en:'Opening NPS in 10 mins:\n\n1. **eNPS:** enps.nsdl.com\n2. **Tier I** (tax benefits)\n3. **eKYC:** Aadhaar OTP\n4. **Min:** ₹500/yr\n5. **Pick PFM:** SBI/HDFC/ICICI\n6. **Strategy:** Auto/Active\n\nYou get a PRAN number! 🎯',hi:'10 मिनट में NPS खोलें:\n\n1. **eNPS:** enps.nsdl.com\n2. **टियर I** (कर लाभ)\n3. **eKYC:** आधार OTP\n4. **न्यूनतम:** ₹500/वर्ष\n5. **PFM चुनें:** SBI/HDFC\n6. **रणनीति:** ऑटो/एक्टिव\n\nPRAN नंबर मिलता है! 🎯'},
  tier:{en:'**Tier I:** Lock-in till 60, tax benefits, 60% tax-free at maturity\n**Tier II:** No lock-in, no tax benefits, like mutual fund\n\n💡 Start with Tier I for tax savings!',hi:'**टियर I:** 60 तक लॉक-इन, कर लाभ, 60% कर-मुक्त\n**टियर II:** कोई लॉक-इन नहीं, कर लाभ नहीं\n\n💡 कर बचत के लिए टियर I से शुरू करें!'},
  fund:{en:'For you (age 25, moderate):\n\n🎯 **LC-50 Auto Choice**\n• Equity: 50% → 10% by 55\n• Corp Bonds: 30%\n• Govt Sec: 20%\n\n**LC-75** for more risk tolerance.',hi:'आपके लिए (आयु 25, मध्यम):\n\n🎯 **LC-50 ऑटो चॉइस**\n• इक्विटी: 50% → 55 तक 10%\n• कॉर्प बॉन्ड: 30%\n• सरकारी: 20%\n\nअधिक जोखिम के लिए **LC-75**।'},
  default:{en:'NPS is India\'s best retirement scheme! Ask about:\n• 💰 Tax benefits\n• 📊 Returns\n• 🏦 Opening account\n• ⚖️ Tier I vs II',hi:'NPS भारत की सर्वोत्तम सेवानिवृत्ति योजना है! पूछें:\n• 💰 कर लाभ\n• 📊 रिटर्न\n• 🏦 खाता खोलना\n• ⚖️ टियर I बनाम II'},
}
function getR(m,l){const s=m.toLowerCase();if(s.includes('tax')||s.includes('कर')||s.includes('save')||s.includes('बचा'))return AI.tax[l];if(s.includes('return')||s.includes('रिटर्न'))return AI.return[l];if(s.includes('open')||s.includes('खोल')||s.includes('account'))return AI.open[l];if(s.includes('tier')||s.includes('टियर')||s.includes('diff'))return AI.tier[l];if(s.includes('fund')||s.includes('फंड')||s.includes('best'))return AI.fund[l];return AI.default[l]}

export default function AICoach(){
  const {lang,t}=useLang()
  const {theme}=useTheme()
  const [msgs,setMsgs]=useState([{role:'assistant',content:t('coach.greeting').replace('{name}','Shivam')}])
  const [input,setInput]=useState(''),[typing,setTyping]=useState(false)
  const endRef=useRef(null)
  
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[msgs])
  useEffect(()=>{setMsgs([{role:'assistant',content:t('coach.greeting').replace('{name}','Shivam')}])},[lang])
  
  const send=(txt)=>{const m=txt||input.trim();if(!m)return;setMsgs(p=>[...p,{role:'user',content:m}]);setInput('');setTyping(true);setTimeout(()=>{setMsgs(p=>[...p,{role:'assistant',content:getR(m,lang)}]);setTyping(false)},1000)}
  const prompts=t('coach.quickPrompts')||[]

  return(
    <div className="max-w-4xl mx-auto space-y-6 pb-6 h-full flex flex-col pt-2" style={{height:'calc(100vh - 120px)'}}>
      <div className="flex-shrink-0">
        <h2 className="text-4xl font-extrabold flex items-center gap-3 drop-shadow-md" style={{fontFamily:'Playfair Display', color: theme.isDark?'white':'#0f172a'}}><Sparkles size={28} style={{color:theme.accentLight}}/> {t('coach.title')}</h2>
        <p className="text-sm font-medium mt-2" style={{color:theme.textDim,fontFamily:'Inter'}}>{t('coach.subtitle')}</p>
      </div>
      
      <Card className="!p-0 overflow-hidden flex-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10" style={{background:theme.isDark?'rgba(0,0,0,0.2)':'rgba(0,0,0,0.03)'}}>
          {msgs.map((m,i)=>(
            <div key={i} className={`flex gap-4 ${m.role==='user'?'flex-row-reverse':''} animate-slide-up`}>
              <div className="w-12 h-12 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-lg border-2 z-10"
                style={m.role==='assistant'?{background:theme.accent,borderColor:theme.accentLight,boxShadow:`0 10px 25px ${theme.accentGlow}`}:{background:'rgba(255,255,255,0.08)',borderColor:'rgba(255,255,255,0.1)'}}>
                {m.role==='assistant'?<Bot size={22} className="text-white drop-shadow-md"/>:<User size={22} className="text-white drop-shadow-md"/>}
              </div>
              <div className="max-w-[75%] px-6 py-4 rounded-[1.5rem] text-[15px] leading-relaxed shadow-lg relative"
                style={m.role==='user'?{background:theme.accent,color:'white',fontFamily:'Inter',boxShadow:`0 10px 30px ${theme.accentGlow}`,borderTopRightRadius:0}:{background:theme.sidebar,border:`1px solid ${theme.cardBorder}`,color:theme.isDark?'#e2e8f0':'#334155',fontFamily:'Outfit',borderTopLeftRadius:0}}>
                <div className="space-y-2">{m.content.split('\n').map((l,j)=><p key={j} className={j>0?'mt-1':''}>{l.split('**').map((p,k)=>k%2===1?<strong key={k} className="font-black drop-shadow-sm" style={{color:m.role==='user'?'white':theme.isDark?'white':'black'}}>{p}</strong>:p)}</p>)}</div>
                {/* Tail styling */}
                <div className="absolute top-0 w-4 h-4" style={{[m.role==='user'?'right':'left']:'-12px',clipPath:m.role==='user'?'polygon(0 0, 100% 0, 0 100%)':'polygon(100% 0, 0 0, 100% 100%)',background:m.role==='user'?theme.accent:theme.sidebar}}/>
              </div>
            </div>
          ))}
          {typing&&<div className="flex gap-4 animate-slide-up"><div className="w-12 h-12 rounded-[1.2rem] flex items-center justify-center shadow-lg border-2" style={{background:theme.accent,borderColor:theme.accentLight}}><Bot size={22} className="text-white"/></div><div className="px-6 py-4 rounded-[1.5rem]" style={{background:theme.sidebar,borderTopLeftRadius:0}}><div className="flex gap-1.5">{[0,150,300].map(d=><span key={d} className="w-2.5 h-2.5 rounded-full animate-bounce" style={{background:theme.accentLight,animationDelay:`${d}ms`}}/>)}</div></div></div>}
          <div ref={endRef}/>
        </div>
        
        <div className="px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide" style={{borderTop:`1px solid ${theme.cardBorder}`,background:theme.isDark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)'}}>
          {Array.isArray(prompts)&&prompts.map((p,i)=>(
            <button key={i} onClick={()=>send(p.replace(/^[^\s]+\s/,''))} className="shrink-0 px-4 py-2.5 rounded-[1.2rem] text-xs font-black uppercase tracking-wider whitespace-nowrap transition-transform hover:scale-105 shadow-md border"
              style={{background:theme.accentGlow,borderColor:theme.accent,color:theme.isDark?theme.accentLight:theme.accent}}>{p}</button>
          ))}
        </div>
        
        <div className="p-6 md:px-8" style={{borderTop:`1px solid ${theme.cardBorder}`,background:theme.card}}>
          <div className="flex gap-4">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={t('coach.placeholder')}
              className="flex-1 px-6 py-4 rounded-[1.5rem] text-[16px] outline-none transition-all shadow-inner font-medium" style={{background:theme.isDark?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.05)',border:`2px solid ${theme.cardBorder}`,fontFamily:'Outfit', color: theme.isDark?'white':'black'}}/>
            <button onClick={()=>send()} disabled={!input.trim()} className="px-6 py-4 rounded-[1.5rem] text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-1 disabled:opacity-30 disabled:hover:translate-y-0"
              style={{background:theme.cta}}><Send size={20}/></button>
          </div>
          <div className="flex items-center gap-2 mt-3 px-2 justify-center"><Info size={14} style={{color:theme.textMuted}}/><p className="text-[12px] font-medium" style={{color:theme.textMuted,fontFamily:'Inter'}}>{t('coach.disclaimer')}</p></div>
        </div>
      </Card>
    </div>
  )
}
