import "@/app/globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/context/toastProvider";
import { PreferencesProvider } from "@/context/preferencesProvider";

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
        <PreferencesProvider>
          <ToastProvider>{children}</ToastProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
