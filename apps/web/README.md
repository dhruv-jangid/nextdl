# Web Application

A modern Next.js web application for downloading content from YouTube and Instagram. Features a responsive interface built with shadcn/ui components, advanced format options, and real-time progress tracking.

## Features

- **Platform Support**: Download from YouTube and Instagram
- **Content Types**: Videos, shorts, reels, posts, and TV content
- **Modern UI**: Built with Next.js 15 and React 19
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Component Library**: UI components from shadcn/ui and Radix UI
- **TypeScript**: Full type safety and enhanced developer experience
- **Fast Development**: Hot reload and optimized build process with Turbopack
- **Theme Support**: Light/dark mode toggle with persistent preferences
- **Advanced Format Options**: Comprehensive audio/video format selection
- **Real-time Progress**: Live download progress with ETA, speed, and size tracking
- **Toast Notifications**: User-friendly feedback with Sonner
- **Persistent Settings**: User preferences saved across sessions
- **Subtitle Options**: Multiple language support and embedding
- **CI/CD Integration**: Automated builds and deployments with GitHub Actions

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

```bash
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
```
