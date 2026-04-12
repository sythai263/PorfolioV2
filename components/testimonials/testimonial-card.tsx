"use client";

import { TestimonialType } from "@app-types";
import { QuoteIcon, StarIcon } from "@components/icons";
import { cn } from "@lib";
import { useEffect, useRef, useState } from "react";

interface TestimonialCardProps {
  item: TestimonialType;
}

export function TestimonialCard({ item }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Desktop mặc định luôn active
    if (window.innerWidth >= 768) {
      setIsActive(true);
      return;
    }

    // IntersectionObserver cho Mobile
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
        "testimonial-card relative transition-transform duration-500",
        // Mobile Layout: w-[75vw] để tạo peeking effect
        "w-[75vw] sm:w-[50vw] shrink-0",
        // Desktop Layout: Auto width
        "md:w-auto md:shrink-0",
        "snap-center snap-always",
      )}
    >
      <div
        className={cn(
          "relative flex flex-col items-center h-full min-h-[400px] p-8",
          "rounded-[32px] transition-all duration-500 ease-out",
          // Màu nền sáng/tối (mô phỏng màu xanh đen trong hình)
          "bg-white dark:bg-[#2B2D3A] border border-border dark:border-transparent",
          // Trạng thái thu/phóng trên Mobile
          isActive
            ? "scale-100 opacity-100 shadow-xl"
            : "scale-[0.85] opacity-50 shadow-sm md:scale-100 md:opacity-100",
        )}
      >
        {/* Avatar */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-100 mb-4 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.avatar}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Role */}
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white text-center">
          {item.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-4 text-center">
          {item.role}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {Array.from({ length: item.rating }).map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-[#FFB000]" />
          ))}
        </div>

        {/* Quote Content */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          <QuoteIcon className="absolute -top-4 -left-2 rotate-180" />

          <p className="text-center text-sm md:text-base text-neutral-700 dark:text-neutral-300 px-6 leading-relaxed relative z-10">
            {item.content}
          </p>

          <QuoteIcon className="absolute -bottom-4 -right-2" />
        </div>
      </div>
    </div>
  );
}
