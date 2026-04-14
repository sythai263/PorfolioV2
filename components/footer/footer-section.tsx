'use client'

import { Code2, Facebook, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export function FooterSection() {
  const [email, setEmail] = useState('')
  const [time, setTime] = useState('')
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('footer')

  // Xử lý Local Time và tránh lỗi Hydration của Next.js (SSR)
  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB')) // Format 24h: HH:MM:SS
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8">
          {/* Cột 1: Logo & Form (Rộng nhất) */}
          <div className="md:col-span-6 space-y-6">
            {/* Logo & Tên */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1">
                {/* Thay bằng thẻ <Image /> Logo thực tế của bạn */}
                <div className="w-full h-full rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold text-xs">
                  LOGO
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-widest uppercase">LE SY THAI</h2>
            </div>

            {/* Form */}
            <div className="pt-2">
              <h3 className="text-lg font-bold mb-4">{t('leaveEmail')}</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // bg-neutral-08 giả định là màu xám tối như trong ảnh
                  className="flex-1 bg-neutral-200 dark:bg-[#2A2B36] text-neutral-900 dark:text-white px-5 py-3 rounded-l-full focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-neutral-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white dark:text-neutral-900 font-medium px-6 py-3 rounded-r-full transition-colors whitespace-nowrap"
                >
                  {t('send')}
                </button>
              </form>
            </div>
          </div>

          {/* Cột 2: Navigation / Nội dung chính */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold mb-6">{t('mainContent')}</h3>
            <ul className="space-y-4">
              {['home', 'projects', 'library', 'contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Social Links / Theo dõi tôi */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold mb-6">{t('followMe')}</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white dark:text-neutral-900 group-hover:scale-110 transition-transform">
                    <Facebook className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors">
                    Facebook
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white dark:text-neutral-900 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors">
                    Linkedin
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 group">
                  <div className="w-6 h-6 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {/* Dùng icon Code thay cho VS Code logo hoặc import file SVG của VS code */}
                    <Code2 className="w-6 h-6" />
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors">
                    Visual code
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dòng Copyright & Thời gian */}
        <div className="border-t border-neutral-300 dark:border-neutral-700/50 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <p>{t('copyright')}</p>
          <p className="tabular-nums">
            {t('localTime')} {mounted ? time : '00:00:00'}
          </p>
        </div>
      </div>
    </footer>
  )
}
