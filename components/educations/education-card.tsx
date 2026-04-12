"use client";

import { EducationType } from "@app-types";
import { cn } from "@lib";
import { useEffect, useRef, useState } from "react";

interface EducationCardProps {
  item: EducationType;
}

// Bảng màu cấu hình cho từng theme
const themeConfig = {
  blue: {
    bg: "bg-[#F4F8FF] dark:bg-[#1A233A]",
    tag: "bg-[#2A85FF] text-white",
  },
  orange: {
    bg: "bg-[#FFF8E7] dark:bg-[#332715]",
    tag: "bg-[#F5A623] text-white",
  },
  green: {
    bg: "bg-[#EEFFED] dark:bg-[#162D1C]",
    tag: "bg-[#00C464] text-white",
  },
};

export function EducationCard({ item }: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  // Lấy cấu hình màu dựa trên theme, mặc định là blue
  const currentTheme = themeConfig[item.theme || "blue"];

  useEffect(() => {
    // Luôn active khi ở giao diện tablet/desktop
    if (window.innerWidth >= 768) {
      setIsActive(true);
      return;
    }

    // Theo dõi card nào đang ở giữa màn hình Mobile
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { root: null, rootMargin: "0px -40% 0px -40%", threshold: 0 },
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "education-card relative transition-transform duration-500",
        // Mobile Layout: w-[75vw] kết hợp padding ngoài để lòi mép 2 bên
        "w-[75vw] sm:w-[50vw] shrink-0",
        // Desktop Layout: Auto lấp đầy grid
        "md:w-auto md:shrink-0",
        // Khóa điểm cuộn
        "snap-center snap-always",
      )}
    >
      <div
        className={cn(
          "relative flex flex-col h-full min-h-[420px] p-6 md:p-8 overflow-hidden",
          "rounded-[32px] transition-all duration-500 ease-out",
          currentTheme.bg,
          // Trạng thái thu/phóng trên Mobile
          isActive
            ? "scale-100 opacity-100 shadow-xl"
            : "scale-[0.85] opacity-50 shadow-sm md:scale-100 md:opacity-100",
        )}
      >
        {/* Top: Tags & Duration */}
        <div className="flex items-start justify-between mb-6 z-10">
          <div className="flex flex-wrap gap-2">
            {item.schools.map((school, i) => (
              <span
                key={i}
                className={cn(
                  "px-3 py-1 rounded-md text-xs md:text-sm font-medium",
                  currentTheme.tag,
                )}
              >
                {school}
              </span>
            ))}
          </div>
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {item.duration}
          </span>
        </div>

        {/* Degree Title */}
        <h3 className="text-2xl md:text-[28px] leading-tight font-bold text-foreground mb-6 z-10 uppercase w-[80%]">
          {item.degree}
        </h3>

        {/* Descriptions */}
        <ul className="space-y-3 z-10 mb-16 relative">
          {item.descriptions.map((desc, i) => (
            <li
              key={i}
              className="text-sm md:text-base text-muted-foreground flex items-start"
            >
              <span className="mr-2 mt-[6px] h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
              {desc}
            </li>
          ))}
        </ul>

        {/* 3D Image (Góc dưới cùng bên phải) */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-32 h-32 md:w-40 md:h-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt="Graduation Cap"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
