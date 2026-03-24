"use client";

import { Profile } from "@app-types";
import { Badge } from "@components/ui/badge";
import { getProfile } from "@infrastructure";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { BlobAvatar } from "./blob-paths";
import { PaperAirplane } from "./icons";
import { DashDecorator } from "./icons/dash-decorator";

function getSocialIcon(iconName: string) {
  switch (iconName) {
    case "Github":
      return FaGithub;
    case "Linkedin":
      return FaLinkedin;
    case "Twitter":
      return FaTwitter;
    default:
      return FaGithub;
  }
}

export function HeroSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
  }, []);
  if (!profile) {
    return null;
  }

  // Tách chức danh (VD: "Developer & Photographer") thành mảng để đặt vào 2 nhãn bay lơ lửng
  const titleParts = profile.title
    .split("&")
    .map((part: string) => part.trim());

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 md:pt-32 pb-16 bg-background overflow-hidden relative"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 z-10">
            <div className="flex flex-col items-start">
              <Badge
                variant="outline"
                className="mb-4 text-sm px-4 py-1 border-primary/50 text-primary"
              >
                {profile.location}
              </Badge>

              <h2 className="text-[28px] md:text-[36px] font-mono font-bold text-foreground mb-1 md:mb-2 tracking-wide">
                Hello!
              </h2>
              <h2 className="text-[32px] md:text-[44px] font-bold text-foreground mb-3 md:mb-4">
                <span className="font-mono">I'm</span>{" "}
                <span className="text-primary border-b-[4px] md:border-b-[6px] border-primary pb-1 inline-block uppercase">
                  {profile.name},
                </span>
              </h2>
              <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-foreground leading-[1.1] tracking-tight">
                {profile.title}
              </h1>
            </div>

            <p className="text-b16-reg md:text-b18-reg text-neutral-04 max-w-[540px] leading-relaxed">
              {profile.bio}
            </p>

            {/* Actions */}
            <div className="flex flex-row gap-4 pt-2">
              <button className="btn-custom btn-m md:btn-l bg-primary text-white hover:brightness-110 min-w-[130px] md:min-w-[160px]">
                Xem dự án
              </button>
              <button className="btn-custom btn-m md:btn-l bg-transparent border-2 border-primary text-primary hover:bg-primary/5 min-w-[130px] md:min-w-[160px] flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Tải CV
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {profile.social.map((social) => {
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

          {/* Right Graphic */}
          <div className="relative w-full max-w-[360px] md:max-w-[480px] aspect-square flex items-center justify-center mx-auto lg:ml-auto mt-12 lg:mt-0">
            {/* Component Avatar Blob (Từ file json) */}
            <div className="w-[85%] md:w-[90%] transition-transform duration-700 hover:scale-[1.05]">
              <BlobAvatar src={profile.avatar} alt={profile.name} />
            </div>

            {/* Blue Paper Plane */}
            <div className="absolute top-[2%] left-[8%] md:top-[0%] md:left-[5%] -rotate-12 animate-bounce duration-3000">
              <PaperAirplane className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            {/* Pill 1 */}
            {titleParts[0] && (
              <div className="absolute top-[18%] left-[-2%] md:top-[15%] md:left-[-8%] bg-primary text-white rounded-full px-5 py-2 md:px-8 md:py-3 shadow-xl -rotate-[8deg] font-medium text-sm md:text-base z-10 transform hover:-translate-y-1 hover:scale-105 transition-all">
                {titleParts[0]}
              </div>
            )}

            {/* Decorative Dashed Line */}
            <DashDecorator className="absolute top-[25%] -right-2 md:-right-8 w-24 h-48 md:w-32 md:h-64 z-0 text-neutral-04" />

            {/* Pill 2 */}
            {titleParts[1] && (
              <div className="absolute bottom-[12%] right-[-2%] md:bottom-[8%] md:right-[-6%] bg-card text-primary border-[1.5px] border-primary/30 rounded-full px-5 py-2 md:px-8 md:py-3 shadow-xl rotate-[6deg] font-medium text-sm md:text-base z-10 transform hover:-translate-y-1 hover:scale-105 transition-all">
                {titleParts[1]}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
