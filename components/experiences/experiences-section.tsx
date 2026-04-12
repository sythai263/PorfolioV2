"use client";

import type { Experience } from "@app-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { ExperienceTimelineItem } from "./experience-timeline-item";

interface ExperiencesSectionProps {
  data: Experience[];
}

export function ExperiencesSection({ data }: ExperiencesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("experience");

  // GSAP Animation Logic
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

      gsap.fromTo(
        items,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      id="experiences"
      ref={containerRef}
      // SỬA LỖI: Đổi overflow-hidden thành overflow-x-clip để không cắt mất chiều cao
      className="py-20 bg-background transition-colors duration-300 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-t2 text-foreground mb-8 md:mb-12 transition-colors duration-300">
          {t("title")}
        </h2>

        {/* SỬA LỖI: Thêm md:h-[400px] để tạo đủ không gian chiều dọc cho chữ */}
        <div className="relative mt-8 md:mt-16 w-full flex flex-col md:flex-row items-center justify-between z-10 py-10 md:py-0 md:h-[400px]">
          {/* Đường kẻ chính */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 md:top-1/2 md:bottom-auto md:left-0 md:right-0 md:h-[2px] md:w-full md:-translate-y-1/2 md:translate-x-0 bg-secondary transition-colors duration-300 z-0" />

          {data.map((experience, index) => (
            <ExperienceTimelineItem
              key={experience.id}
              experience={experience}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
