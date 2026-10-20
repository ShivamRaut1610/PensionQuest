import { useState } from 'react'
import { Trophy, Crown } from 'lucide-react'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const LB=[{rank:1,name:'Vikram Sharma',level:7,xp:32400,city:'Mumbai',badge:'🏆'},{rank:2,name:'Priya Patel',level:6,xp:28900,city:'Delhi',badge:'🥈'},{rank:3,name:'Rahul Kumar',level:6,xp:27100,city:'Bangalore',badge:'🥉'},{rank:4,name:'Sneha Reddy',level:5,xp:21500,city:'Hyderabad'},{rank:5,name:'Amit Joshi',level:5,xp:19800,city:'Pune'},{rank:6,name:'Kavita Singh',level:5,xp:18200,city:'Pune'},{rank:7,name:'Arjun Nair',level:4,xp:15600,city:'Chennai'},{rank:8,name:'Ritu Desai',level:4,xp:14300,city:'Ahmedabad'},{rank:9,name:'Deepak Gupta',level:4,xp:12800,city:'Delhi'},{rank:10,name:'Ananya Iyer',level:3,xp:11200,city:'Mumbai'},{rank:11,name:'Rohan Mehta',level:3,xp:9500,city:'Pune'},{rank:12,name:'Shivam Raut',level:3,xp:2450,city:'Pune',isUser:true}]
const LT={en:['','Rookie','Learner','Aware','Saver','Champion','Master','Legend'],hi:['','नौसिखिया','शिक्षार्थी','जागरूक','बचतकर्ता','चैंपियन','मास्टर','लीजेंड']}

