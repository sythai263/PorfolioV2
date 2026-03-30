"use client";

import { TechStack } from "@app-types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "./tech-stack-section.css";

import { getPosition } from "@lib";
import { OrbitNode } from "./orbit-node";

interface TechStackSectionProps {
  data: TechStack[];
}

export function TechStackSection({ data }: TechStackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
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
    },
    { dependencies: [data], scope: containerRef },
  );

  // Phân loại data
  const innerItems = data.filter(
    (item) => item.orbit === "inner" && !item.main,
  );
  const outerItems = data.filter(
    (item) => item.orbit === "outer" && !item.main,
  );
  const mainTech = data.find((item) => item.main);

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
