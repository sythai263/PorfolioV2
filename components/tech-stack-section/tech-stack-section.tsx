// components/tech-stack-section.tsx
"use client";

import { TechStack } from "@app-types";
import { TechIconComponent } from "@components";
import { cn } from "@lib";
import { techStackApi } from "@lib/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "./tech-stack-section.css";

gsap.registerPlugin(ScrollTrigger);

// --- HELPER FUNCTION ---
function getPosition(
  index: number,
  total: number,
  radiusPercent: number,
  offsetAngle = 0,
) {
  const angle = ((index / total) * 360 + offsetAngle) * (Math.PI / 180);
  const x = 50 + radiusPercent * Math.cos(angle);
  const y = 50 - radiusPercent * Math.sin(angle);
  return { left: `${x}%`, top: `${y}%` };
}

// --- SUB-COMPONENTS TÁCH RỜI ---

// 1. Component hiển thị từng Icon trên quỹ đạo
interface OrbitNodeProps {
  name: string;
  icon?: string;
  positionStyle?: React.CSSProperties; // Tọa độ (nếu là tâm thì không cần)
  gsapClass: string; // Class để GSAP bắt animation
  sizeClass: string; // Kích thước responsive
  isCenter?: boolean; // Có phải là icon trung tâm không?
}

function OrbitNode({
  name,
  icon,
  positionStyle,
  gsapClass,
  sizeClass,
  isCenter,
}: OrbitNodeProps) {
  return (
    <div
      className={cn(
        gsapClass,
        "absolute -translate-x-1/2 -translate-y-1/2",
        sizeClass,
      )}
      style={positionStyle ? { ...positionStyle } : { top: "50%", left: "50%" }}
    >
      <div
        className={cn(
          "relative group w-full h-full",
          isCenter ? "z-30" : "z-10",
        )}
      >
        <div
          className={cn(
            "w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 hover:bg-white/30 transition-colors duration-300 p-1",
            isCenter && "shadow-[0_0_30px_rgba(255,255,255,0.2)]",
          )}
        >
          {icon ? (
            <TechIconComponent iconName={icon} size="60%" />
          ) : (
            <span className="text-white font-bold text-[10px] sm:text-sm text-center leading-tight">
              {name}
            </span>
          )}
        </div>

        {/* Tooltip */}
        {icon && (
          <div
            className={cn(
              "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50",
              "before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:-mt-1 before:w-2 before:h-2 before:bg-gray-900 before:rotate-45",
            )}
          >
            {name}
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Fallback Components (Skeleton & Error) gọn nhẹ hơn
const FallbackUI = ({ content }: { content: React.ReactNode }) => (
  <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-white space-y-4">
    {content}
  </div>
);

// --- MAIN COMPONENT ---
export function TechStackSection() {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    techStackApi
      .getTechStack()
      .then((data) => {
        setTechStack(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    if (status !== "success" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reset play reset",
        },
      });

      tl.fromTo(
        ".gsap-center",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      )
        .fromTo(
          ".gsap-inner",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.2",
        )
        .fromTo(
          ".gsap-outer",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.3",
        )
        .to(".gsap-icon", {
          scale: 1.15,
          duration: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: { each: 0.15, from: "random" },
        });
    }, containerRef);

    return () => ctx.revert();
  }, [status, techStack]);

  if (status === "loading")
    return (
      <FallbackUI
        content={<div className="animate-pulse">Loading Map...</div>}
      />
    );
  if (status === "error")
    return (
      <FallbackUI
        content={
          <>
            <p>Failed to load data.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-primary rounded"
            >
              Try Again
            </button>
          </>
        }
      />
    );

  // Phân loại data
  const innerItems = techStack.filter(
    (item) => item.orbit === "inner" && !item.main,
  );
  const outerItems = techStack.filter(
    (item) => item.orbit === "outer" && !item.main,
  );
  const mainTech = techStack.find((item) => item.main);

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-primary overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      {/* Chữ chìm background */}
      <div className="absolute top-12 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-10 pointer-events-none select-none">
        <h1 className="text-[100px] md:text-[180px] font-bold text-white uppercase tracking-tighter">
          AI - DEVELOPER & PHOTOGRAPHY
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center">
        {/* Title */}
        <div className="text-center space-y-4 mb-16 md:mb-20">
          <div className="w-24 md:w-32 h-[1px] bg-white/40 mx-auto mb-6" />
          <h2 className="text-2xl md:text-t2 text-white font-bold tracking-wide">
            Tech Stack & Skills
          </h2>
        </div>

        {/* Khối Vũ trụ (Responsive Container) */}
        <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] mx-auto mt-4 md:mt-8">
          {/* Khối Vũ trụ (Responsive Container) */}
          <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] mx-auto mt-4 md:mt-8">
            {/* 1. VÒNG NGOÀI (Render trước để nằm dưới cùng) */}
            {outerItems.map((item, i) => (
              <OrbitNode
                key={item.id}
                name={item.name}
                icon={item.icon}
                positionStyle={getPosition(i, outerItems.length, 48, 0)}
                gsapClass="gsap-icon gsap-outer"
                sizeClass="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
              />
            ))}

            {/* 2. VÒNG TRONG (Render sau để đè lên vòng ngoài nếu bị sát nhau) */}
            {innerItems.map((item, i) => (
              <OrbitNode
                key={item.id}
                name={item.name}
                icon={item.icon}
                positionStyle={getPosition(i, innerItems.length, 28, 90)}
                gsapClass="gsap-icon gsap-inner"
                sizeClass="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              />
            ))}

            {/* 3. TRUNG TÂM (Bản thân component đã có z-30 nên luôn trên cùng) */}
            <OrbitNode
              name={mainTech ? mainTech.name : "Tech Stack"}
              icon={mainTech?.icon}
              gsapClass="gsap-icon gsap-center"
              sizeClass="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
              isCenter={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
