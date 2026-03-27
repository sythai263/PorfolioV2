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
    <div className="relative flex flex-col items-center w-48">
      {/* Nút mốc thời gian (Timeline node) - Dùng màu secondary (Xanh) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-background border-[3px] border-secondary rounded-full z-10 flex items-center justify-center transition-colors duration-300">
        <div className="w-2 h-2 bg-secondary rounded-full" />
      </div>

      {isEven ? (
        <>
          {/* Năm hiển thị ở trên - Dùng text-h1 và màu primary (Cam) */}
          <div className="absolute bottom-[calc(50%+1.5rem)] text-h1 text-primary">
            {year}
          </div>
          {/* Đường kẻ dọc hướng xuống */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-16 bg-border transition-colors duration-300" />
          {/* Chấm tròn cuối đường kẻ dọc */}
          <div className="absolute top-[calc(50%+4rem)] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-04 rounded-full transition-colors duration-300" />
          {/* Mô tả hiển thị ở dưới */}
          <div className="absolute top-[calc(50%+5rem)] w-full text-center text-b14-reg text-muted-foreground">
            {experience.description}
          </div>
        </>
      ) : (
        <>
          {/* Năm hiển thị ở dưới */}
          <div className="absolute top-[calc(50%+1.5rem)] text-h1 text-primary">
            {year}
          </div>
          {/* Đường kẻ dọc hướng lên */}
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-px h-16 bg-border transition-colors duration-300" />
          {/* Chấm tròn đầu đường kẻ dọc */}
          <div className="absolute bottom-[calc(50%+4rem)] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-04 rounded-full transition-colors duration-300" />
          {/* Mô tả hiển thị ở trên */}
          <div className="absolute bottom-[calc(50%+5rem)] w-full text-center text-b14-reg text-muted-foreground">
            {experience.description}
          </div>
        </>
      )}
    </div>
  );
}
