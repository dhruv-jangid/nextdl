# Desktop Application

A cross-platform Electron desktop application for downloading content from YouTube and Instagram. Features offline conversion, automatic updates, and a modern UI built with React and Electron.

## Features

- **Platform Support**: Download from YouTube and Instagram
- **Content Types**: Videos, shorts, reels, posts, and TV content
- **Cross-Platform**: Windows, macOS, and Linux support
- **Offline Conversion**: Built-in yt-dlp and FFmpeg binaries
- **Automatic Updates**: Self-updating application via GitHub releases
- **Modern UI**: Built with React and Electron
- **Format Options**: MP4 video and MP3 audio conversion
- **Progress Tracking**: Real-time download progress with ETA and speed
- **Persistent Settings**: User preferences saved across sessions
- **Subtitle Options**: Multiple language support and embedding
- **Custom Save Location**: Choose where to save downloaded content
- **Tray Integration**: Minimize to system tray for background operation
- **Notifications**: Native OS notifications for completed downloads

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

This starts the Electron application in development mode with hot reload.

### Building

Build the application for production:

```bash
bun build
```

### Releasing

Create a production-ready distributable:

```bash
bun release
```

## Available Scripts

- `bun dev` - Start development mode with hot reload
- `bun build` - Build for production
- `bun release` - Create distributable packages
- `bun lint` - Run ESLint

## Bundled Binaries

The application bundles the following binaries:

- **yt-dlp**: For downloading content from YouTube and Instagram
- **FFmpeg**: For media conversion and processing

These binaries are automatically downloaded during the build process and packaged with the application.

## Automatic Updates

The application includes an automatic update system that checks for new releases on GitHub and updates itself when a new version is available. This is implemented using Electron's autoUpdater module.

## Build Output

The build process creates distributable packages for:

- Windows (.exe, .msi)
- macOS (.dmg)
- Linux (.AppImage, .deb, .rpm)

## Technologies

- **Framework**: Electron
- **UI Library**: React
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Components**: shadcn/ui, Radix UI
- **State Management**: React Context API
- **Storage**: Electron Store
- **Packaging**: Electron Builder
- **CI/CD Pipeline**: GitHub Actions for automated releases
- **Package Manager**: Bun

## Project Structure

```bash
src/
├── main/                   # Electron main process
│   ├── main.ts             # Main entry point
│   ├── preload.ts          # Preload script
│   └── utils.ts            # Utility functions
├── renderer/               # Electron renderer process
│   ├── components/         # UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Application pages
│   └── App.tsx             # Main React component
├── shared/                 # Shared between main and renderer
│   ├── constants.ts        # Application constants
│   └── types.ts            # TypeScript type definitions
└── utils/                  # Utility functions
    ├── downloadBinaries.ts # Binary downloader
    └── validators.ts       # Input validation
```
