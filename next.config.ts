import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Gemini API calls from server components
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
