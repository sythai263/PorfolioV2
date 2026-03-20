"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

// Đảm bảo đường dẫn import đúng với project của bạn
import {
  CloudDarkDesktop,
  CloudDarkMobile,
  CloudLightDesktop,
  CloudLightMobile,
  MoonDesktop,
  MoonMobile,
  SunDesktop,
  SunMobile,
} from "./icons"; // <-- Cập nhật đường dẫn này

gsap.registerPlugin(useGSAP);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ref để GSAP điều khiển cục Thumb
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";

  // GSAP Animation cho cục Thumb: Chậm rãi và nhẹ nhàng (Chuẩn power3.inOut)
  useGSAP(
    () => {
      if (!mounted) return;

      gsap.to(thumbRef.current, {
        xPercent: isDarkMode ? 0 : 125, // Responsive 125% cho cả 2 size
        duration: 0.6, // Chậm lại
        ease: "power3.inOut", // Trượt nhẹ nhàng, êm ru
      });
    },
    { dependencies: [isDarkMode, mounted] },
  );

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  if (!mounted) {
    // Skeleton mờ responsive
    return (
      <div className="w-[45px] h-[20px] md:w-[54px] md:h-[24px] rounded-pill bg-neutral-06 dark:bg-neutral-02 animate-pulse shrink-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      // Định hình kích thước button bọc trọn SVG gốc, responsive theo màn hình
      className="relative rounded-pill overflow-hidden focus:outline-none shrink-0 transition-transform active:scale-95 w-[45px] h-[20px] md:w-[54px] md:h-[24px]"
    >
      {/* ================= BACKGROUND ICONS ================= */}

      {/* Nền Ban Ngày - Phân chia Mobile/Desktop bằng class block/hidden md: */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      >
        <CloudLightMobile className="block md:hidden w-full h-full" />
        <CloudLightDesktop className="hidden md:block w-full h-full" />
      </div>

      {/* Nền Ban Đêm */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      >
        <CloudDarkMobile className="block md:hidden w-full h-full" />
        <CloudDarkDesktop className="hidden md:block w-full h-full" />
      </div>

      {/* ================= THE TOGGLE THUMB (Do GSAP trượt) ================= */}
      <div
        ref={thumbRef}
        // Kích thước của cục Thumb cũng phải responsive
        className="absolute top-0 left-0 h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
      >
        {/* Icon Mặt Trời */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isDarkMode ? "opacity-0" : "opacity-100"
          }`}
        >
          <SunMobile className="block md:hidden w-full h-full" />
          <SunDesktop className="hidden md:block w-full h-full" />
        </div>

        {/* Icon Mặt Trăng */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isDarkMode ? "opacity-100" : "opacity-0"
          }`}
        >
          <MoonMobile className="block md:hidden w-full h-full" />
          <MoonDesktop className="hidden md:block w-full h-full" />
        </div>
      </div>
    </button>
  );
}
