'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Mail, Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { IndividualLogo } from './icons'
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

gsap.registerPlugin(useGSAP)

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const t = useTranslations('navigation')

  const navLinks = [
    { key: 'home', label: t('home') },
    { key: 'about', label: t('about') },
    { key: 'projects', label: t('projects') },
    { key: 'experience', label: t('experience') },
    { key: 'contact', label: t('contact') },
  ]

  // UX Chuẩn: Khóa cuộn trang (scroll) khi Menu đang mở (chỉ trên mobile)
  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Logic GSAP cho Desktop Sliding Pill (Menu ở giữa)
  const desktopBtnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const desktopPillRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const activeIndex = navLinks.findIndex((link) => link.key === activeTab)
      const activeBtn = desktopBtnRefs.current[activeIndex]

      // Chỉ chạy nếu nút active và cục pill tồn tại (trong màn Desktop)
      if (activeBtn && desktopPillRef.current && window.innerWidth >= 768) {
        gsap.to(desktopPillRef.current, {
          x: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.inOut', // Trượt nhẹ như "lụa"
        })
      }
    },
    { dependencies: [activeTab], scope: desktopPillRef },
  )

  return (
    <>
      {/* ================= FIXED HEADER BAR (Luôn nằm trên cùng) ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24 gap-6">
            {/* --- TRÁI: LOGO (Flex-shrink-0 để 2 bên tự co giãn) --- */}
            <div className="flex-shrink-0 cursor-pointer">
              {/* Chỗ này bạn hãy thay thẻ div bằng ảnh thật <img src="/logo.png" /> */}
              <IndividualLogo />
            </div>

            {/* --- GIỮA: SEGMENTED NAV LINKS (CHỈ HIỆN TRÊN DESKTOP, md:) --- */}
            <div className="hidden md:flex flex-none items-center bg-muted p-1.5 rounded-pill shadow-inner transition-colors relative">
              {/* Cục nền trượt chìm bên dưới */}
              <div
                ref={desktopPillRef}
                className="absolute top-1.5 bottom-1.5 rounded-pill bg-[#FFF4E0] dark:bg-primary/20 shadow-sm opacity-0"
              />
              {/* Các nút bấm */}
              {navLinks.slice(0, 3).map((link, index) => (
                <button
                  key={link.key}
                  ref={(el) => {
                    desktopBtnRefs.current[index] = el
                  }}
                  onClick={() => setActiveTab(link.key)}
                  className={`relative z-10 px-8 py-2.5 rounded-pill text-b16-semi transition-colors duration-300 ${
                    activeTab === link.key
                      ? 'text-primary'
                      : 'text-neutral-03 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* --- PHẢI: ACTIONS (LanguageSwitcher + ThemeToggle + Mail <ẩn trên mob> + Hamburger <hiện trên mob>) --- */}
            <div className="flex items-center justify-end gap-4 md:gap-6">
              {/* Nút LanguageSwitcher */}
              <LanguageSwitcher />

              {/* Nút ThemeToggle (Responsive trong lõi) */}
              <ThemeToggle />

              {/* Nút Mail (Chỉ hiện trên Desktop, ẩn trên Mobile) */}
              <button className="hidden md:flex w-12 h-12 rounded-full items-center justify-center transition-all bg-[#FFF4E0] dark:bg-primary/20 text-primary hover:bg-primary/20 shadow-sm shrink-0">
                <Mail size={20} fill="currentColor" />
              </button>

              {/* Nút Hamburger (Chỉ hiện trên Mobile, ẩn trên Desktop md:) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-foreground hover:text-primary transition-colors shrink-0"
                aria-label="Toggle Menu"
              >
                {/* Thiết kế nút Hamburger to và dày hơn icon X để khớp Figma */}
                {isMenuOpen ? (
                  <X size={32} strokeWidth={1.5} />
                ) : (
                  <Menu size={32} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= FULL-SCREEN MOBILE MENU OVERLAY (CHỈ CHO MOBILE, md:hidden) ================= */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-300 ease-in-out md:hidden flex flex-col ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Lùi xuống một khoảng bằng chiều cao của Header Mobile */}
        <div className="flex flex-col h-full pt-28 px-6 max-w-[1440px] w-full mx-auto">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => {
                  setActiveTab(link.key)
                  setIsMenuOpen(false) // Bấm xong thì đóng Menu
                }}
                // Sử dụng text-t1 (size 32px-48px) và font-bold, màu cam đậm
                className={`text-left text-t1 font-bold transition-all duration-300 uppercase tracking-tight ${
                  activeTab === link.key
                    ? 'text-primary translate-x-2'
                    : 'text-primary/70 hover:text-primary hover:translate-x-2'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
