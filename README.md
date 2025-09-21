# NextDL

NextDL is a modern content downloader for YouTube and Instagram built with Next.js and Electron. It features a responsive web interface and cross-platform desktop application with advanced customization options.

## Key Features

### Platform Support

- Download from **YouTube** videos, shorts, and playlists
- Download from **Instagram** posts, reels, and TV content
- Cross-platform support for Windows, macOS, and Linux

### Web Application

- Modern Next.js 15 interface with shadcn/ui components
- Responsive design for all devices
- Real-time conversion status and progress tracking
- Advanced audio/video format options
- Light/dark mode theme toggle
- Persistent user preferences
- Toast notifications for user feedback

### Desktop Application

- Offline operation without internet dependency
- Automatic updates with seamless experience
- Bundled yt-dlp and FFmpeg binaries
- Custom download location management
- Native system integration and notifications

### Media Format Support

- **Audio Formats**: MP3, AAC, M4A, FLAC, ALAC, WAV, OPUS, VORBIS
- **Video Formats**: Resolution options from 144p to 4320p (8K)
- **Container Formats**: MP4, WEBM, MKV, MOV
- **Audio Quality**: Bitrate options from 64k to 320k
- **Custom Settings**: Presets for best quality or advanced custom options
- **Subtitle Support**: Multiple language options and embedding

### Technical Architecture

- Full TypeScript implementation for type safety
- Monorepo architecture with Turborepo
- Modern UI with TailwindCSS 4 and shadcn/ui components
- Persistent storage with Electron Store
- Real-time progress tracking with ETA and speed indicators
- Automated releases via GitHub Actions CI/CD pipeline

## Project Structure

```bash
nextdl/
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
- `bun down` - Download required binaries for desktop app

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4, shadcn/ui components, Radix UI
- **Desktop**: Electron 37, esbuild, electron-builder
- **State Management**: React Context, Electron Store
- **Notifications**: Sonner toast notifications
- **Icons**: Lucide React
- **Build System**: Turborepo, Bun
- **Package Manager**: Bun 1.2.21
- **Media Processing**: yt-dlp, FFmpeg (bundled)
- **Updates**: electron-updater