export default function Leaderboard(){
  const {lang,t}=useLang(), {theme}=useTheme()
  const [tab,setTab]=useState('national')
  const data=tab==='city'?LB.filter(u=>u.city==='Pune'):LB, user=LB.find(u=>u.isUser), titles=LT[lang]

  const podiumColors = ['linear-gradient(135deg,#fbbf24,#f59e0b)','linear-gradient(135deg,#94a3b8,#64748b)','linear-gradient(135deg,#d97706,#b45309)']
  const podiumShadows = ['0 15px 40px rgba(251,191,36,0.4)','0 15px 35px rgba(148,163,184,0.3)','0 15px 35px rgba(217,119,6,0.3)']

  return(
    <div className="space-y-10 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-5xl font-extrabold flex items-center gap-3 drop-shadow-md" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}><Trophy size={36} className="text-amber-400 drop-shadow-lg"/> {t('leaderboard.title')}</h2>
          <p className="text-[16px] font-medium mt-2" style={{color:theme.textDim,fontFamily:'Playfair Display',fontStyle:'italic'}}>{t('leaderboard.subtitle')}</p>
        </div>
        <div className="flex p-1.5 rounded-[20px] w-max shadow-inner border border-white/5" style={{background:theme.isDark?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.05)'}}>
          {[{k:'national',l:t('leaderboard.national')},{k:'city',l:t('leaderboard.city')}].map(tb=>(
            <button key={tb.k} onClick={()=>setTab(tb.k)} className={`px-6 py-3 rounded-2xl text-[13px] font-black uppercase tracking-wider transition-all duration-300 ${tab===tb.k?`${theme.isDark?'text-white':'text-black'} shadow-lg scale-105`:`${theme.isDark?'hover:text-white':'hover:text-black'}`}`}
              style={tab===tb.k?{background:theme.cta,boxShadow:`0 10px 30px ${theme.ctaShadow}`}:{color:theme.textMuted}}>{tb.l}</button>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-end gap-2 sm:gap-6 pt-10">
        {[LB[1],LB[0],LB[2]].map((u,idx)=>{
          if(!u) return <div key={idx} className="flex-1"/>
          const isFirst=u.rank===1
          return(
            <div key={u.rank} className={`flex-1 flex flex-col items-center animate-slide-up transform ${isFirst?'z-20 -translate-y-8':'z-10'}`} style={{animationDelay:`${idx*0.15}s`,opacity:0}}>
              {isFirst&&<Crown size={36} className="text-amber-400 mb-3 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] animate-pulse"/>}
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-5xl font-black text-white border-4" style={{background:podiumColors[u.rank-1],boxShadow:podiumShadows[u.rank-1],borderColor:theme.card,fontFamily:'Outfit'}}>
                {u.name.charAt(0)}
              </div>
              <div className="w-full text-center mt-4 p-4 rounded-t-[2rem] border-x-2 border-t-2"
                style={{height:isFirst?'180px':u.rank===2?'140px':'100px',background:isFirst?'linear-gradient(to top, rgba(251,191,36,0.15), rgba(251,191,36,0.05))':`linear-gradient(to top, ${theme.isDark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.08)'}, transparent)`,borderColor:isFirst?'rgba(251,191,36,0.3)':theme.cardBorder}}>
                <p className="text-xl sm:text-3xl mb-1">{u.badge}</p>
                <p className="font-extrabold text-[12px] sm:text-[15px] truncate px-2" style={{fontFamily:'Inter', color: theme.isDark?'white':'#0f172a'}}>{u.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{color:theme.textDim}}>{titles[u.level]}</p>
                <p className="text-lg sm:text-3xl font-black mt-2 drop-shadow-md" style={{color:theme.accentLight,fontFamily:'Outfit'}}>{u.xp.toLocaleString()}</p>
              </div>
            </div>
          )
        })}
      </div>

      {user&&(
        <Card className="animate-slide-up relative overflow-hidden" style={{opacity:0,animationDelay:'0.4s',background:theme.accentGlow,borderColor:theme.accentLight,borderWidth:'2px'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" style={{backgroundSize:'200% 100%'}}/>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-white font-black text-4xl shadow-2xl border-[3px]" style={{background:theme.accent,borderColor:theme.accentLight,boxShadow:`0 15px 40px ${theme.accentGlow}`,fontFamily:'Outfit'}}>S</div>
            <div className="flex-1">
              <p className="font-black text-2xl tracking-wide" style={{fontFamily:'Outfit', color: theme.isDark?'white':'black'}}>{t('leaderboard.yourPosition')}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{color:theme.textDim}}>{titles[user.level]} • {user.city}</p>
            </div>
            <div className="relative group cursor-pointer">
              <div className="w-28 h-32 flex flex-col items-center justify-center transition-transform group-hover:scale-110 shadow-2xl" style={{background:`linear-gradient(180deg,${theme.accent},${theme.card})`,clipPath:'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'}}>
                <span className="text-[12px] font-black uppercase tracking-widest text-white/70">{lang==='hi'?'रैंक':'Rank'}</span>
                <span className="text-5xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{fontFamily:'Outfit'}}>{user.rank}</span>
              </div>
            </div>
            <div className="px-6 py-4 rounded-[1.5rem] text-center shadow-inner" style={{background:'rgba(16,185,129,0.15)',border:'2px solid rgba(16,185,129,0.3)'}}>
              <p className="text-[16px] font-black uppercase tracking-widest text-emerald-500 drop-shadow-sm">{t('leaderboard.top')} {Math.max(1, Math.ceil((user.rank/data.length)*100))}%</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="!p-0 overflow-hidden shadow-2xl border-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{background:theme.isDark?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.03)',borderBottom:`2px solid ${theme.cardBorder}`}}>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest" style={{color:theme.textMuted}}>{t('leaderboard.rank')}</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest" style={{color:theme.textMuted}}>{t('leaderboard.player')}</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest" style={{color:theme.textMuted}}>{t('common.level')}</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-right" style={{color:theme.textMuted}}>XP</th>
              </tr>
            </thead>
            <tbody>{data.map(u=>(
              <tr key={u.rank} className="transition-all duration-300" style={{borderBottom:`1px solid ${theme.cardBorder}`,background:u.isUser?theme.accentGlow:'transparent'}}>
                <td className="px-8 py-4">
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-[12px] text-[15px] font-black shadow-inner"
                  style={u.rank<=3?{background:'linear-gradient(135deg,rgba(251,191,36,0.2),rgba(245,158,11,0.1))',color:'#fbbf24',border:'1px solid rgba(251,191,36,0.3)'}:{background:theme.isDark?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.05)',color:theme.textDim,fontFamily:'Outfit'}}>{u.rank}</span>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black text-white shadow-md border border-white/10"
                      style={u.isUser?{background:theme.accent}:{background:'rgba(59,130,246,0.5)',fontFamily:'Outfit'}}>{u.name.charAt(0)}</div>
                    <span className="text-[15px] font-bold tracking-wide" style={{ color: theme.isDark?'white':'#0f172a' }}>{u.name} {u.isUser&&<span className="ml-2 px-2 py-0.5 rounded-[6px] text-[9px] font-black uppercase" style={{background:theme.accentLight,color:'white'}}>{t('leaderboard.you')}</span>}</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="text-[10px] px-3 py-1.5 rounded-lg font-black uppercase tracking-wider" style={{background:theme.isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)',color:theme.textMuted}}>Lv{u.level}</span>
                </td>
                <td className="px-8 py-4 text-right text-lg font-black" style={{color:u.isUser?theme.accentLight:theme.textDim,fontFamily:'Outfit'}}>{u.xp.toLocaleString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
