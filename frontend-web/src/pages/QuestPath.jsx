import { useState, useEffect } from 'react'
import { Map, Star, ChevronRight, Check } from 'lucide-react'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import Card from '../components/Card'

const STAGES = [
  { id: 1, title: 'Seed of Savings', titleHi: 'बचत का बीज', desc: 'Start your NPS journey', descHi: 'अपनी NPS यात्रा शुरू करें', img: '0' },
  { id: 2, title: 'Growing Sprout', titleHi: 'बढ़ता अंकुर', desc: 'First contribution made', descHi: 'पहला योगदान किया', img: '1' },
  { id: 3, title: 'Strong Sapling', titleHi: 'मजबूत पौधा', desc: 'Understanding tax benefits', descHi: 'कर लाभ को समझना', img: '2' },
  { id: 4, title: 'Golden Tree', titleHi: 'सुनहरा पेड़', desc: 'Mastering asset allocation', descHi: 'परिसंपत्ति आवंटन में महारत', img: '3' },
  { id: 5, title: 'Diamond Forest', titleHi: 'हीरा जंगल', desc: 'Retirement readiness', descHi: 'सेवानिवृत्ति की तैयारी', img: '4' },
]

export default function QuestPath() {
  const { lang, t } = useLang()
  const { theme } = useTheme()
  const [activeStage] = useState(3) // Example progress

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-2" style={{ fontFamily: 'Handjet', color: theme.isDark?'white':'#0f172a' }}>{lang === 'hi' ? 'आपकी NPS यात्रा' : 'Your NPS Journey'}</h2>
        <p className="text-sm" style={{ color: theme.textDim }}>{lang === 'hi' ? 'स्तरों के माध्यम से प्रगति करें और अपने पात्र को विकसित करें!' : 'Progress through levels and evolve your character!'}</p>
      </div>

      <div className="relative">
        {/* Winding path line connecting the stages */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 opacity-30 z-0 hidden md:block"
             style={{ background: `linear-gradient(to bottom, ${theme.accentLight}, transparent)`, borderRadius: '20px', filter: 'blur(5px)' }} />

        <div className="space-y-24 md:space-y-32">
          {STAGES.map((s, i) => {
            const isUnlocked = s.id <= activeStage
            const isCurrent = s.id === activeStage
            const alignment = i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            
            return (
              <div key={s.id} className={`flex flex-col ${alignment} items-center gap-8 relative z-10 w-full animate-slide-up`}
                   style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}>
                
                {/* Character/Icon Side */}
                <div className="flex-1 flex justify-center transform transition-transform duration-500 hover:scale-110">
                  <div className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center overflow-hidden
                    ${!isUnlocked ? 'opacity-40 grayscale' : 'shadow-2xl'}`}
                    style={isUnlocked ? { 
                      background: theme.card, 
                      border: `4px solid ${isCurrent ? theme.accentLight : theme.cardBorder}`,
                      boxShadow: isCurrent ? `0 0 50px ${theme.accentGlow}` : `0 10px 30px rgba(0,0,0,0.5)`
                    } : { background: 'rgba(255,255,255,0.02)', border: '4px dashed rgba(255,255,255,0.1)' }}>
                    
                    {/* Placeholder for Character Image - Adjust backgroundPosition to show sprites */}
                    <div className="absolute inset-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)' }}>
                      <div className="w-full h-full bg-no-repeat bg-cover transition-all duration-700" 
                           style={{ 
                             backgroundImage: `url('/images/level_characters.png')`,
                             backgroundPosition: `${s.img * 25}% center`,
                             backgroundSize: 'cover',
                             filter: isCurrent ? 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' : 'none'
                           }} />
                    </div>

                    {isUnlocked && !isCurrent && (
                       <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white border-2"
                            style={{ background: '#10b981', borderColor: theme.sidebar }}>
                         <Check size={20} />
                       </div>
                    )}
                    {isCurrent && (
                       <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full animate-bounce shadow-xl font-bold text-[10px]"
                            style={{ background: theme.cta, color: 'white' }}>
                         {lang === 'hi' ? 'सक्रिय' : 'ACTIVE'}
                       </div>
                    )}
                  </div>
                </div>

                {/* Path node center (desktop only) */}
                <div className="hidden md:flex w-16 justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 z-20 ${isUnlocked ? 'animate-pulse' : ''}`}
                       style={{ 
                         background: isUnlocked ? theme.accent : theme.sidebar, 
                         borderColor: isCurrent ? theme.accentLight : isUnlocked ? theme.accent : theme.cardBorder,
                         boxShadow: isUnlocked ? `0 0 20px ${theme.accentGlow}` : 'none'
                       }} />
                </div>

                {/* Details Side */}
                <Card className={`flex-1 w-full max-w-sm p-6 rounded-3xl transition-all duration-300 ${isCurrent ? 'scale-105' : ''}`}
                     style={{ 
                       border: `1px solid ${isCurrent ? theme.accent : theme.cardBorder}`,
                       boxShadow: isCurrent ? `0 20px 50px ${theme.accentGlow}` : 'none'
                     }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-xl text-xs font-black shadow-inner"
                          style={{ background: theme.isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.05)', color: isUnlocked ? theme.accentLight : theme.textDim, fontFamily: 'Outfit' }}>
                      {lang === 'hi' ? 'स्तर' : 'Level'} {s.id}
                    </span>
                    <h3 className="text-xl font-extrabold" style={{ fontFamily: 'Playfair Display', color: theme.isDark?'white':'#0f172a' }}>
                      {lang === 'hi' ? s.titleHi : s.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium mb-5" style={{ color: theme.textDim, fontFamily: 'Inter' }}>
                    {lang === 'hi' ? s.descHi : s.desc}
                  </p>

                  <div className="space-y-2">
                    {/* Mock sub-quests for the stage */}
                    {[1, 2, 3].map(q => {
                      const qDone = s.id < activeStage || (s.id === activeStage && q <= 2);
                      return (
                        <div key={q} className="flex items-center justify-between p-3 rounded-2xl"
                             style={{ background: qDone ? 'rgba(16,185,129,0.1)' : theme.isDark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)' }}>
                          <span className="text-xs font-bold flex items-center gap-2" 
                                style={{ color: qDone ? (theme.isDark?'#34d399':'#059669') : theme.textMuted }}>
                            {qDone ? <Check size={14} /> : <Star size={14} />} 
                            {lang === 'hi' ? `कार्य ${q}` : `Task ${q}`}
                          </span>
                          {qDone ? (
                            <span className="text-[10px] text-emerald-500 font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(16,185,129,0.2)' }}>+50 XP</span>
                          ) : (
                            isCurrent && q === 3 ? (
                              <button className="px-3 py-1 rounded-xl text-[10px] font-black shadow-md transition-all hover:scale-105 hover:-translate-y-0.5" 
                                      style={{ background: theme.cta, color: 'white' }}>
                                {lang === 'hi' ? 'खेलें' : 'PLAY'}
                              </button>
                            ) : null
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

