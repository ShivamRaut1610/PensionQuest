import { useTheme } from '../ThemeContext'

export default function Card({ children, className = '', hover = false, style = {}, onClick, ...props }) {
  const { theme } = useTheme()
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-3xl p-6 transition-all duration-300 relative overflow-hidden backdrop-blur-md ${hover ? 'hover:scale-[1.02] hover:shadow-2xl hover:z-10 cursor-pointer' : ''} shadow-xl ${className}`}
      style={{
        background: theme.card,
        border: `2px solid ${theme.cardBorder}`,
        color: theme.isDark ? '#ffffff' : '#0f172a',
        ...style
      }}
      {...props}
    >
      {/* Subtle shine effect on cards */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
