"use client";

import type { Project as ProjectType } from "@app-types";
import { cn } from "@lib";
import { useEffect, useRef, useState } from "react";

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px -40% 0px -40%",
        threshold: 0,
      },
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        // Định danh cho GSAP
        "project-card relative transition-transform duration-500",
        // Mobile layout: Fixed width để có peeking effect
        "w-[70vw] sm:w-[50vw] shrink-0",
        // Desktop layout: Auto width, tự lấp đầy grid
        "md:w-auto md:shrink-0",
        // Scroll snap rules
        "snap-center snap-always",
        // Staggered layout cho Desktop (cột chẵn thụt xuống)
        index % 2 !== 0 && "md:mt-24 lg:mt-32",
      )}
    >
      {/* Image Card */}
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-[32px] md:rounded-[40px]",
          "border border-border cursor-pointer group",
          "bg-card transition-all duration-500 ease-out",
          // Xử lý Active state (phóng to/làm mờ)
          isActive
            ? "scale-100 opacity-100 shadow-xl"
            : "scale-[0.85] opacity-50 shadow-sm md:scale-100 md:opacity-100",
        )}
      >
        {/* Background Image */}
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700",
            "bg-muted group-hover:scale-105",
          )}
          style={{ backgroundImage: `url(${project.image})` }}
        />

        {/* Overlay gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-black/10 to-transparent",
            "dark:from-black/40",
          )}
        />

        {/* Title inside Card */}
        <div className="absolute top-6 left-6 z-10 md:top-10 md:left-10">
          <h3
            className={cn(
              "text-[24px] md:text-[36px] font-bold drop-shadow-sm transition-colors",
              "text-foreground",
            )}
          >
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
