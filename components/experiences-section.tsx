import type { Experience } from "@app-types";
import { getExperience } from "@infrastructure";
import { ExperienceTimelineItem } from "./experiences/experience-timeline-item";

export async function ExperiencesSection() {
  const experiences: Experience[] = await getExperience();

  return (
    <section
      id="experiences"
      className="py-20 bg-background transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-t2 text-foreground mb-12 transition-colors duration-300">
          Experiences
        </h2>

        {/* Thêm wrapper cuộn ngang để tương thích tốt với Mobile */}
        <div className="w-full overflow-x-auto pb-10 custom-scrollbar">
          <div className="relative mt-32 min-w-[800px] h-64 flex items-center justify-between z-10">
            {/* Đường kẻ ngang (Timeline line) - Đổi từ bg-blue-500 sang bg-secondary */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-secondary transition-colors duration-300" />

            {experiences.map((experience, index) => (
              <ExperienceTimelineItem
                key={experience.id}
                experience={experience}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
