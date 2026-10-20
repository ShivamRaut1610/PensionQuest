import { useState } from 'react'
import { Plus, IndianRupee, TrendingUp, Calendar, PiggyBank, X, Check, Wallet } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const HISTORY = [
  { id:1, amount:3000, source:'Manual', fy:'2025-26', date:'2026-02-15', month:'Feb' },
  { id:2, amount:3000, source:'Manual', fy:'2025-26', date:'2026-01-12', month:'Jan' },
  { id:3, amount:5000, source:'Voluntary', fy:'2025-26', date:'2025-12-05', month:'Dec' },
  { id:4, amount:3000, source:'Salary', fy:'2025-26', date:'2025-11-10', month:'Nov' },
  { id:5, amount:3000, source:'Salary', fy:'2025-26', date:'2025-10-08', month:'Oct' },
]
const chartData = [{month:'Oct',amount:3000},{month:'Nov',amount:3000},{month:'Dec',amount:5000},{month:'Jan',amount:3000},{month:'Feb',amount:3000},{month:'Mar',amount:0}]

export default function Contributions() {
  const { lang, t } = useLang()
  const { theme } = useTheme()
  const [show, setShow] = useState(false), [amount, setAmount] = useState(''), [source, setSource] = useState('manual'), [contribs, setContribs] = useState(HISTORY), [toast, setToast] = useState(false)
  const total = contribs.reduce((s,c)=>s+c.amount,0), avg = total/Math.max(contribs.length,1), taxB = Math.min(total,200000)*0.3

  const add = () => {
    if (!amount||+amount<=0) return
    const now = new Date()
    setContribs([{ id:Date.now(), amount:+amount, source, fy:'2025-26', date:now.toISOString().slice(0,10), month:now.toLocaleString('en',{month:'short'}) }, ...contribs])
    setShow(false); setAmount(''); setToast(true); setTimeout(()=>setToast(false),3000)
  }

  return (
    <div className="space-y-8 pb-10 relative">
      {toast && <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up px-6 py-4 rounded-3xl text-white text-md font-black flex items-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.5)] border-2" style={{background:'#10b981',borderColor:'#34d399',fontFamily:'Outfit'}}><Check size={24}/> {lang==='hi'?'✅ योगदान जोड़ा गया!':'✅ Contribution added!'}</div>}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-extrabold drop-shadow-md" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>{t('contributions.title')}</h2>
          <p className="text-[16px] font-medium mt-1" style={{color:theme.textDim,fontFamily:'Playfair Display',fontStyle:'italic'}}>{t('contributions.subtitle')}</p>
        </div>
        <button onClick={()=>setShow(true)} className="btn-primary py-3.5 px-6 flex items-center justify-center gap-2 font-black text-lg uppercase tracking-wide transition-all shadow-xl hover:-translate-y-1" style={{background:theme.cta, color: 'white', boxShadow: `0 10px 30px ${theme.ctaShadow}`}}><Plus size={22}/> {t('contributions.addNew')}</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {l:t('contributions.total'),v:`₹${total.toLocaleString()}`,icon:PiggyBank,grad:'linear-gradient(135deg,#10b981,#059669)',glow:'rgba(16,185,129,0.3)'},
          {l:t('contributions.thisYear'),v:`₹${total.toLocaleString()}`,icon:Calendar,grad:`linear-gradient(135deg,${theme.accentLight},${theme.accent})`,glow:theme.accentGlow},
          {l:t('contributions.monthly'),v:`₹${Math.round(avg).toLocaleString()}`,icon:TrendingUp,grad:'linear-gradient(135deg,#fbbf24,#f59e0b)',glow:'rgba(251,191,36,0.3)'},
          {l:t('contributions.taxBenefit'),v:`₹${Math.round(taxB).toLocaleString()}`,icon:IndianRupee,grad:'linear-gradient(135deg,#c084fc,#9333ea)',glow:'rgba(168,85,247,0.3)'},
        ].map((s,i)=>(
          <Card key={i} className="animate-slide-up text-center" style={{opacity:0,animationDelay:`${i*0.1}s`}}>
            <div className="w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-transform shadow-lg" style={{background:s.grad,boxShadow:`0 10px 30px ${s.glow}`}}><s.icon size={26} className="text-white drop-shadow-md"/></div>
            <p className="text-4xl font-black" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>{s.v}</p>
            <p className="text-xs font-bold uppercase mt-1 tracking-wider" style={{color:theme.textDim}}>{s.l}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-extrabold text-2xl mb-6 tracking-wide" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>{lang==='hi'?'मासिक योगदान':'Monthly Contributions'}</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"} vertical={false}/>
            <XAxis dataKey="month" tick={{fontSize:12,fill:theme.textMuted,fontWeight:'bold'}} tickLine={false} axisLine={false}/>
            <YAxis tickFormatter={v=>`₹${(v/1000).toFixed(0)}K`} tick={{fontSize:11,fill:theme.textMuted,fontWeight:'bold'}} tickLine={false} axisLine={false}/>
            <Tooltip formatter={v=>`₹${v.toLocaleString()}`} cursor={{fill:theme.isDark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)'}} contentStyle={{borderRadius:16,border:`2px solid ${theme.cardBorder}`,background:theme.sidebar,color:theme.isDark?'white':'black',fontWeight:'bold'}}/>
            <Bar dataKey="amount" radius={[12,12,0,0]} fill="url(#cGrad)"/>
            <defs><linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={theme.accentLight}/><stop offset="100%" stopColor={theme.accent}/></linearGradient></defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="font-extrabold text-2xl mb-6 tracking-wide" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>{t('contributions.history')}</h3>
        <div className="space-y-4">
          {contribs.map((c,i)=>(
            <div key={c.id} className="flex items-center gap-5 p-5 rounded-3xl animate-slide-up transform hover:scale-[1.02] transition-transform shadow-md" style={{background:theme.isDark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.02)',border:`1px solid ${theme.cardBorder}`,animationDelay:`${i*0.05}s`,opacity:0}}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner" style={{background:theme.accentGlow,border:`2px solid ${theme.accentLight}`}}><Wallet size={24} style={{color:theme.accentLight}}/></div>
              <div className="flex-1">
                <p className="font-black text-xl tracking-wide" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>₹{c.amount.toLocaleString()}</p>
                <p className="text-[11px] font-bold uppercase mt-1 tracking-wider" style={{color:theme.textMuted}}>{c.source} • {c.fy}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black" style={{ color: theme.isDark?'white':'#0f172a' }}>{c.date}</span>
                <p className="text-[10px] uppercase font-bold mt-1" style={{ color: theme.isDark?'#34d399':'#059669' }}>{lang==='hi'?'सफल':'Success'}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={()=>setShow(false)}>
          <div className="w-full max-w-lg rounded-[2rem] p-8 animate-pop border-4 shadow-[0_50px_100px_rgba(0,0,0,0.8)]" style={{background:theme.sidebar,borderColor:theme.cardBorder}} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-extrabold text-white" style={{fontFamily:'Playfair Display'}}>{t('contributions.addNew')}</h3>
              <button onClick={()=>setShow(false)} className="p-3 rounded-2xl transition-colors hover:bg-white/10" style={{background:'rgba(255,255,255,0.06)'}}><X size={20} className="text-white"/></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest mb-3 block" style={{color:theme.textDim}}>{t('contributions.amount')}</label>
                <div className="relative">
                  <IndianRupee size={24} className="absolute left-5 top-1/2 -translate-y-1/2" style={{color:theme.accentLight}}/>
                  <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="3000"
                    className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] text-2xl font-black outline-none transition-all shadow-inner" style={{background:theme.isDark?'rgba(0,0,0,0.4)':'rgba(0,0,0,0.05)',border:`2px solid ${theme.cardBorder}`,fontFamily:'Outfit', color: theme.isDark?'white':'black'}}/>
                </div>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest mb-3 block" style={{color:theme.textDim}}>{t('contributions.source')}</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{k:'manual',l:t('contributions.manual'),i:'✋'},{k:'salary',l:t('contributions.salary'),i:'💼'},{k:'voluntary',l:t('contributions.voluntary'),i:'🎯'}].map(s=>(
                    <button key={s.k} onClick={()=>setSource(s.k)} className="p-4 rounded-[1.5rem] text-center transition-all duration-300"
                      style={source===s.k?{background:theme.accentGlow,border:`2px solid ${theme.accentLight}`,boxShadow:`0 10px 25px ${theme.accentGlow}`}:{background:theme.isDark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',border:`2px solid ${theme.cardBorder}`}}>
                      <span className="text-3xl drop-shadow-md">{s.i}</span>
                      <p className="text-[11px] font-bold uppercase mt-2 tracking-wide" style={{ color: theme.isDark?'white':'#0f172a' }}>{s.l}</p>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={add} disabled={!amount||+amount<=0} className="w-full mt-4 py-5 rounded-[1.5rem] text-xl font-black uppercase text-white tracking-widest shadow-2xl disabled:opacity-30 disabled:hover:scale-100 transition-transform hover:scale-105" style={{background:theme.cta}}>{t('contributions.addNew')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
