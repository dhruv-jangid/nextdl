"use client";

import { Toaster } from "./ui/sonner";
import { ThemeProvider } from "next-themes";
import { PreferencesProvider } from "./providers/preferencesProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PreferencesProvider>
        {children}
        <Toaster />
      </PreferencesProvider>
    </ThemeProvider>
  );
};
