# Coding Standards

This document provides detailed coding standards for the PortfolioV2 project. All developers and AI assistants must follow these conventions to maintain code consistency and quality.

## Table of Contents

- [Naming Convention](#naming-convention)
- [Component Organization](#component-organization)
- [Tailwind CSS v4 Usage](#tailwind-css-v4-usage)
- [GSAP Integration](#gsap-integration)
- [TypeScript Rules](#typescript-rules)
- [Import Patterns](#import-patterns)
- [Folder Structure](#folder-structure)
- [i18n Guidelines](#i18n-guidelines)
- [Common Mistakes](#common-mistakes)

## Naming Convention

### Files

- **Component files**: kebab-case (e.g., `education-section.tsx`, `education-card.tsx`)
- **Type files**: kebab-case (e.g., `education.ts`, `profile.ts`)
- **Constant files**: kebab-case (e.g., `site.ts`)
- **Data files**: kebab-case JSON (e.g., `profile.json`, `educations.json`)

### Components

- **Component name**: PascalCase matching filename
- **Function declaration**: Use function declaration syntax, NOT arrow functions

```tsx
// ✅ CORRECT
export function EducationSection() { }

// ❌ WRONG
export const EducationSection = () => { }
```

### Types & Interfaces

- **Interface name**: PascalCase, can use descriptive suffix or not (both acceptable)
  - `EducationType`, `Experience`, `Profile` - all valid
- **Type name**: PascalCase (e.g., `NavigationItem`, `SocialLink`)
- **Union types**: Use pipe operator with literal types (e.g., `theme?: "blue" | "orange" | "green"`)
- **Optional fields**: Use `?` modifier with `| null` if needed (e.g., `endDate?: string | null`)

### Variables & Functions

- **Variables**: camelCase (e.g., `activeIndex`, `containerRef`)
- **Functions**: camelCase (e.g., `getProfile`, `handleScroll`)
- **Constants**: UPPER_SNAKE_CASE for global constants (e.g., `SITE_METADATA`, `NAVIGATION_ITEMS`)
- **Local constants**: camelCase (e.g., `themeConfig`, `currentTheme`)

### Props Interfaces

- **Props interface**: ComponentName + Props suffix (e.g., `EducationSectionProps`, `EducationCardProps`)

## Component Organization

### Component Structure Template

```tsx
"use client"; // Add at top if component uses hooks/GSAP/state

// 1. Imports (grouped by type)
import { useGSAP } from "@gsap/react";
import { cn } from "@lib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import type { EducationType } from "@app-types";
import { EducationCard } from "./education-card";

// 2. GSAP Plugin Registration (if needed)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 3. Props Interface
interface EducationSectionProps {
  data?: EducationType[];
}

// 4. Component Configuration (theme, constants, etc.)
const themeConfig = {
  blue: { bg: "...", tag: "..." },
  orange: { bg: "...", tag: "..." },
};

// 5. Component Declaration
export function EducationSection({ data = [] }: EducationSectionProps) {
  // 6. Hooks (refs, state, effects, GSAP, translations)
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("education");

  // 7. GSAP Animation (useGSAP hook)
  useGSAP(
    () => {
      gsap.fromTo(".education-card", { opacity: 0, y: 60 }, { opacity: 1, y: 0 });
    },
    { dependencies: [data], scope: containerRef },
  );

  // 8. Event Handlers
  const handleScroll = () => { };

  // 9. Render
  return (
    <section ref={containerRef} className={cn("base-classes", conditionalClasses)}>
      {/* JSX */}
    </section>
  );
}
```

### Props Type Definition

- **ALWAYS** define props interface before component
- Use optional modifier (`?`) for optional props
- Provide default values in destructuring

```tsx
interface EducationSectionProps {
  data?: EducationType[];
}

export function EducationSection({ data = [] }: EducationSectionProps) { }
```

### Import Order

1. Third-party libraries (GSAP, React, next-intl)
2. Internal aliases (@app-types, @lib, @constants, @infrastructure)
3. Relative imports (./component-name)

```tsx
import { useGSAP } from "@gsap/react";
import { cn } from "@lib";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import type { EducationType } from "@app-types";
import { EducationCard } from "./education-card";
```

### Type Imports

- Use `import type` for type-only imports when possible
- This helps with tree-shaking and makes it clear what's a type

```tsx
import type { Experience } from "@app-types";
```

### Comments Guidelines

- Comments can be in Vietnamese or English, keep them brief and relevant
- Use comments for bug fixes with "SỬA LỖI:" prefix
- Use comments to explain complex logic or layout decisions

```tsx
// SỬA LỖI: Đổi overflow-hidden thành overflow-x-clip để không cắt mất chiều cao
className="... overflow-x-clip"

{/* SỬA LỖI: Thêm md:h-[400px] để tạo đủ không gian chiều dọc cho chữ */}
<div className="... md:h-[400px]">

// Desktop Layout
"md:grid md:grid-cols-2 lg:grid-cols-3"
```

## Tailwind CSS v4 Usage

### Class Organization with `cn()` Utility

- **RECOMMENDED**: Use `cn()` from `@lib/utils` for className merging when conditional classes are needed
- For simple static classes, plain className is acceptable
- Group classes logically with comments
- Use multiline format for complex class lists

```tsx
className={cn(
  "py-20 md:py-24 overflow-hidden transition-colors duration-500",
  "bg-background",
  // Desktop Layout
  "md:grid md:grid-cols-2 lg:grid-cols-3",
  // Mobile Layout
  "-mx-4 px-[12.5vw] sm:px-[25vw]",
  // Scroll behavior
  "overflow-x-auto overscroll-x-contain snap-x snap-mandatory",
  // Hide scrollbar
  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
)}
```

### Dark Mode

- Use `dark:` prefix for dark mode styles
- Use semantic color tokens (background, foreground, muted-foreground)

```tsx
className={cn(
  "bg-[#F4F8FF] dark:bg-[#1A233A]",
  "text-neutral-600 dark:text-neutral-400",
)}
```

### Responsive Design

- Mobile-first approach
- Use `md:`, `lg:` prefixes for breakpoints

```tsx
className="text-base md:text-lg"
```

### Custom Color Schemes (LIMITED USE)

- **PREFERRED**: Define custom colors in `tailwind.config.ts` for project-wide consistency
- **LIMIT**: Avoid inline bracket notation colors (e.g., `bg-[#F4F8FF]`) - only use when absolutely necessary
- Use semantic color tokens from Tailwind config (primary, secondary, neutral, background, foreground)
- If custom theme variants are needed, define them as Tailwind classes in config, not inline

```tsx
// ✅ CORRECT: Use semantic tokens from config
className="bg-primary text-foreground"
className="bg-secondary text-white"
className="bg-neutral-01 dark:bg-neutral-08"

// ⚠️ ACCEPTABLE: Define theme in tailwind.config.ts first
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'theme-blue': '#F4F8FF',
      'theme-orange': '#FFF8E7',
    }
  }
}
// Then use
className="bg-theme-blue dark:bg-theme-blue-dark"

// ❌ AVOID: Inline custom colors in components
className="bg-[#F4F8FF] dark:bg-[#1A233A]" // Hard to maintain, inconsistent
```

## GSAP Integration

### GSAP Plugin Registration

- **PREFERRED**: Register plugins inside window check at top of file (for useGSAP pattern)

```tsx
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

- **ALTERNATIVE**: Register inside useEffect (for gsap.context pattern)

```tsx
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  // ...
}, []);
```

### useGSAP Hook Pattern (PREFERRED)

- Use `useGSAP` from `@gsap/react` for simpler animations
- Always provide dependencies array
- Use scope for targeting elements

```tsx
useGSAP(
  () => {
    gsap.fromTo(
      ".education-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  },
  { dependencies: [data], scope: containerRef },
);
```

### gsap.context Pattern (ALTERNATIVE)

- Use `gsap.context()` for complex animations needing manual cleanup
- Always revert context in cleanup function

```tsx
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

    gsap.fromTo(
      items,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  }, containerRef);

  return () => ctx.revert();
}, [data]);
```

### GSAP Target Classes

- Use descriptive class names for GSAP targets
- Prefix with component name if needed

```tsx
className="education-card"
gsap.fromTo(".education-card", ...)
```

## TypeScript Rules

### Strict Type Safety

- **STRICTLY FORBIDDEN**: `any` or `unknown` types
- **ALWAYS** define explicit types for props
- **ALWAYS** define interfaces in `types/` folder
- **ALWAYS** use TypeScript for function parameters and return types

```tsx
// ✅ CORRECT
interface EducationCardProps {
  item: EducationType;
}
export function EducationCard({ item }: EducationCardProps) { }

// ❌ WRONG
export function EducationCard({ item }: any) { }
```

## Import Patterns

### Absolute Imports (MANDATORY)

Use absolute path aliases WITHOUT trailing slash:
- `@components` instead of `@/components`
- `@app-types` instead of `@/types`
- `@lib` instead of `@/lib`
- `@constants` instead of `@/constants`
- `@infrastructure` instead of `@/infrastructure`
- `@data` instead of `@/data`

```tsx
import { EducationType } from "@app-types";
import { cn } from "@lib";
import { getEducations } from "@infrastructure";
import { SITE_METADATA } from "@constants";
```

## Folder Structure

### Mandatory Structure

```
PorfolioV2/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── educations/       # Feature-specific components
│   │   ├── education-card.tsx
│   │   ├── education-section.tsx
│   │   └── index.tsx     # Barrel export
│   ├── projects/
│   ├── experiences/
│   └── index.ts          # Main barrel export
├── data/                 # JSON data files
│   ├── en/               # English data
│   │   ├── profile.json
│   │   ├── projects.json
│   │   └── educations.json
│   └── vi/               # Vietnamese data
├── types/                # TypeScript interfaces
│   ├── education.ts
│   ├── profile.ts
│   ├── project.ts
│   └── index.ts          # Barrel export
├── constants/            # Static configuration
│   ├── site.ts
│   └── index.ts          # Barrel export
├── infrastructure/       # Data fetching utilities
│   ├── data.ts
│   └── index.ts          # Barrel export
├── lib/                  # Utility functions
│   ├── utils.ts          # cn() utility
│   ├── helper.ts
│   └── index.ts          # Barrel export
├── messages/             # i18n translation files
│   ├── en/
│   │   └── education.ts
│   └── vi/
│       └── education.ts
└── public/               # Static assets
```

### Barrel Pattern (MANDATORY)

Every folder MUST have an `index.ts` or `index.tsx` file that exports all contents:

```tsx
// components/educations/index.tsx
export * from "./education-card";
export * from "./education-section";

// types/index.ts
export * from "./education";
export * from "./profile";
export * from "./project";

// lib/index.ts
export * from "./helper";
export * from "./utils";

// infrastructure/index.ts
export * from './data';
```

## i18n Guidelines

### Translation Files Structure

```tsx
// messages/vi/education.ts
export const education = {
  title: "Học vấn",
  description: "...",
  viewAll: "Xem thêm",
  duration: "Thời gian",
  degree: "Bằng cấp",
};
```

### Using Translations in Components

```tsx
const t = useTranslations("education");
<h2>{t("title") || "Education"}</h2>
<p>{t("description") || "Lorem ipsum..."}</p>
```

## Common Mistakes

### ❌ WRONG: Using arrow functions for components

```tsx
export const EducationSection = () => { }
```

### ❌ WRONG: Missing "use client" directive

```tsx
import { useState } from "react";
export function Component() { } // Missing "use client"
```

### ❌ WRONG: Not using cn() utility

```tsx
className="base-classes " + (isActive ? "active" : "") // Don't do this
```

### ❌ WRONG: Not using cn() for complex class lists

```tsx
className="py-20 bg-background overflow-hidden transition-colors duration-300" // Should use cn()
```

### ❌ WRONG: Using any type

```tsx
interface Props {
  data: any; // NEVER use any
}
```

### ❌ WRONG: Missing barrel exports

```tsx
// components/educations/education-section.tsx
export function EducationSection() { }
// Missing index.tsx barrel export
```

### ❌ WRONG: Using relative imports for types

```tsx
import { EducationType } from "../../../types/education"; // Use @app-types
```

### ❌ WRONG: GSAP registration without window check

```tsx
gsap.registerPlugin(ScrollTrigger); // Will fail on server
```

### ❌ WRONG: Not providing default values for optional props

```tsx
export function Component({ data }: Props) { } // data could be undefined
```

### ❌ WRONG: Using PascalCase for filenames

```tsx
// EducationSection.tsx ❌
// education-section.tsx ✅
```

### ❌ WRONG: Not grouping Tailwind classes

```tsx
className="py-20 md:py-24 overflow-hidden transition-colors duration-500 bg-background md:grid md:grid-cols-2 lg:grid-cols-3"
```

### ❌ WRONG: Not using semantic color tokens

```tsx
className="text-gray-600 dark:text-gray-400" // Use text-muted-foreground
```

### ❌ WRONG: Using inline custom colors instead of Tailwind config

```tsx
className="bg-[#F4F8FF] dark:bg-[#1A233A]" // Define in tailwind.config.ts instead
```

## Code Style & Formatting

- **Tab size**: 2 spaces
- **ESLint**: Must pass all rules (no errors or warnings)
- **Comments**: Can use Vietnamese or English, keep them brief and relevant
- **Empty lines**: Use single empty line between logical sections
- **Trailing commas**: Use in arrays and objects for better diffs
