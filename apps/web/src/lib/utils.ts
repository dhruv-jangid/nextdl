import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const isValidUrl = (url: string) => {
  return (
    url.startsWith("https://youtu.be") ||
    url.startsWith("https://music.youtube.com")
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
