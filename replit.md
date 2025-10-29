# City Companion Directory App

## Overview

City Companion is a city directory web application that helps users discover and navigate to various locations across Bangalore and Mangalore. The application provides categorized listings for shopping, dining, events, hospitals, bus timing information, and schools/colleges, with integrated mapping capabilities and real-time traffic updates. Built with a modern tech stack, it offers a Material Design-inspired interface optimized for quick access to city services and location information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (instead of React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Material Design principles with inspiration from Google Maps, Zomato, and Yelp
- Custom CSS variables for theming with light/dark mode support
- Inter font family from Google Fonts for typography

**State Management**
- React Query for server state (location data, traffic updates)
- Local component state with React hooks for UI state
- No global state management library (Redux/Zustand) - keeping state localized

**Design System**
- Custom spacing primitives using Tailwind's scale (2, 4, 6, 8, 12, 16)
- Elevation system for card depth and hover states
- Responsive breakpoints: mobile-first approach with md (768px) and lg breakpoints
- Custom border radius values (sm: 3px, md: 6px, lg: 9px)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the REST API
- Node.js runtime environment (ESM modules)
- Custom middleware for request logging and JSON parsing

**Data Storage**
- In-memory storage (MemStorage class) for location and traffic data
- Designed for future migration to PostgreSQL with Drizzle ORM
- Database configuration present (drizzle.config.ts) for Neon PostgreSQL

**API Design**
- RESTful endpoints:
  - `GET /api/locations/:city` - Fetch all locations for a city
  - `GET /api/locations/:city/:category` - Fetch locations by city and category
  - `GET /api/traffic/:city` - Fetch traffic updates for a city
- Type-safe data models using Zod schemas
- Consistent error handling with HTTP status codes

**Development Environment**
- Vite dev server with middleware mode for API proxying
- Hot Module Replacement (HMR) for rapid development
- Development-only plugins: Replit cartographer and dev banner

### Data Models

**Location Entity**
- Fields: id, name, category, city, address, phone, hours, description, rating, reviewCount, latitude, longitude, imageUrl, amenities, isOpen
- Categories: shopping, dining, events, hospitals, bus-timing, schools
- Cities: bangalore, mangalore

**Traffic Update Entity**
- Fields: id, city, routeName, status (low/moderate/heavy), eta, lastUpdated
- Provides real-time traffic information for city routes

### Routing Strategy

**Client-Side Routing**
- `/` - Home page with city selection cards
- `/city/:cityId` - City detail page with category tabs and location listings
- Wouter chosen for lightweight routing (smaller bundle than React Router)

**Server-Side Rendering**
- Vite handles HTML template serving in development
- Production build serves static HTML with client-side hydration

### Component Architecture

**Key Components**
- `LocationCard` - Displays individual location details with call/navigate actions
- `MapView` - Placeholder map interface with Google Maps integration hooks
- `TrafficPanel` - Real-time traffic status display
- `CityCard` - Interactive city selection cards on home page

**Component Patterns**
- Presentational/Container separation for location cards
- Compound component pattern for UI primitives (Accordion, Tabs, etc.)
- Controlled components for forms and inputs
- Custom hooks for mobile detection and toast notifications

## External Dependencies

### UI Libraries
- **Radix UI** - Headless component primitives (@radix-ui/react-*)
- **Shadcn/ui** - Pre-styled component library built on Radix UI
- **Lucide React** - Icon library for consistent iconography
- **class-variance-authority** - Type-safe variant styling
- **cmdk** - Command palette component
- **Embla Carousel** - Touch-friendly carousel component

### Data Fetching & Forms
- **TanStack Query** (@tanstack/react-query) - Async state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation and TypeScript type inference
- **@hookform/resolvers** - Validation resolver for React Hook Form

### Database & ORM
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **@neondatabase/serverless** - Serverless PostgreSQL driver for Neon
- **drizzle-zod** - Zod schema generation from Drizzle tables
- **connect-pg-simple** - PostgreSQL session store (for future session management)

### Build & Development Tools
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety across the stack
- **esbuild** - Fast JavaScript bundler for production builds
- **tsx** - TypeScript execution for development server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing with Autoprefixer

### Date & Utility Libraries
- **date-fns** - Date manipulation and formatting
- **clsx** - Conditional className utility
- **nanoid** - Unique ID generation

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal** - Development error overlay
- **@replit/vite-plugin-cartographer** - Code navigation (dev only)
- **@replit/vite-plugin-dev-banner** - Development environment indicator

### Future Integrations
- **Google Maps API** - For interactive maps and navigation (currently using placeholder with external links)
- **PostgreSQL Database** - Configured but not yet connected (DATABASE_URL environment variable required)
- **Session Management** - connect-pg-simple installed for future authentication features