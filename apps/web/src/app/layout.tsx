import "server-only";
import "@/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "NextYT - YouTube to MP3/MP4",
  description: "Convert YouTube videos to MP3/MP4 with highest quality",
  applicationName: "NextYT",
  authors: { name: "Dhruv Jangid", url: "https://github.com/dhruv-jangid" },
  creator: "Dhruv Jangid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
