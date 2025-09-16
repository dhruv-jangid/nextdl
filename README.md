# NextYT

A modern YouTube to MP4/MP3 converter built with Next.js and Electron, featuring a beautiful web interface and cross-platform desktop application with advanced customization options.

## Features

### Web Application

- Modern Next.js 15 interface with shadcn/ui components
- Responsive design optimized for all devices
- Real-time conversion status and progress tracking
- Advanced audio/video format options with tooltips
- Theme toggle (light/dark mode)
- Persistent user preferences
- Toast notifications for user feedback

### Desktop Application

- Cross-platform Electron app for offline conversion
- Native system integration and notifications
- Standalone operation without internet dependency
- Auto-updater with seamless update experience
- Bundled yt-dlp and FFmpeg binaries
- Custom download location management
- Advanced format selection (audio/video)

### Advanced Format Options

- **Audio Formats**: MP3, AAC, M4A, FLAC, ALAC, WAV, OPUS, VORBIS
- **Video Formats**: 144p to 4320p (8K) quality options
- **Containers**: MP4, WEBM, MKV, MOV
- **Audio Quality**: 64k to 320k bitrate options
- **Custom Presets**: Best quality or custom advanced settings
- **Subtitle Options**: Multiple language support and embedding

### Technical Excellence

- Full TypeScript implementation for type safety
- Monorepo architecture optimized with Turborepo
- Modern UI framework with TailwindCSS 4 and shadcn/ui
- Cross-platform compatibility (Windows, macOS, Linux)
- Electron Store for persistent preferences
- Real-time progress tracking with ETA and speed
- GitHub Actions CI/CD pipeline for automated releases

## Project Structure

```bash
nextyt/
├── apps/
│   ├── web/         # Next.js web application
│   └── desktop/     # Electron desktop application
├── packages/
│   ├── scripts/     # Build and utility scripts
│   └── types/       # Shared TypeScript types
└── turbo.json       # Turborepo configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.21 or higher)
- Node.js (v18 or higher)

### Installation

Install all dependencies:

```bash
bun install
```

### Development

Start all applications in development mode:

```bash
bun dev
```

Start specific applications:

```bash
bun dev:web        # Start only the web application
bun dev:desktop    # Start only the desktop application
```

### Building

Build all applications:

```bash
bun build
```

Build specific applications:

```bash
bun build:web      # Build web application
bun build:desktop  # Build desktop application
```

## Available Scripts

- `bun dev` - Start all applications in development mode
- `bun build` - Build all applications
- `bun dev:web` - Start only the web application
- `bun dev:desktop` - Start only the desktop application
- `bun check-types` - Check TypeScript types across all apps
- `bun cleanall` - Clean all build artifacts and node_modules
- `bun publish` - Build and publish desktop application

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4, shadcn/ui components, Radix UI
- **Desktop**: Electron 37, esbuild, electron-builder
- **State Management**: React Context, Electron Store
- **Notifications**: Sonner (toast notifications)
- **Icons**: Lucide React
- **Build System**: Turborepo, Bun
- **Package Manager**: Bun 1.2.21
- **Video Processing**: yt-dlp, FFmpeg (bundled)
- **Auto-updater**: electron-updater
