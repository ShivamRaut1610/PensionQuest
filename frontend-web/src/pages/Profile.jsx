import { Award, BookOpen, Flame, IndianRupee, Settings, Globe, Bell, LogOut, ChevronRight, Shield, TrendingUp, Check } from 'lucide-react'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const U={name:'Shivam Raut',email:'shivam@pensionquest.dev',age:25,city:'Pune',retireAge:60,risk:'Moderate',level:3,xp:2450,contributed:'₹12,000',streak:7,quests:8}
const ALL=[
  {n:'First Quest',nH:'पहला क्वेस्ट',i:'0',d:'Complete first quest',dH:'पहला क्वेस्ट पूरा',u:true,dt:'2d ago',dtH:'2 दिन पहले'},
  {n:'Streak 3',nH:'स्ट्रीक 3',i:'0',d:'3-day streak',dH:'3 दिन स्ट्रीक',u:true,dt:'5d ago',dtH:'5 दिन पहले'},
  {n:'Streak 7',nH:'स्ट्रीक 7',i:'0',d:'7-day streak',dH:'7 दिन स्ट्रीक',u:true,dt:'Today',dtH:'आज'},
  {n:'Scholar',nH:'विद्वान',i:'1',d:'10 quests',dH:'10 क्वेस्ट',u:false,p:'8/10'},
  {n:'First Step',nH:'पहला कदम',i:'0',d:'First contribution',dH:'पहला योगदान',u:false,p:'0/1'},
  {n:'Saver 5K',nH:'बचतकर्ता',i:'1',d:'₹5K contributed',dH:'₹5K योगदान',u:false,p:'₹0/₹5K'},
  {n:'Five Figure',nH:'पांच अंक',i:'1',d:'₹10K contributed',dH:'₹10K योगदान',u:false,p:'₹0/₹10K'},
  {n:'Streak 30',nH:'स्ट्रीक 30',i:'0',d:'30-day streak',dH:'30 दिन स्ट्रीक',u:false,p:'7/30'},
  {n:'Sim Pro',nH:'सिम प्रो',i:'2',d:'Use sim 5x',dH:'सिम 5 बार',u:false,p:'2/5'},
  {n:'AI Explorer',nH:'AI एक्सप्लोरर',i:'2',d:'10 AI chats',dH:'10 AI चैट',u:false,p:'3/10'},
  {n:'Ambassador',nH:'राजदूत',i:'3',d:'Refer 3',dH:'3 रेफर',u:false,p:'0/3'},
  {n:'Influencer',nH:'प्रभावशाली',i:'3',d:'Refer 10',dH:'10 रेफर',u:false,p:'0/10'},
  {n:'Expert',nH:'विशेषज्ञ',i:'2',d:'25 quests',dH:'25 क्वेस्ट',u:false,p:'8/25'},
  {n:'Consistent',nH:'निरंतर',i:'2',d:'6mo saving',dH:'6 महीने बचत',u:false,p:'0/6'},
  {n:'Multilingual',nH:'बहुभाषी',i:'3',d:'2 languages',dH:'2 भाषाएं',u:false,p:'1/2'},
]
const XP=[0,500,1500,3500,7500,15000,30000]

