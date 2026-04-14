# Architecture Documentation

This document explains the architecture and data flow of the PortfolioV2 project, which follows Clean Architecture principles adapted for a frontend-only portfolio application.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Data Flow](#data-flow)
- [Layer Responsibilities](#layer-responsibilities)
- [Component Communication](#component-communication)
- [State Management](#state-management)
- [Animation Flow](#animation-flow)
- [i18n Flow](#i18n-flow)

## Architecture Overview

The PortfolioV2 project follows a simplified Clean Architecture pattern adapted for a frontend-only application. The architecture is organized into four main layers:

```
┌─────────────────────────────────────────────────────────┐
│                   Presentation Layer                     │
│  (app/, components/) - UI Rendering & User Interaction   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Domain Layer                          │
│  (types/, constants/) - Business Rules & Data Models     │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                Infrastructure Layer                       │
│  (infrastructure/) - Data Access & External Integrations │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                           │
│  (data/) - JSON Files (Portfolio Content)                │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Complete Data Flow Diagram

```
User Request
     ↓
[app/[locale]/page.tsx] - Server Component
     ↓
[infrastructure/data.ts] - Data Fetching Functions
     ↓
[data/{locale}/] - JSON Files
     ↓
[types/] - TypeScript Interfaces
     ↓
[components/] - UI Components
     ↓
Render to User
```

### Step-by-Step Data Flow

#### 1. User Request

User visits the portfolio website at a specific locale (e.g., `/en` or `/vi`).

#### 2. Server Component (app/[locale]/page.tsx)

The main page component is a server component that fetches all necessary data:

```tsx
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Fetch data from infrastructure layer
  const experiences = await getExperience(locale);
  const profile = await getProfile(locale);
  const techStacks = await getTechStacks();
  const projects = await getProjects(locale);
  const educations = await getEducations(locale);
  const testimonials = await getTestimonials(locale);

  // Pass data to presentation layer
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection data={profile} />
        <TechStackSection data={techStacks} />
        <ExperiencesSection data={experiences} />
        <EducationSection data={educations} />
        <ProjectsSection data={projects} />
        <TestimonialSection data={testimonials} />
        <ContactSection />
        <CtaBannerSection />
      </main>
      <FooterSection />
    </div>
  );
}
```

#### 3. Infrastructure Layer (infrastructure/data.ts)

Data fetching functions read JSON files based on locale:

```tsx
export async function getProfile(locale: string = "en"): Promise<Profile> {
  const profileData = await import(`@data/${locale}/profile.json`);
  return profileData.default;
}

export async function getProjects(locale: string = "en"): Promise<Project[]> {
  const projectsData = await import(`@data/${locale}/projects.json`);
  return projectsData.default;
}

export async function getExperience(locale: string = "en"): Promise<Experience[]> {
  const experienceData = await import(`@data/${locale}/experience.json`);
  return experienceData.default.sort((a: Experience, b: Experience) => {
    const dateA = a.endDate ? new Date(a.endDate) : new Date();
    const dateB = b.endDate ? new Date(b.endDate) : new Date();
    return dateB.getTime() - dateA.getTime();
  });
}
```

#### 4. Data Layer (data/)

JSON files contain the actual portfolio content:

```
data/
├── en/
│   ├── profile.json
│   ├── projects.json
│   ├── educations.json
│   ├── experience.json
│   └── testimonials.json
└── vi/
    ├── profile.json
    ├── projects.json
    ├── educations.json
    ├── experience.json
    └── testimonials.json
```

#### 5. Domain Layer (types/)

TypeScript interfaces define the data structure:

```tsx
// types/profile.ts
export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  // ...
}

// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  // ...
}
```

#### 6. Presentation Layer (components/)

UI components receive typed data and render it:

```tsx
export function EducationSection({ data = [] }: EducationSectionProps) {
  const t = useTranslations("education");

  return (
    <section>
      <h2>{t("title") || "Education"}</h2>
      {data.map((item) => (
        <EducationCard key={item.id} item={item} />
      ))}
    </section>
  );
}
```

## Layer Responsibilities

### 1. Presentation Layer (app/, components/)

**Responsibilities:**
- Render UI components
- Handle user interactions
- Display data passed from parent components
- Manage component-level state (refs, local state)
- Execute animations (GSAP)
- Display translated content

**Key Files:**
- `app/[locale]/page.tsx` - Main page (server component)
- `app/[locale]/layout.tsx` - Root layout
- `app/layout.tsx` - Global layout
- `components/` - All UI components

**Characteristics:**
- "Dumb" components - receive data via props
- No business logic
- Focus on presentation and user experience

### 2. Domain Layer (types/, constants/)

**Responsibilities:**
- Define data models and interfaces
- Define business rules and validations
- Store static configuration
- Provide type safety across the application

**Key Files:**
- `types/` - TypeScript interfaces for all data models
- `constants/site.ts` - Site metadata, navigation, social links

**Characteristics:**
- Pure TypeScript, no runtime logic
- Shared across all layers
- Ensures type safety

### 3. Infrastructure Layer (infrastructure/)

**Responsibilities:**
- Fetch data from external sources (JSON files)
- Transform data if needed
- Provide a clean API for the presentation layer
- Handle data sorting, filtering, and aggregation

**Key Files:**
- `infrastructure/data.ts` - Data fetching functions

**Characteristics:**
- Async functions
- Returns typed data using interfaces from Domain Layer
- Abstracts data source details from Presentation Layer

### 4. Data Layer (data/)

**Responsibilities:**
- Store portfolio content as JSON files
- Organize data by locale (en, vi)
- Provide a simple, editable data source

**Key Files:**
- `data/en/*.json` - English content
- `data/vi/*.json` - Vietnamese content

**Characteristics:**
- Static JSON files
- Easy to edit without code changes
- No logic, just data

## Component Communication

### Server Components to Client Components

Data flows from server components to client components via props:

```
[app/[locale]/page.tsx] (Server)
    ↓ passes data via props
[components/education-section.tsx] (Client)
    ↓ passes item via props
[components/education-card.tsx] (Client)
```

### Component Hierarchy

```
HomePage (Server)
├── Navbar (Client)
├── HeroSection (Client)
├── TechStackSection (Client)
├── ExperiencesSection (Client)
│   └── ExperienceTimelineItem (Client)
├── EducationSection (Client)
│   └── EducationCard (Client)
├── ProjectsSection (Client)
│   └── ProjectCard (Client)
├── TestimonialSection (Client)
│   └── TestimonialCard (Client)
├── ContactSection (Client)
├── CtaBannerSection (Client)
└── FooterSection (Client)
```

## State Management

### Component-Level State

Local state is managed using React hooks:

```tsx
export function EducationSection({ data = [] }: EducationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("education");

  // State is local to component
  // No global state management needed
}
```

### No Global State

This project does not use global state management (Redux, Zustand, etc.) because:
- Data is fetched once on the server
- Components receive data via props
- Local state is sufficient for UI interactions
- Simpler architecture for a portfolio

## Animation Flow

### GSAP Animation Lifecycle

```
Component Mount
    ↓
useGSAP Hook / useEffect
    ↓
Register GSAP Plugins (if needed)
    ↓
Setup Animation Timeline
    ↓
Attach ScrollTrigger (if scroll-based)
    ↓
Component Unmount
    ↓
Cleanup (ctx.revert() or useGSAP auto-cleanup)
```

### Animation Patterns

#### Pattern 1: useGSAP Hook (Preferred)

```tsx
useGSAP(
  () => {
    gsap.fromTo(".education-card", { opacity: 0, y: 60 }, { opacity: 1, y: 0 });
  },
  { dependencies: [data], scope: containerRef },
);
```

#### Pattern 2: gsap.context (Alternative)

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animation logic
  }, containerRef);

  return () => ctx.revert();
}, [data]);
```

## i18n Flow

### Translation Flow

```
User selects locale (en/vi)
    ↓
[i18n/routing.ts] - Locale detection
    ↓
[i18n/request.ts] - Request middleware
    ↓
[app/[locale]/page.tsx] - Server component with locale
    ↓
[infrastructure/data.ts] - Fetch data for locale
    ↓
[data/{locale}/] - Load JSON for locale
    ↓
[components/] - Render with useTranslations
    ↓
[messages/{locale}/] - Load translation keys
    ↓
Display translated content
```

### Translation Usage

```tsx
// In component
const t = useTranslations("education");

<h2>{t("title") || "Education"}</h2>
<p>{t("description") || "Lorem ipsum..."}</p>
```

### Translation File Structure

```tsx
// messages/vi/education.ts
export const education = {
  title: "Học vấn",
  description: "...",
  viewAll: "Xem thêm",
};
```

## Key Architectural Decisions

### 1. Server-Side Data Fetching

**Decision:** Fetch data in server components, not client components.

**Rationale:**
- Faster initial page load
- Better SEO
- Reduces client-side JavaScript
- Data is static, doesn't need real-time updates

### 2. JSON Data Storage

**Decision:** Store portfolio content in JSON files instead of a database.

**Rationale:**
- Simple to edit without code changes
- No database setup required
- Easy to version control
- Sufficient for personal portfolio
- Fast to deploy

### 3. Clean Architecture

**Decision:** Follow Clean Architecture principles with clear layer separation.

**Rationale:**
- Easy to test each layer independently
- Easy to swap data sources (e.g., switch from JSON to CMS)
- Clear separation of concerns
- Maintainable and scalable codebase

### 4. TypeScript Strict Mode

**Decision:** Use TypeScript with strict mode and no `any` types.

**Rationale:**
- Catch errors at compile time
- Better IDE support with autocomplete
- Self-documenting code
- Prevents runtime errors

### 5. GSAP for Animations

**Decision:** Use GSAP instead of CSS animations for complex animations.

**Rationale:**
- More control over timing and sequencing
- ScrollTrigger for scroll-based animations
- Better performance for complex sequences
- Easier to maintain complex animation logic

## Future Extensibility

### Adding a CMS

The architecture makes it easy to switch from JSON files to a CMS:

1. Update `infrastructure/data.ts` to fetch from CMS API instead of JSON files
2. Keep the same TypeScript interfaces
3. No changes needed in components
4. No changes needed in types

### Adding API Routes

If backend functionality is needed:

1. Add API routes in `app/api/`
2. Infrastructure layer can call these routes
3. Presentation layer remains unchanged

### Adding State Management

If global state becomes necessary:

1. Add state management library (Zustand, Redux)
2. Wrap application with provider
3. Components can access global state
4. Data fetching can move to client side if needed

## Summary

The PortfolioV2 architecture follows Clean Architecture principles with:

- **Clear layer separation** - Presentation, Domain, Infrastructure, Data
- **Unidirectional data flow** - Data flows from JSON → Infrastructure → Components → UI
- **Type safety** - TypeScript interfaces ensure data integrity
- **Simplicity** - No unnecessary complexity for a portfolio
- **Extensibility** - Easy to add features or swap data sources

This architecture ensures the codebase is maintainable, testable, and scalable for future enhancements.
