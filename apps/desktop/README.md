# Desktop Application

A cross-platform Electron desktop application for converting YouTube videos to MP4/MP3 format. Built with TypeScript and Electron for optimal performance and user experience.

## Features

- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Offline Conversion**: Convert videos without internet dependency
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

## Build Output

The build process creates:

- `build/out/` - Bundled application files
- Distribution packages for different platforms

## Technologies

- **Runtime**: Electron
- **Language**: TypeScript
- **Bundler**: esbuild
- **Builder**: electron-builder
- **Package Manager**: Bun

## Project Structure

```
src/
├── main.ts          # Main Electron process
├── preload.ts       # Preload script for security
├── utils.ts         # Utility functions
└── icons/           # Application icons
```
