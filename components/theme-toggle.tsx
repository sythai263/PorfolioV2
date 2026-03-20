"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
} from "./icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[45px] h-[20px] md:w-[54px] md:h-[24px] rounded-pill bg-neutral-06 dark:bg-neutral-02 animate-pulse shrink-0" />
    );
  }

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="relative rounded-pill overflow-hidden focus:outline-none shrink-0 transition-transform active:scale-95 w-[45px] h-[20px] md:w-[54px] md:h-[24px]"
    >
      {/* ================= BACKGROUND ICONS ================= */}

      {/* Nền Ban Ngày */}
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

      {/* ================= THUMB (Mặt trời / Mặt trăng) ================= */}
      <div
        // ĐÃ SỬA LẠI LOGIC TRANSLATE TẠI ĐÂY:
        // Dark Mode: Trượt về 0 (Bên Trái)
        // Light Mode: Trượt sang Phải (25px cho Mobile, 30px cho Desktop)
        className={`absolute top-0 left-0 h-[20px] w-[20px] md:h-[24px] md:w-[24px] transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
          isDarkMode
            ? "translate-x-0"
            : "translate-x-[25px] md:translate-x-[30px]"
        }`}
      >
        {/* Icon Mặt Trời (Ban ngày) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isDarkMode ? "opacity-0" : "opacity-100"
          }`}
        >
          <SunMobile className="block md:hidden w-full h-full" />
          <SunDesktop className="hidden md:block w-full h-full" />
        </div>

        {/* Icon Mặt Trăng (Ban đêm) */}
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
