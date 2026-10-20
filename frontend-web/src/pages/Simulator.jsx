import { useState, useMemo } from 'react'
import { IndianRupee, TrendingUp, Clock, AlertTriangle, Percent, RotateCcw } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const fmt = v => { if (v >= 10000000) return `₹${(v/10000000).toFixed(1)}Cr`; if (v >= 100000) return `₹${(v/100000).toFixed(1)}L`; return `₹${(v/1000).toFixed(0)}K` }
function calc(a, r, m, rt) { const mo = (r-a)*12, mr = rt/100/12; if (mr===0||mo<=0) return m*Math.max(mo,0); return m*((Math.pow(1+mr,mo)-1)/mr)*(1+mr) }

export default function Simulator() {
  const { lang, t } = useLang()
  const { theme } = useTheme()
  const [age, setAge] = useState(25), [ret, setRet] = useState(60), [monthly, setMonthly] = useState(3000), [rate, setRate] = useState(10), [income] = useState(600000), [ak, setAk] = useState(0)

  const corpus = useMemo(() => calc(age,ret,monthly,rate), [age,ret,monthly,rate])
  const pension = corpus*0.4*0.06/12
  const tax = (Math.min(monthly*12,150000)+Math.min(monthly*12,50000))*(income>1000000?0.3:income>500000?0.2:0.05)*(ret-age)
  const d1=corpus-calc(age+1,ret,monthly,rate), d3=corpus-calc(age+3,ret,monthly,rate), d5=corpus-calc(age+5,ret,monthly,rate)
  const cd = useMemo(() => { const d=[]; for(let y=age;y<=ret;y++) d.push({age:y,corpus:Math.round(calc(age,y,monthly,rate))}); return d }, [age,ret,monthly,rate])
  const comp = [{label:'₹1K',value:calc(age,ret,1000,rate)},{label:'₹3K',value:calc(age,ret,3000,rate)},{label:'₹5K',value:calc(age,ret,5000,rate)},{label:'₹10K',value:calc(age,ret,10000,rate)}]

  const sliders = [
    { label: t('simulator.yourAge'), val:age, set:setAge, min:18, max:55, step:1, color: theme.accentLight },
    { label: t('simulator.retireAt'), val:ret, set:setRet, min:Math.max(age+5,50), max:75, step:1, color: theme.accent },
    { label: t('simulator.monthly'), val:monthly, set:setMonthly, min:500, max:50000, step:500, color: '#10b981', f:v=>`₹${v.toLocaleString()}` },
    { label: t('simulator.returnPct'), val:rate, set:setRate, min:6, max:14, step:0.5, color: '#f59e0b', f:v=>`${v}%` },
  ]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-extrabold tracking-wide" style={{ fontFamily: 'Outfit', color: theme.isDark?'white':'#0f172a' }}>{t('simulator.title')}</h2>
          <p className="text-sm mt-1 font-medium" style={{ color: theme.textDim, fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '18px' }}>{t('simulator.subtitle')}</p>
        </div>
        <button onClick={() => {setAge(25);setRet(60);setMonthly(3000);setRate(10);setAk(k=>k+1)}} 
                className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-2 font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform" 
                style={{ background: theme.isDark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)', color: theme.isDark?'white':'black', border: `1px solid ${theme.cardBorder}` }}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <Card className="shadow-2xl transition-all duration-700 hover:shadow-3xl transform hover:-translate-y-1">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {sliders.map((s,i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-4">
                <label className="text-[12px] font-black uppercase tracking-[0.1em]" style={{ color: theme.textDim }}>{s.label}</label>
                <span className="text-2xl font-black drop-shadow-md" style={{ color: s.color, fontFamily: 'Outfit' }}>{s.f?s.f(s.val):s.val}</span>
              </div>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e=>s.set(+e.target.value)}
                className="w-full h-3 rounded-full appearance-none cursor-grab active:cursor-grabbing shadow-inner" style={{ background: `linear-gradient(to right, ${s.color} 0%, ${s.color} ${((s.val-s.min)/(s.max-s.min))*100}%, rgba(255,255,255,0.08) ${((s.val-s.min)/(s.max-s.min))*100}%, rgba(255,255,255,0.08) 100%)`, accentColor: s.color, border: '1px solid rgba(0,0,0,0.5)' }} />
            </div>
          ))}
        </div>
      </Card>

      <div key={ak} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label:t('simulator.projectedCorpus'), value:fmt(corpus), icon:IndianRupee, grad:'linear-gradient(135deg,#10b981,#059669)', glow:'rgba(16,185,129,0.3)', sub:t('simulator.inYears').replace('{n}',ret-age) },
          { label:t('simulator.monthlyPension'), value:fmt(pension), icon:TrendingUp, grad:`linear-gradient(135deg,${theme.accentLight},${theme.accent})`, glow:theme.accentGlow, sub:t('simulator.annuity') },
          { label:t('simulator.taxSaved'), value:fmt(tax), icon:Percent, grad:'linear-gradient(135deg,#c084fc,#9333ea)', glow:'rgba(168,85,247,0.3)', sub:'80CCD(1)+80CCD(1B)' },
          { label:t('simulator.costDelay'), value:fmt(d5), icon:AlertTriangle, grad:'linear-gradient(135deg,#f97316,#ea580c)', glow:'rgba(249,115,22,0.3)', sub:t('simulator.dontWait') },
        ].map((s,i) => (
          <Card key={i} className="text-center group animate-slide-up hover:scale-105 transition-all shadow-xl" style={{opacity:0,animationDelay:`${i*0.1}s`}}>
            <div className="w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-xl" style={{background:s.grad,boxShadow:`0 10px 30px ${s.glow}`}}>
              <s.icon size={26} className="text-white drop-shadow-md" />
            </div>
            <p className="text-4xl font-black tracking-widest" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>{s.value}</p>
            <p className="text-xs font-bold uppercase mt-2" style={{ color: theme.textMuted }}>{s.label}</p>
            <p className="text-[10px] font-medium mt-1 uppercase" style={{ color: theme.textDim }}>{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-2xl">
          <h3 className="font-extrabold text-2xl mb-6 tracking-wide" style={{fontFamily:'Outfit', color: theme.isDark?'white':'#0f172a'}}>{t('simulator.growthTitle')}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={cd}>
              <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="100%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)"} vertical={false} />
              <XAxis dataKey="age" tick={{fontSize:11,fill:theme.textMuted,fontWeight:'bold'}} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={fmt} tick={{fontSize:11,fill:theme.textMuted,fontWeight:'bold'}} tickLine={false} axisLine={{ stroke: theme.isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.1)' }} />
              <Tooltip formatter={v=>fmt(v)} labelFormatter={l=>`${lang==='hi'?'आयु':'Age'} ${l}`} contentStyle={{borderRadius:16,border:`2px solid ${theme.cardBorder}`,background:theme.sidebar,boxShadow:'0 15px 50px rgba(0,0,0,0.5)',color:theme.isDark?'white':'black',fontWeight:'bold'}} />
              <Area type="monotone" dataKey="corpus" stroke="#10b981" strokeWidth={5} fill="url(#sg)" dot={{r:4, fill: theme.sidebar, stroke: '#10b981', strokeWidth: 2}} activeDot={{r:8,fill:'#10b981',stroke:theme.isDark?'white':'black',strokeWidth:3}} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        
        <Card className="shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Clock size={120} style={{ color: theme.isDark?'white':'black' }} />
          </div>
          <h3 className="font-extrabold text-2xl mb-6 flex items-center gap-3 tracking-wide relative z-10" style={{fontFamily:'Outfit', color: theme.isDark?'white':'black'}}><Clock size={24} className="text-red-400 drop-shadow-md"/> {t('simulator.delayTitle')}</h3>
          <div className="space-y-4 relative z-10">
            {[{y:1,c:d1},{y:3,c:d3},{y:5,c:d5}].map((d,i) => (
              <div key={i} className="p-5 rounded-2xl transition-all hover:scale-105 shadow-md" style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)'}}>
                <div className="flex items-center justify-between font-Outfit">
                  <span className="text-[14px] font-bold text-red-400 tracking-wide uppercase">{t('simulator.wait')} {d.y} {d.y===1?t('simulator.year'):t('simulator.years')}</span>
                  <span className="text-3xl font-black text-red-400 drop-shadow-sm" style={{fontFamily:'Outfit'}}>-{fmt(d.c)}</span>
                </div>
                <div className="mt-3 w-full h-2.5 rounded-full overflow-hidden shadow-inner" style={{background:theme.isDark?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.05)'}}>
                  <div className="h-full rounded-full transition-all duration-[1500ms]" style={{width:`${Math.min((d.c/corpus)*100,100)}%`,background:'linear-gradient(90deg,#ef4444,#f97316)'}} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