export default function Profile(){
  const {lang,t}=useLang(), {theme}=useTheme()
  const titles=t('levelTitles'), cur=XP[U.level-1], nxt=XP[U.level], pct=((U.xp-cur)/(nxt-cur))*100

  return(
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <Card className="!p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <div className="absolute top-0 left-0 right-0 h-40 rounded-t-[1.8rem]" style={{background:theme.hero}}/>
        <div className="absolute top-8 right-10 text-7xl opacity-10 drop-shadow-xl" style={{filter:`drop-shadow(0 0 20px ${theme.accentLight})`}}>🏆</div>
        <div className="relative z-10 pt-28 flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="w-28 h-28 rounded-[2rem] flex items-center justify-center text-5xl font-black text-white shadow-2xl border-[4px]" style={{background:theme.accent,borderColor:theme.sidebar,boxShadow:`0 15px 40px ${theme.accentGlow}`,fontFamily:'Outfit'}}>S</div>
          <div className="text-center sm:text-left flex-1 mt-4 sm:mt-0">
            <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-md" style={{fontFamily:'Playfair Display', color: theme.isDark?'white':'#0f172a'}}>{U.name}</h2>
            <p className="text-[13px] font-bold mt-2 uppercase tracking-widest" style={{color:theme.textDim}}>{U.email} • {U.city}</p>
          </div>
          <div className="flex gap-4 mt-6 sm:mt-0">
            <div className="text-center px-6 py-4 rounded-[1.2rem] shadow-inner border" style={{background:'rgba(251,191,36,0.1)',borderColor:'rgba(251,191,36,0.3)'}}>
              <p className="text-2xl font-black drop-shadow-md" style={{fontFamily:'Outfit', color: theme.isDark?'#fcd34d':'#d97706'}}>{U.xp.toLocaleString()}</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-amber-500/80 mt-1">{t('dashboard.statLabels.totalXp')}</p>
            </div>
            <div className="text-center px-6 py-4 rounded-[1.2rem] shadow-inner border" style={{background:'rgba(16,185,129,0.1)',borderColor:'rgba(16,185,129,0.3)'}}>
              <p className="text-2xl font-black drop-shadow-md" style={{fontFamily:'Outfit', color: theme.isDark?'#6ee7b7':'#059669'}}>Lv{U.level}</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500/80 mt-1">{Array.isArray(titles)?titles[U.level]:''}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 p-5 rounded-[1.5rem] shadow-inner border" style={{background: theme.isDark?'rgba(0,0,0,0.2)':'rgba(0,0,0,0.05)',borderColor:`${theme.cardBorder}`}}>
          <div className="flex items-center justify-between text-[11px] mb-3 font-black uppercase tracking-widest">
            <span style={{color:theme.textMuted}}>{t('common.level')} {U.level}</span>
            <span style={{color:theme.accent}}>{nxt-U.xp} XP → Lv{U.level+1}</span>
          </div>
          <div className="w-full h-4 rounded-full overflow-hidden border" style={{background: theme.isDark?'rgba(0,0,0,0.5)':'rgba(0,0,0,0.1)', borderColor: theme.cardBorder }}>
            <div className="h-4 rounded-full relative overflow-hidden transition-all duration-1000 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]" style={{width:`${pct}%`,background:`linear-gradient(90deg,${theme.accentLight},${theme.accent})`,boxShadow:`0 0 30px ${theme.accentGlow}`}}>
              <div className="shimmer absolute inset-0"/>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[{icon:BookOpen,l:t('profile.questsDone'),v:U.quests,grad:`linear-gradient(135deg,${theme.accentLight},${theme.accent})`,glow:theme.accentGlow},
          {icon:Flame,l:t('common.streak'),v:`${U.streak} 🔥`,grad:'linear-gradient(135deg,#fb923c,#ea580c)',glow:'rgba(249,115,22,0.3)'},
          {icon:IndianRupee,l:t('profile.contributed'),v:U.contributed,grad:'linear-gradient(135deg,#34d399,#059669)',glow:'rgba(16,185,129,0.3)'},
          {icon:Award,l:t('common.badges'),v:`${ALL.filter(b=>b.u).length}/${ALL.length}`,grad:'linear-gradient(135deg,#fbbf24,#f59e0b)',glow:'rgba(251,191,36,0.3)'},
        ].map((s,i)=>(
          <Card key={i} className="text-center animate-slide-up" style={{opacity:0,animationDelay:`${i*0.1}s`}}>
            <div className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center mx-auto mb-4 transition-transform shadow-lg hover:scale-110" style={{background:s.grad,boxShadow:`0 10px 30px ${s.glow}`}}><s.icon size={24} className="text-white drop-shadow-md"/></div>
            <p className="text-3xl font-black" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>{s.v}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider mt-2" style={{color:theme.textDim}}>{s.l}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-extrabold text-2xl flex items-center gap-3 mb-6 tracking-wide drop-shadow-md" style={{fontFamily:'Outfit', color: theme.isDark?'white':'black'}}><Award size={24} className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"/> {t('profile.allBadges')} <span className="text-[12px] px-3 py-1 rounded-[8px] tracking-widest text-amber-500" style={{background:'rgba(251,191,36,0.15)'}}>({ALL.filter(b=>b.u).length}/{ALL.length})</span></h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {ALL.map((b,i)=>(
            <div key={i} className={`p-5 rounded-[1.5rem] text-center transition-all duration-300 relative overflow-hidden group border-[3px] shadow-sm ${b.u?'hover:scale-105 hover:shadow-2xl cursor-pointer':'opacity-40 grayscale-[60%]'}`}
              style={b.u?{background:'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.05))',borderColor:'rgba(251,191,36,0.3)',boxShadow:'0 10px 30px rgba(251,191,36,0.15)'}:{background:'rgba(0,0,0,0.2)',borderColor:theme.cardBorder}}>
              
              <div className="w-16 h-16 mx-auto mb-3 relative drop-shadow-xl overflow-hidden rounded-[12px]">
                <div className="w-[400%] h-full absolute top-0 left-0 bg-no-repeat bg-cover transition-transform group-hover:scale-110"
                     style={{
                       backgroundImage: 'url(/images/achievement_badges.png)',
                       backgroundPosition: `${Number(b.i) * 33.33}% 0%`,
                       transform: b.u ? 'scale(1.2)' : 'scale(1)'
                     }}/>
              </div>

              <p className="text-[12px] font-black uppercase mt-3 tracking-wider drop-shadow-sm font-[Inter] leading-tight" style={{ color: theme.isDark?'white':'#0f172a' }}>{lang==='hi'?b.nH:b.n}</p>
              <p className="text-[10px] font-medium tracking-wide mt-2" style={{color:theme.textDim}}>{lang==='hi'?b.dH:b.d}</p>
              
              {b.u?<p className="text-[9px] font-black uppercase text-emerald-500 mt-3 px-2 py-1 rounded-[6px] inline-flex items-center gap-1 shadow-inner" style={{background:'rgba(16,185,129,0.15)'}}><Check size={10}/> {lang==='hi'?b.dtH:b.dt}</p>:<p className="text-[10px] font-black uppercase mt-3" style={{color:theme.textMuted}}>{b.p}</p>}
              
              {b.u && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-extrabold text-2xl flex items-center gap-3 mb-6 tracking-wide drop-shadow-md" style={{fontFamily:'Outfit', color: theme.isDark?'white':'black'}}><Settings size={22} style={{color:theme.textMuted}}/> {t('common.settings')}</h3>
        <div className="space-y-2">
          {[{i:Globe,l:t('common.language'),v:lang==='hi'?'हिंदी':'English'},{i:Bell,l:t('profile.notifications'),v:t('profile.enabled')},{i:Shield,l:t('profile.riskProfile'),v:U.risk},{i:TrendingUp,l:t('profile.retirementAge'),v:U.retireAge}].map((s,i)=>(
            <button key={i} className="w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all group border-2" style={{background:'transparent',borderColor:'transparent'}}
              onMouseEnter={e=>{e.currentTarget.style.background=theme.isDark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)';e.currentTarget.style.borderColor=theme.cardBorder}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='transparent'}}>
              <s.i size={22} className="transition-colors group-hover:drop-shadow-md" style={{color:theme.textMuted}}/><span className="text-[15px] font-black uppercase tracking-widest flex-1 text-left drop-shadow-sm" style={{ color: theme.isDark?'white':'black' }}>{s.l}</span><span className="text-[13px] font-bold tracking-widest uppercase" style={{color:theme.accent}}>{s.v}</span><ChevronRight size={18} className="transition-all transform group-hover:translate-x-1" style={{color:theme.textMuted}}/>
            </button>
          ))}
          <button className="w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all text-red-500 group mt-4 border-2 shadow-inner" style={{background:'rgba(239,68,68,0.05)',borderColor:'rgba(239,68,68,0.1)'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(239,68,68,0.1)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(239,68,68,0.05)'}}>
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform"/><span className="text-[15px] font-black uppercase tracking-widest drop-shadow-sm">{t('common.logout')}</span>
          </button>
        </div>
      </Card>
    </div>
  )
}
