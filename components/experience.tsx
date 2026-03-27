import type { Experience } from '@app-types';
import { getExperience } from '@infrastructure';

export async function Experience() {
  // Lấy dữ liệu từ API thông qua layer infrastructure
  const experiences: Experience[] = await getExperience();

  return (
    <section id="experience" className="relative w-full max-w-6xl mx-auto py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Tiêu đề nền mờ */}
      <h2 className="absolute top-10 left-4 text-6xl md:text-8xl font-extrabold text-gray-50 z-0">
        Experiences
      </h2>

      <div className="relative mt-32 w-full h-64 flex items-center justify-between z-10">
        {/* Đường kẻ ngang (Timeline line) */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-500" />

        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0;
          const year = new Date(experience.startDate).getFullYear();

          return (
            <div key={experience.id} className="relative flex flex-col items-center w-48">
              {/* Nút mốc thời gian (Timeline node) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-[3px] border-blue-500 rounded-full z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              </div>

              {isEven ? (
                <>
                  {/* Năm hiển thị ở trên */}
                  <div className="absolute bottom-[calc(50%+1.5rem)] text-2xl font-bold text-orange-400">
                    {year}
                  </div>
                  {/* Đường kẻ dọc hướng xuống */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-16 bg-gray-300" />
                  {/* Chấm tròn cuối đường kẻ dọc */}
                  <div className="absolute top-[calc(50%+4rem)] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  {/* Mô tả hiển thị ở dưới */}
                  <div className="absolute top-[calc(50%+5rem)] w-full text-center text-sm font-medium text-gray-200">
                    {experience.description}
                  </div>
                </>
              ) : (
                <>
                  {/* Năm hiển thị ở dưới */}
                  <div className="absolute top-[calc(50%+1.5rem)] text-2xl font-bold text-orange-400">
                    {year}
                  </div>
                  {/* Đường kẻ dọc hướng lên */}
                  <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-px h-16 bg-gray-300" />
                  {/* Chấm tròn đầu đường kẻ dọc */}
                  <div className="absolute bottom-[calc(50%+4rem)] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  {/* Mô tả hiển thị ở trên */}
                  <div className="absolute bottom-[calc(50%+5rem)] w-full text-center text-sm font-medium text-gray-200">
                    {experience.description}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}