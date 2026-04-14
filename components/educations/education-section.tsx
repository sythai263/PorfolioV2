'use client'

import { useGSAP } from '@gsap/react'
import { cn } from '@lib'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { EducationCard } from './education-card'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface EducationSectionProps {
  data?: EducationType[]
}

export function EducationSection({ data = [] }: EducationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('education') // Đảm bảo bạn đã khai báo trong i18n
  const [activeIndex, setActiveIndex] = useState(0)

  // GSAP Animation Logic
  useGSAP(
    () => {
      gsap.fromTo(
        '.education-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
    { dependencies: [data], scope: containerRef },
  )

  // Hàm tính toán index của card đang ở giữa để render Dots
  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollContainer = scrollRef.current
    const centerPoint = scrollContainer.scrollLeft + scrollContainer.clientWidth / 2

    let closestIndex = 0
    let minDistance = Infinity

    // Quét qua các thẻ con để xem thẻ nào gần tâm nhất
    Array.from(scrollContainer.children).forEach((child, index) => {
      const el = child as HTMLElement
      const childCenter = el.offsetLeft + el.clientWidth / 2
      const distance = Math.abs(centerPoint - childCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex)
    }
  }

  return (
    <section
      id="education"
      ref={containerRef}
      className={cn(
        'py-20 md:py-24 overflow-hidden transition-colors duration-500',
        'bg-background',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="mb-10 md:mb-14 space-y-4 text-left md:text-center max-w-2xl md:mx-auto">
          <h2
            className={cn(
              'text-[40px] md:text-[56px] font-bold drop-shadow-sm transition-colors',
              'text-foreground',
            )}
          >
            {t('title') || 'Education'}
          </h2>
          <p className={cn('text-base md:text-lg transition-colors', 'text-muted-foreground')}>
            {t('description') || 'Lorem ipsum dolor sit amet...'}
          </p>
        </div>

        {/* Education List Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            'flex gap-4 pt-4 pb-8',
            // Desktop Layout: 3 columns (dựa theo hình ảnh của bạn)
            'md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 md:pb-12',
            // Mobile Peeking Layout
            '-mx-4 px-[12.5vw] sm:px-[25vw]',
            'md:mx-0 md:px-0',
            // Cuộn ngang & Snap
            'overflow-x-auto overscroll-x-contain snap-x snap-mandatory',
            'md:overflow-visible',
            // Ẩn thanh cuộn
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          )}
        >
          {data.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>

        {/* Dots Indicator (Chỉ hiển thị trên Mobile/Tablet) */}
        {data.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {data.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-2.5 w-2.5 rounded-full transition-all duration-300',
                  activeIndex === index
                    ? 'bg-neutral-400 dark:bg-neutral-300 w-6' // Dấu chấm đang active sẽ dài ra một chút
                    : 'bg-neutral-200 dark:bg-neutral-700',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
