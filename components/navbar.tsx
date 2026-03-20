"use client";

import { useGSAP } from "@gsap/react"; // Hook quản lý vòng đời an toàn cho React
import gsap from "gsap";
import { Mail, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

// Đăng ký plugin (Bắt buộc khi dùng @gsap/react)
gsap.registerPlugin(useGSAP);

const navLinks = ["Home", "Projects", "Gallery"];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Gallery");

  // Các Refs để GSAP thao tác trực tiếp với DOM
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // GSAP Animation Logic
  useGSAP(
    () => {
      const activeIndex = navLinks.indexOf(activeTab);
      const activeBtn = buttonRefs.current[activeIndex];

      if (activeBtn && pillRef.current) {
        // Dùng GSAP để trượt cục nền tới vị trí nút đang active
        gsap.to(pillRef.current, {
          x: activeBtn.offsetLeft, // Trượt theo trục X (mượt hơn dùng thuộc tính 'left')
          width: activeBtn.offsetWidth, // Co giãn chiều rộng khớp với chữ
          opacity: 1, // Hiện rõ lên
          duration: 0.4, // Thời gian chạy (0.4s)
          ease: "back.out(1.2)", // Hiệu ứng nảy nhẹ cực kỳ "premium" ở điểm dừng
        });
      }
    },
    {
      dependencies: [activeTab], // Chạy lại animation mỗi khi activeTab thay đổi
      scope: containerRef, // Giới hạn phạm vi tìm kiếm DOM của GSAP trong container này
    },
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* ================= LEFT: LOGO ================= */}
          <div className="flex-1 flex items-center justify-start">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFF4E0] border border-primary/20 flex flex-col items-center justify-center p-2 cursor-pointer transition-transform active:scale-95">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-orange-600 rounded-md rotate-45 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
              <span className="text-[6px] font-bold text-primary tracking-widest uppercase mt-1">
                Company
              </span>
            </div>
          </div>

          {/* ================= CENTER: GSAP SEGMENTED TABS ================= */}
          <div
            ref={containerRef} // Gắn ref container cho GSAP scope
            className="hidden md:flex relative flex-none items-center bg-muted p-1.5 rounded-pill shadow-inner transition-colors"
          >
            {/* Cục nền trượt (Sliding Pill) do GSAP điều khiển */}
            <div
              ref={pillRef}
              // Lưu ý: Đặt top, bottom, left là 0. GSAP sẽ dùng transform: translateX để di chuyển (rất tối ưu)
              // Bỏ transition của Tailwind đi vì GSAP đã lo phần animation rồi
              className="absolute top-1.5 bottom-1.5 left-0 rounded-pill bg-[#FFF4E0] dark:bg-primary/20 shadow-sm opacity-0"
            />

            {/* Các nút bấm */}
            {navLinks.map((link, index) => (
              <button
                key={link}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                onClick={() => setActiveTab(link)}
                className={`relative z-10 px-8 py-2.5 rounded-pill text-b16-semi transition-colors duration-300 ${
                  activeTab === link
                    ? "text-primary"
                    : "text-neutral-03 hover:text-foreground"
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* ================= RIGHT: ACTIONS ================= */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <ThemeToggle />

            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all bg-[#FFF4E0] dark:bg-primary/20 text-primary hover:bg-primary/20 shadow-sm shrink-0">
              <Mail size={20} fill="currentColor" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors shrink-0"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2 p-2 bg-muted rounded-2xl relative">
            {navLinks.map((link) => (
              <button
                key={link}
                className={`text-left text-b18-semi px-4 py-3 rounded-xl transition-colors ${
                  activeTab === link
                    ? "bg-[#FFF4E0] dark:bg-primary/20 text-primary"
                    : "text-neutral-03 hover:text-foreground"
                }`}
                onClick={() => {
                  setActiveTab(link);
                  setIsMenuOpen(false);
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
