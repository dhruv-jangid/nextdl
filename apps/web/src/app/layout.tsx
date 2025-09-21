import "server-only";
import "@/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "NextDL",
  description: "YouTube & Instagram Content Downloader",
  applicationName: "NextDL",
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
