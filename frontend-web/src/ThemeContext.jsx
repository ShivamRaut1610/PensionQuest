import { createContext, useContext, useState } from 'react'

export const THEMES = {
  // ... existing 5 Dark Themes
  darkPurple: {
    id: 'darkPurple', name: 'Cosmic Purple', nameHi: 'कॉस्मिक बैंगनी', emoji: '🔮', isDark: true,
    bg: 'linear-gradient(135deg, #0f0a1e 0%, #1a1040 30%, #0f172a 60%, #0a1628 100%)',
    sidebar: 'rgba(15, 10, 35, 0.88)', sidebarBorder: 'rgba(139,92,246,0.1)',
    card: 'rgba(255,255,255,0.06)', cardBorder: 'rgba(255,255,255,0.08)', cardHover: 'rgba(255,255,255,0.09)',
    accent: '#7c3aed', accentLight: '#a78bfa', accentGlow: 'rgba(139,92,246,0.25)',
    cta: 'linear-gradient(135deg, #f97316, #ea580c)', ctaShadow: 'rgba(249,115,22,0.35)',
    hero: 'linear-gradient(135deg, #581c87 0%, #7c3aed 40%, #a855f7 70%, #c084fc 100%)', heroShadow: 'rgba(124,58,237,0.35)',
    text: '#e2e8f0', textDim: '#94a3b8', textMuted: '#64748b',
    orb1: 'rgba(139,92,246,0.4)', orb2: 'rgba(249,115,22,0.2)', orb3: 'rgba(16,185,129,0.15)',
    chartStroke: '#a78bfa', chartFill: 'rgba(167,139,250,0.3)',
  },
  oceanBlue: {
    id: 'oceanBlue', name: 'Ocean Depths', nameHi: 'सागर गहराई', emoji: '🌊', isDark: true,
    bg: 'linear-gradient(135deg, #0a192f 0%, #0d2137 30%, #112240 60%, #0a192f 100%)',
    sidebar: 'rgba(10, 25, 47, 0.9)', sidebarBorder: 'rgba(59,130,246,0.1)',
    card: 'rgba(255,255,255,0.05)', cardBorder: 'rgba(59,130,246,0.08)', cardHover: 'rgba(59,130,246,0.08)',
    accent: '#3b82f6', accentLight: '#60a5fa', accentGlow: 'rgba(59,130,246,0.25)',
    cta: 'linear-gradient(135deg, #06b6d4, #0891b2)', ctaShadow: 'rgba(6,182,212,0.35)',
    hero: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 40%, #3b82f6 70%, #60a5fa 100%)', heroShadow: 'rgba(37,99,235,0.35)',
    text: '#e2e8f0', textDim: '#94a3b8', textMuted: '#64748b',
    orb1: 'rgba(59,130,246,0.3)', orb2: 'rgba(6,182,212,0.2)', orb3: 'rgba(34,211,238,0.12)',
    chartStroke: '#60a5fa', chartFill: 'rgba(96,165,250,0.3)',
  },
  forestGreen: {
    id: 'forestGreen', name: 'Enchanted Forest', nameHi: 'जादुई जंगल', emoji: '🌿', isDark: true,
    bg: 'linear-gradient(135deg, #0a1f0a 0%, #0f2b1a 30%, #132a13 60%, #0a1f0a 100%)',
    sidebar: 'rgba(10, 31, 10, 0.9)', sidebarBorder: 'rgba(34,197,94,0.1)',
    card: 'rgba(255,255,255,0.05)', cardBorder: 'rgba(34,197,94,0.08)', cardHover: 'rgba(34,197,94,0.08)',
    accent: '#22c55e', accentLight: '#4ade80', accentGlow: 'rgba(34,197,94,0.25)',
    cta: 'linear-gradient(135deg, #f59e0b, #d97706)', ctaShadow: 'rgba(245,158,11,0.35)',
    hero: 'linear-gradient(135deg, #14532d 0%, #166534 40%, #22c55e 70%, #4ade80 100%)', heroShadow: 'rgba(22,101,52,0.35)',
    text: '#e2e8f0', textDim: '#94a3b8', textMuted: '#64748b',
    orb1: 'rgba(34,197,94,0.3)', orb2: 'rgba(245,158,11,0.15)', orb3: 'rgba(16,185,129,0.2)',
    chartStroke: '#4ade80', chartFill: 'rgba(74,222,128,0.3)',
  },
  sunsetWarm: {
    id: 'sunsetWarm', name: 'Golden Sunset', nameHi: 'सुनहरा सूर्यास्त', emoji: '🌅', isDark: true,
    bg: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 30%, #1f0f0f 60%, #150808 100%)',
    sidebar: 'rgba(26, 10, 10, 0.9)', sidebarBorder: 'rgba(239,68,68,0.1)',
    card: 'rgba(255,255,255,0.05)', cardBorder: 'rgba(251,146,60,0.08)', cardHover: 'rgba(251,146,60,0.08)',
    accent: '#f97316', accentLight: '#fb923c', accentGlow: 'rgba(249,115,22,0.25)',
    cta: 'linear-gradient(135deg, #ef4444, #dc2626)', ctaShadow: 'rgba(239,68,68,0.35)',
    hero: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 40%, #f97316 70%, #fbbf24 100%)', heroShadow: 'rgba(234,88,12,0.35)',
    text: '#fef2f2', textDim: '#fca5a5', textMuted: '#b45309',
    orb1: 'rgba(249,115,22,0.3)', orb2: 'rgba(239,68,68,0.2)', orb3: 'rgba(251,191,36,0.15)',
    chartStroke: '#fb923c', chartFill: 'rgba(251,146,60,0.3)',
  },
  midnight: {
    id: 'midnight', name: 'Midnight Noir', nameHi: 'मिडनाइट नोआर', emoji: '🌑', isDark: true,
    bg: 'linear-gradient(135deg, #09090b 0%, #18181b 30%, #0f0f12 60%, #09090b 100%)',
    sidebar: 'rgba(9, 9, 11, 0.95)', sidebarBorder: 'rgba(161,161,170,0.08)',
    card: 'rgba(255,255,255,0.04)', cardBorder: 'rgba(255,255,255,0.06)', cardHover: 'rgba(255,255,255,0.07)',
    accent: '#a1a1aa', accentLight: '#d4d4d8', accentGlow: 'rgba(161,161,170,0.2)',
    cta: 'linear-gradient(135deg, #fafafa, #e4e4e7)', ctaShadow: 'rgba(250,250,250,0.2)',
    hero: 'linear-gradient(135deg, #27272a 0%, #3f3f46 40%, #52525b 70%, #71717a 100%)', heroShadow: 'rgba(63,63,70,0.35)',
    text: '#fafafa', textDim: '#a1a1aa', textMuted: '#71717a',
    orb1: 'rgba(250,250,250,0.05)', orb2: 'rgba(161,161,170,0.06)', orb3: 'rgba(113,113,122,0.08)',
    chartStroke: '#d4d4d8', chartFill: 'rgba(212,212,216,0.2)',
  },
  // NEW LIGHT MODE
  lightMode: {
    id: 'lightMode', name: 'Bright Daylight', nameHi: 'उज्ज्वल दिन', emoji: '☀️', isDark: false,
    bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 100%)',
    sidebar: 'rgba(255, 255, 255, 0.95)', sidebarBorder: 'rgba(0,0,0,0.08)',
    card: 'rgba(255,255,255,0.85)', cardBorder: 'rgba(0,0,0,0.05)', cardHover: 'rgba(255,255,255,1)',
    accent: '#6366f1', accentLight: '#818cf8', accentGlow: 'rgba(99,102,241,0.2)',
    cta: 'linear-gradient(135deg, #f97316, #ea580c)', ctaShadow: 'rgba(249,115,22,0.25)',
    hero: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #818cf8 70%, #a5b4fc 100%)', heroShadow: 'rgba(99,102,241,0.25)',
    text: '#0f172a', textDim: '#475569', textMuted: '#64748b',
    orb1: 'rgba(99,102,241,0.15)', orb2: 'rgba(249,115,22,0.1)', orb3: 'rgba(16,185,129,0.1)',
    chartStroke: '#6366f1', chartFill: 'rgba(99,102,241,0.2)',
  }
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('darkPurple')
  const theme = THEMES[themeId]
  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
