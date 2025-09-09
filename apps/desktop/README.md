# Desktop Application

A cross-platform Electron desktop application for converting YouTube videos to MP4/MP3 format. Built with TypeScript and Electron for optimal performance, featuring auto-updates, bundled binaries, and advanced format options.

## Features

- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Offline Conversion**: Convert videos without internet dependency using bundled binaries
- **Auto-Updater**: Seamless automatic updates with electron-updater
- **Bundled Binaries**: Includes yt-dlp and FFmpeg for standalone operation
- **Advanced Format Options**: Comprehensive audio/video format selection
- **Real-time Progress**: Live download progress with ETA, speed, and size tracking
- **Persistent Preferences**: User settings saved with Electron Store
- **Custom Download Locations**: Flexible download path management
- **Modern UI**: Built with Electron and modern web technologies
- **TypeScript**: Full type safety and better development experience

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

Start the application in development mode:

```bash
bun dev
```

This will bundle the TypeScript files and launch the Electron application.

### Building

Build the application for distribution:

```bash
bun build
```

This creates a distributable package using electron-builder.

### Publishing

Build and publish the application:

```bash
bun publish
```

## Available Scripts

- `bun dev` - Start in development mode (bundle + launch)
- `bun build` - Build the application for distribution
- `bun publish` - Build and publish the application
- `bun start` - Launch the built application
- `bun bundle` - Bundle TypeScript files with esbuild
- `bun transpile` - Transpile TypeScript to JavaScript

## Bundled Binaries

The application includes pre-compiled binaries for offline operation:

- **yt-dlp**: Latest YouTube downloader for video/audio extraction
- **FFmpeg**: Audio/video processing and conversion
- **FFprobe**: Media file analysis and metadata extraction

Binaries are automatically downloaded during the build process and bundled with the application.

## Auto-Updater

The desktop application features automatic updates:

- **Check for Updates**: Automatically checks for new versions on startup
- **Background Download**: Downloads updates in the background
- **Seamless Installation**: Installs updates and restarts the application
- **Progress Tracking**: Real-time update progress with user feedback
- **Error Handling**: Graceful error handling for update failures

## Build Output

The build process creates:

- `build/out/` - Bundled application files
- Distribution packages for different platforms
- Auto-updater configuration for seamless updates

## Technologies

- **Runtime**: Electron 37
- **Language**: TypeScript
- **Bundler**: esbuild
- **Builder**: electron-builder
- **Auto-updater**: electron-updater
- **Storage**: electron-store
- **Video Processing**: yt-dlp, FFmpeg
- **Package Manager**: Bun

## Project Structure

```
src/
├── main.ts              # Main Electron process
├── preload.ts           # Preload script for security
├── utils.ts             # Utility functions
├── generateArgs.ts      # yt-dlp argument generation
├── binaries/            # Bundled binaries
│   ├── ffmpeg.exe       # FFmpeg binary (Windows)
│   ├── ffprobe.exe      # FFprobe binary (Windows)
│   └── yt-dlp.exe       # yt-dlp binary (Windows)
└── icons/               # Application icons
    ├── icon.ico         # Windows icon
    ├── icon.icns        # macOS icon
    └── icon.png         # PNG icon
```
