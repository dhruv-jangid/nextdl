import "@/app/globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/context/toastProvider";

export const metadata: Metadata = {
  title: "NextYT - YouTube to MP3/MP4 Converter",
  description: "Convert YouTube videos to MP3/MP4 with high quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
