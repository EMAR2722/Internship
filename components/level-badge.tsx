interface LevelBadgeProps {
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export function LevelBadge({ level }: LevelBadgeProps) {
  const baseStyles = 'inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide'
  
  const styleMap = {
    Beginner: `${baseStyles} bg-emerald-100 text-emerald-700`,
    Intermediate: `${baseStyles} bg-blue-100 text-blue-700`,
    Advanced: `${baseStyles} bg-purple-100 text-purple-700`,
  }

  return <span className={styleMap[level]}>{level}</span>
}
