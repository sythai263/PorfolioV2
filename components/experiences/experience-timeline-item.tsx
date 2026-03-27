// components/experiences/experience-timeline-item.tsx
import type { Experience } from "@app-types";

interface ExperienceTimelineItemProps {
  experience: Experience;
  isEven: boolean;
}

export function ExperienceTimelineItem({
  experience,
  isEven,
}: ExperienceTimelineItemProps) {
  const year = new Date(experience.startDate).getFullYear();

  return (
    <div className="timeline-item relative flex flex-col items-center w-full h-40 md:flex-1 md:h-full z-10">
      {/* Nút mốc thời gian */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-background border-[3px] border-secondary rounded-full flex items-center justify-center transition-colors duration-300 z-20">
        <div className="w-2 h-2 bg-secondary rounded-full" />
      </div>

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

          {/* DESC: Bổ sung md:px-4 để text không sát lề, bị chạm vào nhau */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+4rem)] sm:left-[calc(50%+5rem)] w-[calc(50%-4.5rem)] sm:w-[calc(50%-5.5rem)] text-left md:top-[calc(50%+5rem)] md:left-0 md:w-full md:px-4 md:text-center md:translate-x-0 md:translate-y-0 text-b14-reg text-muted-foreground line-clamp-4 md:line-clamp-none">
            {experience.description}
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

          {/* DESC: Bổ sung md:px-4 */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[calc(50%+4rem)] sm:right-[calc(50%+5rem)] w-[calc(50%-4.5rem)] sm:w-[calc(50%-5.5rem)] text-right md:bottom-[calc(50%+5rem)] md:top-auto md:left-0 md:w-full md:px-4 md:text-center md:translate-x-0 md:translate-y-0 text-b14-reg text-muted-foreground line-clamp-4 md:line-clamp-none">
            {experience.description}
          </div>
        </>
      )}
    </div>
  );
}
