"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

export function CtaBannerSection() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-primary rounded-3xl p-8 lg:p-12 overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-2xl"></div>
          <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/10 rounded-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-xl"></div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-t2 text-white">{t("title")}</h2>
            <p className="text-b16-reg text-white/90 max-w-2xl mx-auto">
              {t("description")}
            </p>
            <button className="btn-custom btn-l bg-white text-primary hover:bg-neutral-09 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              {t("downloadCV")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
