// app/components/experiences-section.tsx
"use client";

import type { Experience } from "@app-types";
import { experiencesApi } from "@lib/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ExperienceTimelineItem } from "./experiences/experience-timeline-item";

export function ExperiencesSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await experiencesApi.getExperiences();
        setExperiences(data);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
        setError("Failed to load experiences data");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // GSAP Animation Logic
  useEffect(() => {
    if (loading || error || experiences.length === 0) return;

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
  }, [loading, error, experiences]);

  if (loading) {
    return (
      <section
        id="experiences"
        className="py-20 bg-background transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-t2 text-foreground mb-12 transition-colors duration-300">
            Experiences
          </h2>
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-muted-foreground">
                Loading experiences...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="experiences"
        className="py-20 bg-background transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-t2 text-foreground mb-12 transition-colors duration-300">
            Experiences
          </h2>
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md hover:brightness-110 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experiences"
      ref={containerRef}
      // SỬA LỖI: Đổi overflow-hidden thành overflow-x-clip để không cắt mất chiều cao
      className="py-20 bg-background transition-colors duration-300 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-t2 text-foreground mb-8 md:mb-12 transition-colors duration-300">
          Experiences
        </h2>

        {/* SỬA LỖI: Thêm md:h-[400px] để tạo đủ không gian chiều dọc cho chữ */}
        <div className="relative mt-8 md:mt-16 w-full flex flex-col md:flex-row items-center justify-between z-10 py-10 md:py-0 md:h-[400px]">
          {/* Đường kẻ chính */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 md:top-1/2 md:bottom-auto md:left-0 md:right-0 md:h-[2px] md:w-full md:-translate-y-1/2 md:translate-x-0 bg-secondary transition-colors duration-300 z-0" />

          {experiences.map((experience, index) => (
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
