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
- **Tabbed Interface**: Organized settings with General, Video, Audio, and Advanced tabs
- **Theme Support**: Light/dark mode toggle with system preference detection
- **Comprehensive Format Options**: 8+ audio formats with detailed tooltips and quality information
- **Advanced Video Quality**: Resolution options from 144p to 4320p (8K) with container selection
- **Smart Presets**: "Best" quality preset or "Custom" for full control
- **Advanced Features**: Cookies support for rate limit bypass (Beta)
- **Real-time Progress**: Live download progress with ETA, speed, and size tracking
- **Toast Notifications**: User-friendly feedback with Sonner
- **Persistent Settings**: User preferences saved across sessions with download directory management
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
- **UI Components**: Card, Tabs, RadioToggleGroup, ToggleGroup
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
│   │   ├── card.tsx        # Card layout component
│   │   ├── dialog.tsx      # Modal dialog component
│   │   ├── input.tsx       # Input field component
│   │   ├── radio-toggle-group.tsx # Radio toggle group component
│   │   ├── sonner.tsx      # Toast notification component
│   │   ├── tabs.tsx        # Tab navigation component
│   │   ├── toggle-group.tsx # Toggle group component
│   │   └── tooltip.tsx     # Tooltip component
│   ├── providers/          # Context providers
│   │   └── preferencesProvider.tsx
│   ├── advanced-tab.tsx    # Advanced settings tab
│   ├── audio-tab.tsx       # Audio format options tab
│   ├── general-tab.tsx     # General settings tab
│   ├── input-url.tsx       # URL input component
│   ├── loading.tsx         # Loading progress component
│   ├── options.tsx         # Main options dialog
│   └── video-tab.tsx       # Video format options tab
```
