"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans)",
          background: "var(--background)",
          borderRadius: "calc(var(--radius-2xl)",
          fontSize: "var(--text-sm)",
          lineHeight: "var(--tw-leading, var(--text-sm--line-height)",
          padding: "calc(var(--spacing) * 3) calc(var(--spacing) * 4.5)",
          gap: "calc(var(--spacing) * 2)",
        },
      }}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
