"use client";

import { Profile } from "@app-types";
import { Badge } from "@components/ui/badge";
import { getSocialIcon } from "@lib/helper";
import { Download } from "lucide-react";
import { useRef } from "react";
import { BlobAvatar } from "./blob-paths";
import { PaperAirplane } from "./icons";
import { DashDecorator } from "./icons/dash-decorator";

// --- GSAP IMPORTS ---
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroSectionProps {
  data: Profile;
}

export function HeroSection({ data }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Kích hoạt sớm hơn một chút để đảm bảo chạy ngay khi load
          end: "bottom 10%",
          // onEnterBack: restart giúp hiệu ứng chạy lại khi cuộn từ dưới lên
          toggleActions: "play reverse restart reverse",
          invalidateOnRefresh: true, // Quan trọng: tính lại mốc khi resize màn hình
        },
      });

      // Sử dụng fromTo để đảm bảo trạng thái hiển thị cuối cùng là 1 (tránh bị mất hẳn)
      tl.fromTo(
        ".hero-anim-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: "auto",
        },
      ).fromTo(
        ".hero-anim-img",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.2)",
          overwrite: "auto",
        },
        "-=0.5",
      );
    },
    { dependencies: [data], scope: containerRef },
  );

  const titleParts = data.title.split("&").map((part: string) => part.trim());

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center pt-24 md:pt-32 pb-16 bg-background overflow-hidden relative"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 items-center">
          <div className="space-y-6 md:space-y-8 z-10">
            <div className="flex flex-col items-start">
              <div className="hero-anim-text opacity-0">
                <Badge
                  variant="outline"
                  className="mb-4 text-sm px-4 py-1 border-primary/50 text-primary"
                >
                  {data.location}
                </Badge>
              </div>

              <h2 className="hero-anim-text opacity-0 text-[28px] md:text-[36px] font-mono font-bold text-foreground mb-1 md:mb-2 tracking-wide">
                Hello!
              </h2>
              <h2 className="hero-anim-text opacity-0 text-[32px] md:text-[44px] font-bold text-foreground mb-3 md:mb-4">
                <span className="font-mono">I'm</span>{" "}
                <span className="text-primary border-b-[4px] md:border-b-[6px] border-primary pb-1 inline-block uppercase">
                  {data.name},
                </span>
              </h2>
              <h1 className="hero-anim-text opacity-0 text-[40px] md:text-[56px] lg:text-[64px] font-bold text-foreground leading-[1.1] tracking-tight">
                {data.title}
              </h1>
            </div>

            <p className="hero-anim-text opacity-0 text-b16-reg md:text-b18-reg text-neutral-04 max-w-[540px] leading-relaxed">
              {data.bio}
            </p>

            <div className="hero-anim-text opacity-0 flex flex-row gap-4 pt-2">
              <button className="btn-custom btn-m md:btn-l bg-primary text-white hover:brightness-110 min-w-[130px] md:min-w-[160px]">
                Xem dự án
              </button>
              <button className="btn-custom btn-m md:btn-l bg-transparent border-2 border-primary text-primary hover:bg-primary/5 min-w-[130px] md:min-w-[160px] flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Tải CV
              </button>
            </div>

            <div className="hero-anim-text opacity-0 flex items-center gap-4 pt-4">
              {data.social.map((social) => {
                const IconComponent = getSocialIcon(social.icon);
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-06 dark:bg-neutral-02 rounded-full hover:bg-primary hover:text-white transition-colors text-foreground shadow-sm"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative w-full max-w-[360px] md:max-w-[480px] aspect-square flex items-center justify-center mx-auto lg:ml-auto mt-12 lg:mt-0">
            <div className="hero-anim-img opacity-0 w-[85%] md:w-[90%] transition-transform duration-700 hover:scale-[1.05]">
              <BlobAvatar src={data.avatar} alt={data.name} />
            </div>

            <div className="hero-anim-img opacity-0 absolute top-[2%] left-[8%] md:top-[0%] md:left-[5%] -rotate-12 animate-bounce duration-3000">
              <PaperAirplane className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            {titleParts[0] && (
              <div className="hero-anim-img opacity-0 absolute top-[18%] left-[-2%] md:top-[15%] md:left-[-8%] bg-primary text-white rounded-full px-5 py-2 md:px-8 md:py-3 shadow-xl -rotate-[8deg] font-medium text-sm md:text-base z-10 transform hover:-translate-y-1 hover:scale-105 transition-all">
                {titleParts[0]}
              </div>
            )}

            <div className="hero-anim-img opacity-0 absolute top-[25%] -right-2 md:-right-8 z-0">
              <DashDecorator className="w-24 h-48 md:w-32 md:h-64 text-neutral-04" />
            </div>

            {titleParts[1] && (
              <div className="hero-anim-img opacity-0 absolute bottom-[12%] right-[-2%] md:bottom-[8%] md:right-[-6%] bg-card text-primary border-[1.5px] border-primary/30 rounded-full px-5 py-2 md:px-8 md:py-3 shadow-xl rotate-[6deg] font-medium text-sm md:text-base z-10 transform hover:-translate-y-1 hover:scale-105 transition-all">
                {titleParts[1]}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
