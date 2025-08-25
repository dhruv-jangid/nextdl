import "server-only";
import "@/globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/components/toastProvider";
import { PreferencesProvider } from "@/components/preferencesProvider";

export const metadata: Metadata = {
  title: "NextYT - YouTube to MP3/MP4",
  description: "Convert YouTube videos to MP3/MP4 with highest quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <ToastProvider>
          <PreferencesProvider>{children}</PreferencesProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
