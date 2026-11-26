import path from "path";
import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/portfolio" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? "export" : undefined,
  basePath,
  assetPrefix: isGithubPages ? "/portfolio/" : undefined,
  trailingSlash: isGithubPages,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
