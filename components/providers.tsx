"use client";

import ReactLenis from "lenis/react";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
      <ReactLenis
        root
        options={{
          lerp: 0.08,
          duration: 1.2,
          smoothWheel: true,
        }}
      >
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
