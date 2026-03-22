// components/hero-section.tsx
"use client";

import { BlobAvatar } from "./blob-paths";
import { PaperAirplane } from "./icons";

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 md:pt-32 pb-16 bg-background overflow-hidden relative"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 z-10">
            <div className="flex flex-col items-start">
              <h2 className="text-[28px] md:text-[36px] font-mono font-bold text-foreground mb-1 md:mb-2 tracking-wide">
                Hello!
              </h2>
              <h2 className="text-[32px] md:text-[44px] font-bold text-foreground mb-3 md:mb-4">
                <span className="font-mono">I'm</span>{" "}
                <span className="text-primary border-b-[4px] md:border-b-[6px] border-primary pb-1 inline-block">
                  LE SY THAI,
                </span>
              </h2>
              <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-foreground leading-[1.1] tracking-tight">
                Developer & Photographer
              </h1>
            </div>

            <p className="text-b16-reg md:text-b18-reg text-neutral-04 max-w-[540px] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="flex flex-row gap-4 pt-2">
              <button className="btn-custom btn-m md:btn-l bg-primary text-white hover:brightness-110 min-w-[130px] md:min-w-[160px]">
                Xem dự án
              </button>
              <button className="btn-custom btn-m md:btn-l bg-transparent border-2 border-primary text-primary hover:bg-primary/5 min-w-[130px] md:min-w-[160px]">
                Tải CV
              </button>
            </div>
          </div>

          {/* Right Graphic */}
          <div className="relative w-full max-w-[360px] md:max-w-[480px] aspect-square flex items-center justify-center mx-auto lg:ml-auto mt-12 lg:mt-0">
            {/* Component Avatar Blob */}
            <div className="w-[85%] md:w-[90%] transition-transform duration-700 hover:scale-[1.05]">
              <BlobAvatar
                // Thay đường dẫn này bằng ảnh của bạn nằm trong thư mục `public/`
                // VD: src="/avatar.jpg"
                src="/avatar.jpg"
                alt="Le Sy Thai - Developer & Photographer"
              />
            </div>
            {/* Blue Paper Plane (Custom SVG to match solid design) */}
            <div className="absolute top-[2%] left-[8%] md:top-[0%] md:left-[5%] -rotate-12 animate-bounce duration-3000">
              <PaperAirplane className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            {/* Developer Pill */}
            <div className="absolute top-[18%] left-[-2%] md:top-[15%] md:left-[-8%] bg-primary text-white rounded-full px-5 py-2 md:px-8 md:py-3 shadow-xl -rotate-[8deg] font-medium text-sm md:text-base z-10 transform hover:-translate-y-1 hover:scale-105 transition-all">
              Developer
            </div>

            {/* Decorative Dashed Line */}
            <svg
              className="absolute top-[25%] -right-2 md:-right-8 w-24 h-48 md:w-32 md:h-64 z-0 text-neutral-04"
              viewBox="0 0 100 200"
              fill="none"
            >
              <path
                d="M 10 10 C 60 50, 80 120, 20 180"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <circle
                cx="20"
                cy="180"
                r="3"
                fill="#181C32"
                className="dark:fill-white"
              />
            </svg>

            {/* Photographer Pill */}
            <div className="absolute bottom-[12%] right-[-2%] md:bottom-[8%] md:right-[-6%] bg-card text-primary border-[1.5px] border-primary/30 rounded-full px-5 py-2 md:px-8 md:py-3 shadow-xl rotate-[6deg] font-medium text-sm md:text-base z-10 transform hover:-translate-y-1 hover:scale-105 transition-all">
              Photographer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
