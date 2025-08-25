import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: "./",
  distDir:
    process.env.NODE_ENV === "development" ? undefined : "../desktop/build/out",
};

export default nextConfig;
