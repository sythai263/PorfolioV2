'use client'
import { TechIconComponent } from '@components'
import { cn } from '@lib'

interface OrbitNodeProps {
  name: string
  icon?: string
  positionStyle?: React.CSSProperties
  gsapClass: string
  sizeClass: string
  isCenter?: boolean
}

export function OrbitNode({
  name,
  icon,
  positionStyle,
  gsapClass,
  sizeClass,
  isCenter,
}: OrbitNodeProps) {
  return (
    <div
      className={cn(gsapClass, 'absolute -translate-x-1/2 -translate-y-1/2', sizeClass)}
      style={positionStyle ? { ...positionStyle } : { top: '50%', left: '50%' }}
    >
      <div className={cn('relative group w-full h-full', isCenter ? 'z-30' : 'z-10')}>
        <div
          className={cn(
            'w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 hover:bg-white/30 transition-colors duration-300 p-1',
            isCenter && 'shadow-[0_0_30px_rgba(255,255,255,0.2)]',
          )}
        >
          {icon ? (
            <TechIconComponent iconName={icon} size="60%" />
          ) : (
            <span className="text-white font-bold text-[10px] sm:text-sm text-center leading-tight">
              {name}
            </span>
          )}
        </div>

        {/* Tooltip */}
        {icon && (
          <div
            className={cn(
              'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50',
              'before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:-mt-1 before:w-2 before:h-2 before:bg-gray-900 before:rotate-45',
            )}
          >
            {name}
          </div>
        )}
      </div>
    </div>
  )
}
