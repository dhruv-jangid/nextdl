# Web Application

A modern Next.js web application for converting YouTube videos to MP4/MP3 format. Features a beautiful, responsive interface built with shadcn/ui components and TailwindCSS.

## Features

- **Modern UI**: Built with Next.js 15 and React 19
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Component Library**: Beautiful UI components from shadcn/ui
- **TypeScript**: Full type safety and enhanced developer experience
- **Fast Development**: Hot reload and optimized build process

## Development

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.21 or higher)
- Node.js (v18 or higher)

### Installation

Install dependencies:

```bash
bun install
```

### Development Mode

Start the development server:

```bash
bun dev
```

This starts the Next.js development server with Turbopack for fast refresh.

### Building

Build the application for production:

```bash
bun build
```

### Starting Production Server

Start the production server:

```bash
bun start
```

## Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: TailwindCSS 4
- **Components**: shadcn/ui, Radix UI
- **State Management**: React Query (TanStack Query)
- **Package Manager**: Bun

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout component
│   └── page.tsx      # Home page component
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── preferencesProvider.tsx
│   └── toastProvider.tsx
├── lib/              # Utility libraries
│   ├── shadcnUtils.ts
│   └── utils.ts
└── globals.css       # Global styles
```

## UI Components

The application uses shadcn/ui components for a consistent and beautiful design:

- Button components with variants
- Input fields with validation
- Progress indicators
- Select dropdowns
- Toast notifications

## Development Features

- **Turbopack**: Fast development server
- **Hot Reload**: Instant feedback during development
- **TypeScript**: Compile-time error checking
- **ESLint**: Code quality and consistency
- **TailwindCSS**: Utility-first CSS framework
