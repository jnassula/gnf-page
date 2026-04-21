import type { NextConfig } from "next";

const repoName = "gnf-page";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
