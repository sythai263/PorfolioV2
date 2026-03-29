// components/experiences/experience-timeline-item.tsx
"use client"; // Cần thiết vì chúng ta sẽ dùng useState

import type { Experience } from "@app-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Info } from "lucide-react";
import { useState } from "react";

interface ExperienceTimelineItemProps {
  experience: Experience;
  isEven: boolean;
}

export function ExperienceTimelineItem({
  experience,
  isEven,
}: ExperienceTimelineItemProps) {
  const year = new Date(experience.startDate).getFullYear();
  // State để theo dõi tooltip đang mở hay đóng
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`timeline-item relative flex flex-col items-center w-full h-40 md:flex-1 md:h-full transition-colors duration-300 ${isOpen ? "z-[60]" : "z-10"}`}
    >
      {/* Nút mốc thời gian */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-background border-[3px] border-secondary rounded-full flex items-center justify-center transition-colors duration-300 z-20">
        <div className="w-2 h-2 bg-secondary rounded-full" />
      </div>

      <TooltipProvider delayDuration={200}>
        {isEven ? (
          <>
            {/* YEAR */}
            <div className="absolute top-1/2 -translate-y-1/2 right-[calc(50%+1.5rem)] md:top-auto md:bottom-[calc(50%+1.5rem)] md:left-1/2 md:-translate-x-1/2 md:translate-y-0 md:right-auto text-h1 text-primary">
              {year}
            </div>

            {/* ĐƯỜNG KẺ NHÁNH */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-12 sm:w-16 h-px md:top-1/2 md:left-1/2 md:w-px md:h-16 md:-translate-x-1/2 md:translate-y-0 bg-border transition-colors duration-300" />

            {/* DẤU CHẤM NHỎ */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+3rem)] sm:left-[calc(50%+4rem)] w-1.5 h-1.5 md:top-[calc(50%+4rem)] md:left-1/2 md:-translate-x-1/2 md:translate-y-0 bg-neutral-04 rounded-full transition-colors duration-300" />

            {/* DESC BLOCK */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+4rem)] sm:left-[calc(50%+5rem)] w-[calc(50%-4.5rem)] sm:w-[calc(50%-5.5rem)] md:top-[calc(50%+5rem)] md:left-0 md:w-full md:px-4 md:translate-x-0 md:translate-y-0">
              <Tooltip onOpenChange={setIsOpen}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-start md:items-center group cursor-help w-full">
                    <div className="flex items-center gap-1.5">
                      <span className="text-b16-semi md:text-h3 text-foreground group-hover:text-primary transition-colors text-left md:text-center">
                        {experience.company}
                      </span>
                      <Info className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                    <span className="text-b14-reg text-muted-foreground text-left md:text-center mt-1">
                      {experience.position}
                    </span>
                  </div>
                </TooltipTrigger>

                {/* Ép cứng bg-white và dark:bg-[#1b1f35] để không bao giờ bị trong suốt */}
                <TooltipContent
                  side="bottom"
                  className="max-w-[320px] md:max-w-[450px] p-4 bg-white dark:bg-[#1b1f35] border border-border shadow-xl rounded-lg transition-colors duration-300 relative z-[999]"
                >
                  <div className="flex flex-col gap-3 text-left">
                    <p className="text-b14-reg text-neutral-01 dark:text-neutral-10 pb-3 border-b border-border">
                      {experience.description}
                    </p>
                    <ul className="list-disc pl-4 space-y-2 text-b14-reg text-neutral-03 dark:text-neutral-04">
                      {experience.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </>
        ) : (
          <>
            {/* YEAR */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+1.5rem)] md:bottom-auto md:top-[calc(50%+1.5rem)] md:left-1/2 md:-translate-x-1/2 md:translate-y-0 text-h1 text-primary">
              {year}
            </div>

            {/* ĐƯỜNG KẺ NHÁNH */}
            <div className="absolute top-1/2 right-1/2 -translate-y-1/2 w-12 sm:w-16 h-px md:bottom-1/2 md:top-auto md:left-1/2 md:w-px md:h-16 md:-translate-x-1/2 md:translate-y-0 bg-border transition-colors duration-300" />

            {/* DẤU CHẤM NHỎ */}
            <div className="absolute top-1/2 -translate-y-1/2 right-[calc(50%+3rem)] sm:right-[calc(50%+4rem)] w-1.5 h-1.5 md:bottom-[calc(50%+4rem)] md:top-auto md:left-1/2 md:-translate-x-1/2 md:translate-y-0 bg-neutral-04 rounded-full transition-colors duration-300" />

            {/* DESC BLOCK */}
            <div className="absolute top-1/2 -translate-y-1/2 right-[calc(50%+4rem)] sm:right-[calc(50%+5rem)] w-[calc(50%-4.5rem)] sm:w-[calc(50%-5.5rem)] md:bottom-[calc(50%+5rem)] md:top-auto md:left-0 md:w-full md:px-4 md:translate-x-0 md:translate-y-0">
              <Tooltip onOpenChange={setIsOpen}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-end md:items-center group cursor-help w-full">
                    <div className="flex items-center justify-end md:justify-center gap-1.5 w-full">
                      <span className="text-b16-semi md:text-h3 text-foreground group-hover:text-primary transition-colors text-right md:text-center">
                        {experience.company}
                      </span>
                      <Info className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                    <span className="text-b14-reg text-muted-foreground text-right md:text-center mt-1">
                      {experience.position}
                    </span>
                  </div>
                </TooltipTrigger>

                {/* Ép cứng bg-white và dark:bg-[#1b1f35] để không bao giờ bị trong suốt */}
                <TooltipContent
                  side="top"
                  className="max-w-[320px] md:max-w-[450px] p-4 bg-white dark:bg-[#1b1f35] border border-border shadow-xl rounded-lg transition-colors duration-300 relative z-[999]"
                >
                  <div className="flex flex-col gap-3 text-left">
                    <p className="text-b14-reg text-neutral-01 dark:text-neutral-10 pb-3 border-b border-border">
                      {experience.description}
                    </p>
                    <ul className="list-disc pl-4 space-y-2 text-b14-reg text-neutral-03 dark:text-neutral-04">
                      {experience.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </>
        )}
      </TooltipProvider>
    </div>
  );
}
