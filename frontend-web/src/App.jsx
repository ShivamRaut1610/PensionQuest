import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Home, BookOpen, Calculator, MessageCircle, Trophy, User, Menu, X, Globe, Wallet, Map } from 'lucide-react'
import { LangProvider, useLang } from './LangContext'
import { ThemeProvider, useTheme } from './ThemeContext'
import Dashboard from './pages/Dashboard'
import Quests from './pages/Quests'
import QuestPath from './pages/QuestPath'
import Simulator from './pages/Simulator'
import AICoach from './pages/AICoach'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Contributions from './pages/Contributions'

function AppContent() {
  const [mob, setMob] = useState(false)
  const { lang, setLang, t } = useLang()
  const { theme, themes, setThemeId, themeId } = useTheme()

  const NAV = [
    { path: '/', label: t('nav.dashboard'), icon: Home },
    { path: '/quests', label: t('nav.quests'), icon: BookOpen },
    { path: '/path', label: lang === 'hi' ? 'यात्रा' : 'Journey', icon: Map },
    { path: '/simulator', label: t('nav.simulator'), icon: Calculator },
    { path: '/coach', label: t('nav.coach'), icon: MessageCircle },
    { path: '/contributions', label: t('nav.contributions'), icon: Wallet },
    { path: '/leaderboard', label: t('nav.leaderboard'), icon: Trophy },
    { path: '/profile', label: t('nav.profile'), icon: User },
  ]

  // Apply theme globals (like Selection color and CSS variables)
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', theme.accent)
    document.documentElement.style.background = theme.bg
  }, [theme])

  return (
    <Router>
      <div className="min-h-screen relative transition-colors duration-700 font-sans" style={{ background: theme.bg }}>
        {/* Ambient orbs */}
        <div className="bg-orb w-[500px] h-[500px] -top-40 -left-40 transition-colors duration-700" style={{ background: `radial-gradient(circle, ${theme.orb1}, transparent 70%)` }} />
        <div className="bg-orb w-[400px] h-[400px] top-1/2 -right-40 transition-colors duration-700" style={{ background: `radial-gradient(circle, ${theme.orb2}, transparent 70%)` }} />
        <div className="bg-orb w-[300px] h-[300px] bottom-20 left-1/3 transition-colors duration-700" style={{ background: `radial-gradient(circle, ${theme.orb3}, transparent 70%)` }} />

        {mob && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMob(false)} />}

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-[260px] z-50 transform transition-all duration-500 lg:translate-x-0 ${mob ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ background: theme.sidebar, backdropFilter: 'blur(30px)', borderRight: `1px solid ${theme.sidebarBorder}` }}>
          
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden transition-all duration-700"
              style={{ background: theme.cta, boxShadow: `0 8px 30px ${theme.ctaShadow}` }}>
              <span className="text-white text-xl font-black font-[Outfit]">P</span>
              <div className="absolute inset-0 shimmer" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Handjet', color: theme.isDark ? '#fff' : '#0f172a' }}>PensionQuest</h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em]" style={{ color: theme.accent }}>Gamified NPS</p>
            </div>
          </div>

          <nav className="mt-2 px-4 space-y-1.5 overflow-y-auto" style={{ height: 'calc(100vh - 280px)' }}>
            {NAV.map((item, i) => (
              <NavLink key={item.path} to={item.path} onClick={() => setMob(false)} end={item.path === '/'}
                className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] font-bold transition-all duration-300 group relative overflow-hidden ${
                  isActive ? 'shadow-lg' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                style={({ isActive }) => isActive ? {
                  background: theme.accentGlow,
                  color: theme.isDark ? '#fff' : theme.accent,
                  boxShadow: `0 4px 20px ${theme.accentGlow}`,
                  border: `1px solid ${theme.sidebarBorder}`,
                  fontFamily: 'Caveat', fontSize: '18px' // Fun font for active nav
                } : { fontFamily: 'Inter', color: theme.textMuted }}>
                {({ isActive }) => (
                  <>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 rounded-r-full transition-colors duration-700" style={{ background: theme.accentLight }} />}
                    <item.icon size={18} className={`transition-all duration-300 ${isActive ? 'text-white' : 'group-hover:scale-110 group-hover:text-white'}`} style={isActive ? { color: theme.accentLight } : {}} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Theme & Language Controls */}
          <div className="absolute bottom-6 left-4 right-4 space-y-3">
            {/* Theme Swatches */}
            <div className="flex justify-between px-2">
              {Object.values(themes).map(t => (
                <button key={t.id} onClick={() => setThemeId(t.id)} title={lang === 'hi' ? t.nameHi : t.name}
                  className={`w-6 h-6 rounded-full transition-transform hover:scale-125 ${themeId === t.id ? 'ring-2 ring-white scale-125' : 'opacity-50 hover:opacity-100'}`}
                  style={{ background: t.accent, boxShadow: themeId === t.id ? `0 0 15px ${t.accent}` : 'none' }}>
                </button>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="p-1 rounded-2xl flex" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setLang('en')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                lang === 'en' ? 'text-white shadow-md' : 'text-slate-500 hover:text-white'}`}
                style={lang === 'en' ? { background: theme.accentGlow, boxShadow: `0 2px 10px ${theme.accentGlow}` } : {}}>
                EN
              </button>
              <button onClick={() => setLang('hi')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                lang === 'hi' ? 'text-white shadow-md' : 'text-slate-500 hover:text-white'}`}
                style={lang === 'hi' ? { background: theme.accentGlow, boxShadow: `0 2px 10px ${theme.accentGlow}` } : {}}>
                हिंदी
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="lg:ml-[260px] min-h-screen relative flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between" style={{ background: `rgba(${theme.sidebar.match(/rgba?\((\d+,\s*\d+,\s*\d+)/)[1]}, 0.6)`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${theme.sidebarBorder}` }}>
            <button className="lg:hidden p-2.5 rounded-xl transition-all" onClick={() => setMob(true)} style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Menu size={20} className="text-slate-300" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24', fontFamily: 'Outfit' }}>
                ⭐ 2,450 XP
              </div>
              <div className="px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.08))', border: '1px solid rgba(249,115,22,0.2)', color: '#fb923c', fontFamily: 'Outfit' }}>
                🔥 7 {t('common.streak')}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                <span className="text-lg drop-shadow-md">{theme.emoji}</span>
                <span className="text-xs font-bold hidden sm:block" style={{ color: theme.accent, fontFamily: 'Outfit' }}>{lang === 'hi' ? theme.nameHi : theme.name}</span>
              </div>
              {/* Avatar */}
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-lg font-black relative overflow-hidden transition-all duration-700 cursor-pointer hover:scale-105" style={{ background: theme.accent, boxShadow: `0 4px 20px ${theme.accentGlow}`, fontFamily: 'Outfit' }}>
                S
                <div className="absolute inset-0 shimmer" />
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2" style={{ borderColor: theme.sidebar }} />
              </div>
            </div>
          </header>

          <main className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/path" element={<QuestPath />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/coach" element={<AICoach />} />
              <Route path="/contributions" element={<Contributions />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default function App() {
  return (
    <LangProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LangProvider>
  )
}
