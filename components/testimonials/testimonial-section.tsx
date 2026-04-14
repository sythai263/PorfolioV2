'use client'

import { TestimonialType } from '@app-types'
import { useGSAP } from '@gsap/react'
import { cn } from '@lib'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { TestimonialCard } from './testimonial-card'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TestimonialSectionProps {
  data?: TestimonialType[]
}

export function TestimonialSection({ data = [] }: TestimonialSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('testimonials') // Cần khai báo file i18n cho Testimonials

  // GSAP Animation Logic
  useGSAP(
    () => {
      gsap.fromTo(
        '.testimonial-card',
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

  return (
    <section
      id="testimonials"
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
            {t('title') || 'Testimonials'}
          </h2>
          <p className={cn('text-base md:text-lg transition-colors', 'text-muted-foreground')}>
            {t('description') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
          </p>
        </div>

        {/* Testimonials List Container */}
        <div
          className={cn(
            'flex gap-4 pt-4 pb-8',
            // Desktop Layout: 3 Columns
            'md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 md:pb-12',
            // Mobile Peeking Layout
            '-mx-4 px-[12.5vw] sm:px-[25vw]',
            'md:mx-0 md:px-0',
            // Khóa cuộn ngang & Snap
            'overflow-x-auto overscroll-x-contain snap-x snap-mandatory',
            'md:overflow-visible',
            // Ẩn thanh scrollbar
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          )}
        >
          {data.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
