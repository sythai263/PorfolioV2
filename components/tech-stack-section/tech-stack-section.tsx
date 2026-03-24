// components/tech-stack-section.tsx
"use client";

import { TechStack } from "@app-types";
import { TechIconComponent } from "@components";
import { techStackApi } from "@lib/api";
import gsap from "gsap"; // Import GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger
import { useEffect, useRef, useState } from "react";
import "./tech-stack-section.css";
gsap.registerPlugin(ScrollTrigger);

// Loading Skeleton Component (Giữ nguyên)
function TechStackSkeleton() {
  // ... (Code skeleton giữ nguyên như cũ để tiết kiệm không gian hiển thị)
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center text-white">
      Loading...
    </div>
  );
}

// Error Component (Giữ nguyên)
function TechStackError({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  // ... (Code error giữ nguyên)
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center text-white">
      {error}
    </div>
  );
}

// Helper function
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

// Tech Icon Component
function TechIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="relative group w-full h-full">
      <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 hover:bg-white/30 transition-colors duration-300 p-1">
        <TechIconComponent iconName={icon} size="60%" />
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
        {name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  );
}

export function TechStackSection() {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tạo ref để GSAP biết vùng không gian cần animate
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await techStackApi.getTechStack();
        setTechStack(data);
      } catch (err) {
        console.error("Failed to fetch tech stack:", err);
        setError("Failed to load tech stack data.");
      } finally {
        setLoading(false);
      }
    };
    fetchTechStack();
  }, []);

  // --- GSAP ANIMATION LOGIC ---
  useEffect(() => {
    if (loading || error || techStack.length === 0 || !containerRef.current)
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reset play reset",
        },
      });

      // Dùng fromTo để mỗi khi "reset", nó tự động ép mọi thứ về scale 0, opacity 0
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
        // Hiệu ứng Zoom Thở vô hạn (Được gắn thẳng vào timeline để khi reset nó tự dừng)
        .to(".gsap-icon", {
          scale: 1.15,
          duration: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: {
            each: 0.15,
            from: "random",
          },
        });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, error, techStack]);

  if (loading) return <TechStackSkeleton />;
  if (error)
    return (
      <TechStackError error={error} onRetry={() => window.location.reload()} />
    );

  const innerOrbitItems = techStack.filter(
    (item) => item.orbit === "inner" && !item.main,
  );
  const outerOrbitItems = techStack.filter(
    (item) => item.orbit === "outer" && !item.main,
  );
  const mainTech = techStack.find((item) => item.main);

  return (
    // Gắn ref vào vùng bao ngoài cùng
    <section
      ref={containerRef}
      className="relative py-24 bg-primary overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      <div className="absolute top-12 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-20 pointer-events-none select-none">
        <h1 className="text-[120px] md:text-[180px] font-bold text-white uppercase tracking-tighter">
          AI - DEVELOPER & PHOTOGRAPHY
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center">
        <div className="text-center space-y-4 mb-20">
          <div className="w-32 h-[1px] bg-white/40 mx-auto mb-6" />
          <h2 className="text-t2 text-white font-bold tracking-wide">
            Tech Stack & Skills
          </h2>
        </div>

        <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] mx-auto mt-8">
          {/* --- TRUNG TÂM --- */}
          {/* Thêm class gsap-icon và gsap-center để GSAP nhắm mục tiêu */}
          <div
            className={`gsap-icon gsap-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 z-30 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
          >
            {mainTech ? (
              <TechIcon name={mainTech.name} icon={mainTech.icon} />
            ) : (
              "Tech Stack"
            )}
          </div>

          {/* --- VÒNG TRONG --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20">
            {innerOrbitItems.map((item, i) => {
              const pos = getPosition(i, innerOrbitItems.length, 25, 90);
              return (
                <div
                  key={item.id}
                  // Thêm class gsap-icon và gsap-inner
                  className="gsap-icon gsap-inner absolute w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2"
                  style={pos}
                >
                  <TechIcon name={item.name} icon={item.icon} />
                </div>
              );
            })}
          </div>

          {/* --- VÒNG NGOÀI --- */}
          <div className="absolute top-0 left-0 w-full h-full z-10">
            {outerOrbitItems.map((item, i) => {
              const pos = getPosition(i, outerOrbitItems.length, 45, 0);
              return (
                <div
                  key={item.id}
                  // Thêm class gsap-icon và gsap-outer
                  className="gsap-icon gsap-outer absolute w-12 h-12 sm:w-16 sm:h-16 -translate-x-1/2 -translate-y-1/2"
                  style={pos}
                >
                  <TechIcon name={item.name} icon={item.icon} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
