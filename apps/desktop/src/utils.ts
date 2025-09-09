import path from "path";
import { app } from "electron";

export const isValidUrl = (url: string) => {
  return (
    url.startsWith("https://youtu.be") ||
    url.startsWith("https://music.youtube.com")
  );
};

export const getBundledBinary = (name: string) => {
  if (!app.isPackaged) {
    return path.join(__dirname, "../../src/binaries", name);
  } else {
    return path.join(process.resourcesPath, "binaries", name);
  }
};
