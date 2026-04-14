# PortfolioV2

A modern, responsive personal portfolio website built with Next.js 16, TypeScript, and Tailwind CSS v4. This portfolio showcases work experience, education, projects, and skills with smooth animations using GSAP.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5 (Strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Animation**: GSAP 3.14.2 with @gsap/react 2.1.2
- **i18n**: next-intl
- **Smooth Scroll**: Lenis 1.3.20
- **Linting**: ESLint 9

## Features

- 🌍 Multi-language support (English/Vietnamese)
- 🌓 Dark mode with smooth transitions
- 📱 Fully responsive design (mobile-first)
- ✨ Smooth scroll animations with GSAP
- 🎨 Modern UI with shadcn/ui components
- 📊 Clean Architecture with separation of concerns
- 🎯 Type-safe with strict TypeScript

## Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
PorfolioV2/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── educations/       # Education section components
│   ├── experiences/      # Work experience components
│   ├── projects/         # Projects section components
│   ├── tech-stacks/      # Tech stack components
│   ├── testimonials/     # Testimonials section
│   ├── contact/          # Contact section
│   ├── hero/             # Hero section
│   ├── footer/           # Footer component
│   ├── navbar/           # Navigation bar
│   └── index.ts          # Barrel export
├── data/                 # JSON data files
│   ├── en/               # English data
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── educations.json
│   │   ├── experience.json
│   │   └── testimonials.json
│   └── vi/               # Vietnamese data
├── types/                # TypeScript interfaces
│   ├── education.ts
│   ├── experience.ts
│   ├── profile.ts
│   ├── project.ts
│   ├── skill.ts
│   ├── tech-stack.ts
│   ├── testimonial.ts
│   └── index.ts
├── constants/            # Static configuration
│   ├── site.ts           # Site metadata, navigation, social links
│   └── index.ts
├── infrastructure/       # Data fetching utilities
│   ├── data.ts           # Functions to read JSON data
│   └── index.ts
├── lib/                  # Utility functions
│   ├── utils.ts          # cn() utility for className merging
│   ├── helper.ts
│   └── index.ts
├── messages/             # i18n translation files
│   ├── en/
│   │   └── *.ts
│   └── vi/
│       └── *.ts
├── i18n/                 # i18n configuration
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── STANDARDS.md      # Coding standards
│   └── ARCHITECTURE.md   # Architecture documentation
├── .windsurfrules        # AI coding conventions
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## Data Management

Portfolio content is stored locally in JSON files under the `data/` directory:

- `profile.json` - Personal information
- `projects.json` - Project portfolio
- `educations.json` - Education history
- `experience.json` - Work experience
- `testimonials.json` - Client testimonials
- `skills.json` - Technical skills
- `tech-stack.json` - Technology stack

Data is fetched through the infrastructure layer using async functions defined in `infrastructure/data.ts`.

## Coding Standards

This project follows strict coding conventions defined in `.windsurfrules`. For detailed standards, see [docs/STANDARDS.md](docs/STANDARDS.md).

Key conventions:

- Function declarations for components (not arrow functions)
- Kebab-case filenames
- PascalCase component names
- Absolute imports with aliases (@components, @app-types, etc.)
- Barrel pattern for exports
- Strict TypeScript (no `any` types)
- cn() utility for className merging

## Architecture

For detailed architecture information, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

The project follows Clean Architecture principles:

- **Data Layer**: JSON files in `data/`
- **Infrastructure Layer**: Data fetching in `infrastructure/`
- **Domain Layer**: Types in `types/`, constants in `constants/`
- **Presentation Layer**: Components in `components/`, pages in `app/`

## Development

```bash
# Run with Turbo (recommended for faster dev)
yarn dev

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Build for production
yarn build
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
