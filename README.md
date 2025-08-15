# NextYT

YouTube to MP4/MP3 downloader built with Next.js and Electron.

## Features

- Download YouTube videos as MP4 or MP3
- **Flexible download modes**:
  - **Prompt each time**: Choose save location and filename for every download
  - **Single folder**: Set one download folder for all downloads
- Progress tracking with real-time updates
- Automatic updates
- Cross-platform support (Windows, macOS, Linux)

## Usage

1. **Enter YouTube URL**: Paste any YouTube video URL in the input field
2. **Choose Format**: Toggle between MP3 and MP4 using the switch
3. **Select Download Mode**: Choose between "Prompt Each Time" or "Single Folder"
4. **Configure Location** (if using Single Folder): Click "Choose Folder" to select a download directory
5. **Download**: Click the Download button to start the download
6. **Monitor Progress**: Watch the progress bar and status updates

## Download Modes

### Prompt Each Time Mode

- **Save Dialog**: Each download prompts you to choose exactly where to save the file and what to name it
- **Flexible**: You can save to different locations and use different filenames for each download
- **User Control**: Full control over file naming and location for every download

### Single Folder Mode

- **Consistent Location**: All downloads go to the same folder you select
- **Automatic Naming**: Files are automatically named using the video title
- **Batch Downloads**: Perfect for downloading multiple videos to the same location

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev:next      # Next.js dev server
npm run dev:electron  # Electron app

# Build for production
npm run build

# Start production build
npm start
```

## Technical Details

- **Frontend**: Next.js 15 with React 19
- **Desktop**: Electron with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Download Engine**: yt-dlp with FFmpeg for conversion
- **IPC**: Dual-mode download handling via Electron dialog API
