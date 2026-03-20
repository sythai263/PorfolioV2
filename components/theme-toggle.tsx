"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

// Import các Icon SVG của bạn
import {
  CloudDarkDesktop,
  CloudDarkMobile,
  CloudLightDesktop,
  CloudLightMobile,
  MoonDesktop,
  MoonMobile,
  SunDesktop,
  SunMobile,
} from "./icons";

gsap.registerPlugin(useGSAP);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Tạo Ref để GSAP điều khiển cục Mặt trời / Mặt trăng
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";

  // GSAP Animation cho cục Thumb
  useGSAP(
    () => {
      if (!mounted) return;

      gsap.to(thumbRef.current, {
        // Light Mode: Trượt 125% sang phải | Dark Mode: Về 0 (bên trái)
        xPercent: isDarkMode ? 0 : 125,
        duration: 0.5,
        ease: "back.out(1.5)", // Hiệu ứng nảy (bounce) đặc trưng của GSAP
      });
    },
    { dependencies: [isDarkMode, mounted] },
  );

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="w-[45px] h-[20px] md:w-[54px] md:h-[24px] rounded-pill bg-neutral-06 dark:bg-neutral-02 animate-pulse shrink-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="relative rounded-pill overflow-hidden focus:outline-none shrink-0 transition-transform active:scale-95 w-[45px] h-[20px] md:w-[54px] md:h-[24px]"
    >
      {/* ================= BACKGROUND ICONS ================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      >
        <CloudLightMobile className="block md:hidden w-full h-full" />
        <CloudLightDesktop className="hidden md:block w-full h-full" />
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      >
        <CloudDarkMobile className="block md:hidden w-full h-full" />
        <CloudDarkDesktop className="hidden md:block w-full h-full" />
      </div>

      {/* ================= THUMB (Mặt trời / Mặt trăng) ================= */}
      <div
        ref={thumbRef}
        // Đã xóa bỏ hoàn toàn các class transition và translate của Tailwind ở đây
        // GSAP sẽ tiếp quản việc di chuyển khối này
        className="absolute top-0 left-0 h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
      >
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isDarkMode ? "opacity-0" : "opacity-100"
          }`}
        >
          <SunMobile className="block md:hidden w-full h-full" />
          <SunDesktop className="hidden md:block w-full h-full" />
        </div>

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
