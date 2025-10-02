import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const isValidUrl = (url: string): boolean => {
  try {
    const { hostname, pathname, searchParams } = new URL(url);

    const validYouTubeHosts = new Set([
      "youtu.be",
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "music.youtube.com",
    ]);

    if (validYouTubeHosts.has(hostname)) {
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
      if (pathname.startsWith("/live/")) {
        return pathname.split("/")[2]?.length > 0;
      }
      return false;
    }

    const validInstagramHosts = new Set([
      "instagram.com",
      "www.instagram.com",
      "m.instagram.com",
    ]);

    if (validInstagramHosts.has(hostname)) {
      if (pathname.startsWith("/p/")) {
        const segments = pathname.split("/");
        return segments.length >= 3 && segments[2]?.length > 0;
      }
      if (pathname.startsWith("/reel/")) {
        const segments = pathname.split("/");
        return segments.length >= 3 && segments[2]?.length > 0;
      }
      if (pathname.startsWith("/tv/")) {
        const segments = pathname.split("/");
        return segments.length >= 3 && segments[2]?.length > 0;
      }
      return false;
    }

    return false;
  } catch {
    return false;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
