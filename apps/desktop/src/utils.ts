import path from "path";
import { app } from "electron";

export const isValidUrl = (url: string) => {
  return (
    url.startsWith("https://youtu.be") ||
    url.startsWith("https://music.youtube.com")
  );
};

export const bestVideoArgs = (
  url: string,
  outTemplate: string,
  FFMPEG: string
) => {
  return [
    url,
    "-o",
    outTemplate,
    "--ffmpeg-location",
    FFMPEG,
    "-f",
    "bv+ba/best",
    "--merge-output-format",
    "mp4",
    "--newline",
    "--no-color",
  ];
};

export const bestAudioArgs = (
  url: string,
  outTemplate: string,
  FFMPEG: string
) => {
  return [
    url,
    "-o",
    outTemplate,
    "--ffmpeg-location",
    FFMPEG,
    "-f",
    "bestaudio/best",
    "--extract-audio",
    "--audio-format",
    "mp3",
    "--audio-quality",
    "0",
    "--postprocessor-args",
    "-b:a 320k",
    "--newline",
    "--no-color",
  ];
};

export const getBundledBinary = (name: string) => {
  if (!app.isPackaged) {
    return path.join(__dirname, "../../../src/binaries", name);
  } else {
    return path.join(process.resourcesPath, "binaries", name);
  }
};
