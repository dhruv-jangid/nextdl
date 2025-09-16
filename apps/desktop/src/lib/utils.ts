import path from "path";
import { app } from "electron";

export const isValidUrl = (url: string): boolean => {
  try {
    const { hostname, pathname, searchParams } = new URL(url);

    const validHosts = new Set([
      "youtu.be",
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "music.youtube.com",
    ]);

    if (!validHosts.has(hostname)) {
      return false;
    }

    if (hostname === "youtu.be") {
      return pathname.length > 1;
    }
    if (pathname === "/watch") {
      return searchParams.has("v");
    }
    if (pathname.startsWith("/embed/")) {
      return pathname.split("/")[2]?.length > 0;
    }
    if (pathname.startsWith("/shorts/")) {
      return pathname.split("/")[2]?.length > 0;
    }

    return false;
  } catch {
    return false;
  }
};

export const getBundledBinary = (name: string) => {
  if (!app.isPackaged) {
    return path.join(__dirname, "../../src/binaries", name);
  } else {
    return path.join(process.resourcesPath, "binaries", name);
  }
};
