// components/tech-stack-section.tsx
"use client";

import { cn } from "@lib/utils";
import { ReactNode } from "react";

// --- LOGIC TÍNH TOÁN QUỸ ĐẠO --- //
interface OrbitItem {
  id: string | number;
  component: ReactNode;
}

const dots = [
  { color: "bg-red-500", angle: 45, radius: 48, size: "w-4 h-4" },
  { color: "bg-blue-600", angle: 135, radius: 45, size: "w-5 h-5" },
  { color: "bg-[#B08900]", angle: 270, radius: 48, size: "w-6 h-6" },
  { color: "bg-green-500", angle: 200, radius: 46, size: "w-4 h-4" },
  { color: "bg-blue-800", angle: 180, radius: 40, size: "w-5 h-5" },
  { color: "bg-pink-100", angle: 0, radius: 46, size: "w-5 h-5" },
];

export function TechStackSection() {
  // Hàm trợ giúp tính toán vị trí theo góc và bán kính
  const getPosition = (
    index: number,
    total: number,
    radiusPercent: number,
    offsetAngle = 0,
  ) => {
    const angle = ((index / total) * 360 + offsetAngle) * (Math.PI / 180);
    const x = 50 + radiusPercent * Math.cos(angle);
    const y = 50 - radiusPercent * Math.sin(angle); // Trừ đi vì trục Y hướng xuống
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <section className="relative py-24 bg-primary overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Inline style cho animation xoay vòng chậm rãi */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes orbit-spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes counter-spin { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
        .spin-slow { animation: orbit-spin 60s linear infinite; }
        .counter-spin-slow { animation: counter-spin 60s linear infinite; }
      `,
        }}
      />

      {/* Chữ mờ chạy ở background */}
      <div className="absolute top-12 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-20 pointer-events-none select-none">
        <h1 className="text-[120px] md:text-[180px] font-bold text-white uppercase tracking-tighter">
          AI - DEVELOPER & PHOTOGRAPHY
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center">
        {/* Tiêu đề */}
        <div className="text-center space-y-4 mb-20">
          <div className="w-32 h-[1px] bg-white/40 mx-auto mb-6" />
          <h2 className="text-t2 text-white font-bold tracking-wide">
            Tech Stack & Skills
          </h2>
        </div>

        {/* Khối Vũ trụ (Orbit Container) */}
        <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] mx-auto mt-8">
          {/* --- TRUNG TÂM (C++) --- */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 z-30">
            {/* <CppIcon /> */}
          </div>

          {/* --- VÒNG TRONG (Tech Stacks) --- */}
          {/* Bao bọc bằng class 'spin-slow' để cả mâm xoay */}
          <div className="absolute top-1/2 left-1/2 w-full h-full spin-slow z-20">
            {/* {innerOrbitItems.map((item, i) => {
              const pos = getPosition(i, innerOrbitItems.length, 25, 90); // 25% radius
              return (
                <div
                  key={item.id}
                  className="absolute w-16 h-16 sm:w-20 sm:h-20 counter-spin-slow"
                  style={pos}
                >
                  {item.component}
                </div>
              );
            })} */}
          </div>

          {/* --- VÒNG NGOÀI (Company) --- */}
          {/* Xoay ngược chiều vòng trong một chút cho sinh động */}
          <div
            className="absolute top-1/2 left-1/2 w-full h-full counter-spin-slow z-10"
            style={{ animationDuration: "80s" }}
          >
            {/* {outerOrbitItems.map((item, i) => {
              const pos = getPosition(i, outerOrbitItems.length, 45, 0); // 45% radius
              return (
                <div
                  key={item.id}
                  className="absolute w-12 h-12 sm:w-16 sm:h-16 spin-slow"
                  style={{ ...pos, animationDuration: "80s" }}
                >
                  {item.component}
                </div>
              );
            })} */}
          </div>

          {/* --- CÁC DẤU CHẤM (Dots) --- */}
          <div
            className="absolute top-1/2 left-1/2 w-full h-full spin-slow z-0"
            style={{ animationDuration: "100s" }}
          >
            {dots.map((dot, i) => {
              // Chuyển góc thủ công sang x,y
              const angleRad = dot.angle * (Math.PI / 180);
              const x = 50 + dot.radius * Math.cos(angleRad);
              const y = 50 - dot.radius * Math.sin(angleRad);
              return (
                <div
                  key={i}
                  className={cn(
                    "absolute rounded-full shadow-sm -translate-x-1/2 -translate-y-1/2",
                    dot.color,
                    dot.size,
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
