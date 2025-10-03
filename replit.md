# Career Catalyst - Portfolio Website

## Overview

Career Catalyst is a professional portfolio website for Elroy Vaz, offering dual-audience services: career guidance for individuals (students, graduates, and professionals) and strategic HR consulting for SMEs. The site features a modern, polished design with interactive pricing sections, contact forms, and payment integration via Razorpay.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **React 18** with **Vite** for fast development and optimized production builds
- **TypeScript** for type safety across the application
- **Wouter** for lightweight client-side routing

**UI Component System**
- **Shadcn/ui** component library following the "New York" style preset
- **Radix UI** primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **CSS Variables** for theming support (light/dark modes prepared)

**Design Philosophy**
- Inspired by leadcrestconsulting.com's polished UI/UX
- Glassmorphism effects on navbar and premium cards
- Custom color palette: Soft slate blue primary (#607D8B), muted teal accent (#4DB6AC), warm sand secondary (#F4A460)
- Typography: Lato for headings, Open Sans for body text
- Smooth animations using Intersection Observer API for scroll-triggered effects

**State Management**
- **TanStack Query (React Query)** for server state management
- **React Hook Form** with Zod validation for form handling
- Custom hooks for mobile detection and toast notifications

### Backend Architecture

**Server Framework**
- **Express.js** server with TypeScript
- Middleware for JSON parsing, URL encoding, and request logging
- Custom error handling with status code detection

**API Design**
- RESTful endpoints under `/api` prefix
- Contact inquiry management (POST /api/contact, GET /api/contact, PATCH /api/contact/:id/status)
- Payment tracking endpoints (creation and updates)
- Statistics endpoint for admin dashboard metrics

**Data Layer**
- **Drizzle ORM** for type-safe database queries
- **PostgreSQL** via Neon serverless (configured but flexible for other Postgres providers)
- Schema-first approach with shared types between client and server
- Migration support via drizzle-kit

**Database Schema**
- `contact_inquiries`: Stores contact form submissions with status tracking (pending/contacted/completed)
- `payments`: Tracks Razorpay payment transactions with customer details and payment status

### External Dependencies

**Payment Processing**
- **Razorpay** integration for handling pricing plan purchases
- Client-side Razorpay checkout script loaded via CDN
- Server-side payment verification and status tracking
- Environment variable configuration for API keys

**Database**
- **Neon Serverless PostgreSQL** as the primary database provider
- Connection pooling via @neondatabase/serverless
- DATABASE_URL environment variable for connection string

**Third-Party Services**
- **Google Fonts** (Lato and Open Sans) loaded via CDN for typography
- **Replit-specific plugins** for development (cartographer, dev banner, runtime error overlay)

**UI Component Libraries**
- Extensive Radix UI component suite (dialogs, dropdowns, navigation, forms, etc.)
- Embla Carousel for testimonial/content sliders
- Lucide React for iconography

**Development Tools**
- ESBuild for server-side bundling
- PostCSS with Autoprefixer for CSS processing
- TSX for TypeScript execution in development
- Drizzle Kit for database migrations

**Form & Validation**
- React Hook Form for performant form handling
- Zod for schema validation
- @hookform/resolvers for integration between the two

**Utilities**
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge for className composition
- date-fns for date formatting
- nanoid for unique ID generation