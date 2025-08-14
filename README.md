# NextYT

A modern desktop application for converting YouTube videos to MP3/MP4 format with high quality. Built with Next.js, Electron, and TypeScript.

## Features

- **MP3 Conversion**: Download YouTube videos as high-quality MP3 audio files
- **MP4 Conversion**: Download YouTube videos as MP4 video files
- **Fast Downloads**: Optimized for speed and efficiency
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Auto-updates**: Automatic application updates via GitHub releases
- **Cross-platform**: Works on Windows, macOS, and Linux

## Installation

### Download from Releases

Visit the [Releases page](https://github.com/dhruv-jangid/nextyt/releases) to download the latest version for your platform:

- **Windows**: `.exe` installer
- **macOS**: `.dmg` file
- **Linux**: `.AppImage` file

### Build from Source

1. **Clone the repository**

   ```bash
   git clone https://github.com/dhruv-jangid/nextyt.git
   cd nextyt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   npm run electron:build
   ```

## Usage

1. **Launch NextYT** from your applications menu
2. **Choose format**: Toggle between MP3 and MP4 using the switch
3. **Paste URL**: Enter a YouTube video URL in the input field
4. **Download**: Click the download button and wait for completion
5. **Find files**: Downloaded files are saved to your default downloads folder

## Development

### Prerequisites

- Node.js 20+
- npm or yarn
- FFmpeg, FFprobe, yt-dlp (automatically handled by CI/CD)

### Development Commands

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Build Electron app
npm run electron:build

# Publish release
npm run publish
```

### Project Structure

```
nextyt/
├── app/                 # Next.js app directory
├── components/          # React components
├── context/            # React context providers
├── lib/                # Utility functions
├── main/               # Electron main process
├── .github/            # GitHub Actions workflows
└── electron-builder.yml # Electron build configuration
```

## Technologies Used

- **Frontend**: Next.js, TypeScript
- **Desktop**: Electron
- **Styling**: Tailwind CSS, shadcn/ui
- **Build Tools**: Turbopack (Next.js), electron-builder
- **Media Processing**: yt-dlp, FFmpeg

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - YouTube downloader
- [FFmpeg](https://ffmpeg.org/) - Media processing
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Electron](https://www.electronjs.org/) - Desktop framework

---

**Note**: This application is for personal use only. Please respect YouTube's terms of service and copyright laws when downloading content.
