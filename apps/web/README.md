# Web Application

A modern Next.js web application for converting YouTube videos to MP4/MP3 format. Features a beautiful, responsive interface built with shadcn/ui components, advanced format options, and real-time progress tracking.

## Features

- **Modern UI**: Built with Next.js 15 and React 19
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Component Library**: Beautiful UI components from shadcn/ui and Radix UI
- **TypeScript**: Full type safety and enhanced developer experience
- **Fast Development**: Hot reload and optimized build process with Turbopack
- **Theme Support**: Light/dark mode toggle with persistent preferences
- **Advanced Format Options**: Comprehensive audio/video format selection
- **Real-time Progress**: Live download progress with ETA, speed, and size tracking
- **Toast Notifications**: User-friendly feedback with Sonner
- **Persistent Settings**: User preferences saved across sessions

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

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: TailwindCSS 4
- **Components**: shadcn/ui, Radix UI
- **State Management**: React Context API
- **Notifications**: Sonner (toast notifications)
- **Icons**: Lucide React
- **Theme**: next-themes
- **Package Manager**: Bun

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
├── components/              # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx      # Button component
│   │   ├── dialog.tsx      # Modal dialog component
│   │   ├── input.tsx       # Input field component
│   │   ├── select.tsx      # Select dropdown component
│   │   ├── sonner.tsx      # Toast notification component
│   │   └── tooltip.tsx     # Tooltip component
│   ├── providers/          # Context providers
│   │   └── preferencesProvider.tsx
│   ├── audioOptions.tsx    # Audio format options
│   ├── videoOptions.tsx    # Video format options
│   ├── themeToggle.tsx     # Theme switcher
│   └── providers.tsx       # Provider wrapper
├── lib/                    # Utility libraries
│   └── utils.ts            # Utility functions
└── globals.css             # Global styles
```

## UI Components

The application uses shadcn/ui and Radix UI components for a consistent and beautiful design:

- **Button**: Multiple variants (default, outline, ghost)
- **Input**: Text input with validation and styling
- **Select**: Dropdown selection with search
- **Dialog**: Modal dialogs for settings and options
- **Tooltip**: Contextual help and information
- **Toast**: Notification system with Sonner
- **Theme Toggle**: Light/dark mode switcher

## Advanced Features

- **Format Options**: Comprehensive audio/video format selection with tooltips
- **Progress Tracking**: Real-time download progress with ETA and speed
- **Preferences**: Persistent user settings with Electron Store
- **Theme Support**: System-aware theme switching
- **Responsive Design**: Mobile-first responsive layout

## Development Features

- **Turbopack**: Fast development server with Next.js 15
- **Hot Reload**: Instant feedback during development
- **TypeScript**: Compile-time error checking and type safety
- **ESLint**: Code quality and consistency
- **TailwindCSS 4**: Utility-first CSS framework
- **Component Library**: Reusable UI components with shadcn/ui
