import { TrendingUp, Zap, Target, Award, Flame, BookOpen, Calculator, IndianRupee, Sparkles, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const growthData = [
  { age: 25, corpus: 0 }, { age: 30, corpus: 95000 }, { age: 35, corpus: 280000 },
  { age: 40, corpus: 620000 }, { age: 45, corpus: 1200000 }, { age: 50, corpus: 2100000 },
  { age: 55, corpus: 3500000 }, { age: 60, corpus: 5800000 },
]
const fmt = (v) => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}K`

const BADGES = [
  { name: 'First Quest', nameHi: 'पहला क्वेस्ट', icon: '🎯', unlocked: true },
  { name: 'Streak 7', nameHi: 'स्ट्रीक 7', icon: '🔥', unlocked: true },
  { name: 'NPS Scholar', nameHi: 'NPS विद्वान', icon: '📚', unlocked: true },
  { name: 'First Step', nameHi: 'पहला कदम', icon: '💰', unlocked: false },
  { name: 'Saver 5K', nameHi: 'बचतकर्ता 5K', icon: '🏦', unlocked: false },
]

const QUESTS = [
  { title: 'Tax Benefits of NPS', titleHi: 'NPS के कर लाभ', diff: 'Intermediate', diffHi: 'मध्यम', xp: 150 },
  { title: 'NPS Maturity Rules', titleHi: 'NPS परिपक्वता नियम', diff: 'Intermediate', diffHi: 'मध्यम', xp: 150 },
  { title: 'Auto Choice Strategy', titleHi: 'ऑटो चॉइस रणनीति', diff: 'Advanced', diffHi: 'उन्नत', xp: 250 },
]

const AVATAR_STATES = [
  { emoji: '😰', label: 'Critical', pct: 20, color: '#ef4444' },
  { emoji: '😟', label: 'Struggling', pct: 40, color: '#f97316' },
  { emoji: '😊', label: 'Stable', pct: 65, color: '#10b981' },
  { emoji: '🤩', label: 'Thriving', pct: 90, color: '#8b5cf6' },
]

export default function Dashboard() {
  const { lang, t } = useLang()
  const { theme } = useTheme()
  const avatar = AVATAR_STATES[2] // stable

  return (
    <div className="space-y-6">
      {/* Hero with Daily Task Card */}
      <div className="relative overflow-hidden rounded-3xl p-8 shadow-2xl transition-all duration-700" 
           style={{ background: theme.hero, boxShadow: `0 25px 80px ${theme.heroShadow}` }}>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${theme.accentLight}33, transparent 60%)`, transform: 'translate(-30%, 40%)' }} />
        <div className="absolute top-8 right-12 text-6xl opacity-20 animate-float select-none">🏆</div>
        <div className="absolute bottom-4 right-32 text-4xl opacity-10 animate-float select-none" style={{ animationDelay: '1s' }}>💎</div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em]">{lang === 'hi' ? 'स्तर' : 'Level'} 3 — {lang === 'hi' ? 'NPS जागरूक' : 'NPS Aware'}</span>
            </div>
            <p className="text-white/80 text-sm font-medium" style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '18px' }}>{t('dashboard.welcome')}</p>
            <h2 className="text-5xl font-extrabold text-white mt-1 drop-shadow-md" style={{ fontFamily: 'Outfit' }}>Shivam 👋</h2>
            <p className="text-white/70 mt-3 text-sm max-w-md font-medium">{t('dashboard.heroSub')}</p>
            <div className="flex gap-4 mt-6">
              <Link to="/path" className="btn-primary flex items-center gap-2 font-black tracking-wide" style={{ background: 'white', color: theme.accent, boxShadow: `0 4px 15px rgba(255,255,255,0.3)` }}>
                <Target size={15} /> {lang === 'hi' ? 'यात्रा जारी रखें' : 'Continue Journey'}
              </Link>
            </div>
          </div>

          {/* Daily Task Progress */}
          <div className="rounded-2xl p-5 min-w-[260px] transform hover:scale-105 transition-all" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner" style={{ background: theme.cta }}>📋</div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'Outfit' }}>{lang === 'hi' ? 'दैनिक कार्य' : 'Daily Task'}</p>
                <p className="text-white/70 text-xs font-semibold">10 {lang === 'hi' ? 'क्वेस्ट' : 'Quests'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-white mb-2 font-bold">
              <span>{lang === 'hi' ? 'प्रगति' : 'Progress'}</span>
              <span>2/10</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden border border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="h-full rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: '20%', background: theme.cta }}>
                <div className="shimmer absolute inset-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('dashboard.statLabels.totalXp'), value: '2,450', icon: Zap, gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)', glow: 'rgba(251,191,36,0.15)', change: `+150 ${t('dashboard.today')}` },
          { label: t('dashboard.statLabels.level'), value: '3', icon: TrendingUp, gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)', glow: 'rgba(99,102,241,0.15)', change: lang === 'hi' ? 'NPS जागरूक' : 'NPS Aware' },
          { label: t('dashboard.statLabels.streak'), value: '7', icon: Flame, gradient: 'linear-gradient(135deg, #fb923c, #ea580c)', glow: 'rgba(249,115,22,0.15)', change: '🔥' },
          { label: t('dashboard.statLabels.badges'), value: '3/15', icon: Award, gradient: 'linear-gradient(135deg, #34d399, #059669)', glow: 'rgba(16,185,129,0.15)', change: lang === 'hi' ? '12 और' : '12 more' },
        ].map((s, i) => (
          <Card key={i} hover={true} className="group cursor-default animate-slide-up" style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-12" style={{ background: s.gradient, boxShadow: `0 6px 20px ${s.glow}` }}>
                <s.icon size={20} className="text-white drop-shadow-md" />
              </div>
              <ArrowUpRight size={16} style={{ color: theme.textMuted }} className={`transition-all ${theme.isDark ? 'group-hover:text-white' : 'group-hover:text-black'}`} />
            </div>
            <p className="text-4xl font-extrabold" style={{ fontFamily: 'Outfit' }}>{s.value}</p>
            <p className="text-xs mt-1 font-semibold uppercase tracking-wider" style={{ color: theme.textDim }}>{s.label}</p>
            <p className="text-[10px] font-bold mt-1.5 flex items-center gap-1" style={{ color: theme.isDark ? '#34d399' : '#059669' }}>↑ {s.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-extrabold text-xl tracking-wide" style={{ fontFamily: 'Outfit' }}>{t('dashboard.projected')}</h3>
                <p className="text-xs font-medium mt-1" style={{ color: theme.textDim }}>₹3,000/{lang === 'hi' ? 'माह' : 'mo'} • 10% {t('dashboard.returns')}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-extrabold" style={{ color: theme.accent, fontFamily: 'Outfit', textShadow: `0 0 20px ${theme.accentGlow}` }}>₹58L</p>
                <p className="text-xs font-bold" style={{ color: theme.textMuted }}>{t('dashboard.atAge')}</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.chartStroke} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={theme.chartStroke} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
                <XAxis dataKey="age" tick={{ fontSize: 10, fill: theme.textMuted, fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: theme.textMuted, fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                <Tooltip formatter={v => fmt(v)} labelFormatter={l => `${lang === 'hi' ? 'आयु' : 'Age'} ${l}`} contentStyle={{ borderRadius: 16, border: `1px solid ${theme.cardBorder}`, background: theme.sidebar, color: theme.isDark ? 'white' : 'black', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="corpus" stroke={theme.chartStroke} strokeWidth={4} fill="url(#chartGradient)" dot={{ r: 4, fill: theme.sidebar, stroke: theme.chartStroke, strokeWidth: 2 }} activeDot={{ r: 8, fill: theme.chartStroke, stroke: theme.isDark?'white':'black', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Avatar / Level Indicator */}
        <Card className="lg:col-span-2 text-center flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 transition-colors duration-700" style={{ background: `radial-gradient(circle at 50% 40%, ${theme.accentGlow}, transparent 70%)` }} />
          
          <div className="flex justify-center gap-3 mb-6 relative z-10 w-full px-4">
            {AVATAR_STATES.map((a, i) => (
              <div key={i} className={`flex-1 max-w-[48px] aspect-square rounded-2xl flex items-center justify-center text-xl transition-all duration-500 transform ${
                i <= 2 ? (i === 2 ? 'scale-110 -translate-y-2 relative' : '') : 'opacity-30 grayscale scale-90'
              }`} style={i <= 2 ? { background: `${a.color}20`, border: `2px solid ${a.color}60`, boxShadow: i === 2 ? `0 10px 25px ${a.color}40` : 'none' } : { background: theme.isDark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)', border: theme.isDark?'2px solid rgba(255,255,255,0.05)':'2px solid rgba(0,0,0,0.05)' }}>
                {i <= 2 ? a.emoji : '🔒'}
                {i === 2 && <div className="absolute -bottom-6 text-[10px] font-bold tracking-widest uppercase scale-90 origin-top" style={{ color: theme.isDark?'white':theme.text }}>{a.label}</div>}
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-4">
            <div className="w-28 h-28 rounded-full flex items-center justify-center border-4 animate-pulse-glow" style={{ background: theme.sidebar, borderColor: theme.accent, boxShadow: `0 0 40px ${theme.accentGlow}` }}>
               <div className="w-full h-full bg-no-repeat bg-cover transition-all duration-700 filter" 
                    style={{ backgroundImage: `url('/images/level_characters.png')`, backgroundPosition: `50% center`, backgroundSize: '400% 100%', transform: 'scale(1.2)' }} />
            </div>
          </div>

          <h3 className="font-extrabold text-xl mt-6 relative z-10" style={{ fontFamily: 'Playfair Display', fontStyle: 'italic' }}>{t('dashboard.futureTitle')}</h3>
          
          <div className="mt-5 w-full rounded-full h-3 overflow-hidden border relative z-10" style={{ background: theme.isDark?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.05)', borderColor: theme.cardBorder }}>
            <div className="h-full rounded-full relative overflow-hidden transition-all duration-1000" style={{ width: '65%', background: theme.cta }}>
              <div className="shimmer absolute inset-0" />
            </div>
          </div>
          <p className="text-[10px] font-bold mt-2 uppercase tracking-widest relative z-10" style={{ color: theme.textDim }}>65% {lang === 'hi' ? 'अनुशंसित का' : 'of recommended'}</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quests */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-lg flex items-center gap-2 tracking-wide" style={{ fontFamily: 'Outfit' }}>
              <BookOpen size={20} style={{ color: theme.accent }} /> {t('dashboard.upcomingQuests')}
            </h3>
            <Link to="/quests" className="text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: theme.accent }}>
              {t('common.viewAll')} <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {QUESTS.map((q, i) => (
              <Link to="/quests" key={i} className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg" 
                    style={{ background: theme.isDark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.02)', border: `1px solid ${theme.cardBorder}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white transition-transform group-hover:rotate-12 shadow-inner" 
                     style={{ background: theme.accent, border: `2px solid ${theme.accentLight}` }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: theme.isDark?'white':theme.text }}>{lang === 'hi' ? q.titleHi : q.title}</p>
                  <p className="text-[10px] uppercase font-bold mt-1 tracking-wider" style={{ color: theme.textMuted }}>{lang === 'hi' ? q.diffHi : q.diff}</p>
                </div>
                <span className="px-3.5 py-1.5 rounded-xl text-[10px] font-black shadow-sm" 
                      style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))', color: theme.isDark?'#fbbf24':'#b45309', border: '1px solid rgba(251,191,36,0.2)' }}>
                  +{q.xp} XP
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* Badges Image Box */}
        <Card className="text-center">
           <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-lg flex items-center gap-2 tracking-wide" style={{ fontFamily: 'Outfit' }}>
              <Award size={20} className="text-amber-500" /> {t('dashboard.yourBadges')}
            </h3>
            <Link to="/profile" className="text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: theme.accent }}>
              {t('common.viewAll')} <ChevronRight size={14} />
            </Link>
          </div>
          {/* using the generated badges artwork */}
          <div className="w-full relative rounded-2xl overflow-hidden mt-4 group cursor-pointer border-2" style={{ borderColor: theme.cardBorder }}>
            <img src="/images/achievement_badges.png" alt="Badges" className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110" />
            <div className={`absolute inset-0 bg-gradient-to-t ${theme.isDark ? 'from-[#0f0a1e]' : 'from-[#f1f5f9]'} via-transparent opacity-80`} />
            <div className="absolute bottom-4 left-0 right-0 z-10 px-4">
              <div className="p-3 rounded-2xl flex items-center justify-center gap-2" style={{ background: theme.isDark?'rgba(251,191,36,0.15)':'rgba(251,191,36,0.25)', backdropFilter: 'blur(10px)', border: '1px solid rgba(251,191,36,0.4)' }}>
                <IndianRupee size={15} style={{ color: theme.isDark?'#fbbf24':'#b45309' }} className="shrink-0" />
                <p className="text-xs font-bold drop-shadow-md" style={{ color: theme.isDark?'#fde68a':'#78350f' }}>
                  <span className="mr-1" style={{ color: theme.isDark?'white':'#451a03' }}>{t('dashboard.nextBadge')}</span> 
                  {lang === 'hi' ? 'पहला NPS योगदान' : 'First NPS contribution'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
