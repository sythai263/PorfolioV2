"use client";

import type { Project as ProjectType } from "@app-types";
import { useGSAP } from "@gsap/react";
import { cn } from "@lib"; // Nhớ điều chỉnh lại đường dẫn import cn của bạn
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ProjectCard } from "./project-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsSectionProps {
  data?: ProjectType[];
}

export function ProjectsSection({ data = [] }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("projects");

  useGSAP(
    () => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { dependencies: [data], scope: containerRef },
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className={cn(
        "py-20 md:py-24 overflow-hidden transition-colors duration-500",
        "bg-background",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="mb-12 max-w-2xl space-y-4 text-left">
          <h2
            className={cn(
              "text-[40px] md:text-[56px] font-bold drop-shadow-sm transition-colors",
              "text-foreground",
            )}
          >
            {t("title")}
          </h2>
          <p
            className={cn(
              "text-base md:text-lg transition-colors",
              "text-muted-foreground",
            )}
          >
            {t("description")}
          </p>
        </div>

        {/* Projects Layout */}
        <div
          className={cn(
            // Layout chung
            "flex gap-4 pt-4 pb-8",
            "md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:pb-12",
            // Mobile Spacing (Peeking effect + âm lề)
            "-mx-4 px-[15vw] sm:px-[25vw]",
            // Desktop Spacing (Reset lề)
            "md:mx-0 md:px-0",
            // Cuộn ngang & Snap behavior cho Mobile
            "overflow-x-auto overscroll-x-contain snap-x snap-mandatory",
            // Desktop không cuộn ngang
            "md:overflow-visible",
            // Ẩn thanh scrollbar
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          )}
        >
          {data.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-12 flex justify-center text-center md:mt-20">
          <button
            className={cn(
              "min-w-[200px] rounded-full px-8 py-3 text-primary-foreground font-semibold transition-all",
              "bg-primary hover:brightness-110",
              "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
              "hover:-translate-y-1",
            )}
          >
            {t("viewAll")}
          </button>
        </div>
      </div>
    </section>
  );
}
