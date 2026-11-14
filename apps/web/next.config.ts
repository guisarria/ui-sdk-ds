import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@ui-sdk-ds/ui"],
  reactCompiler: true,
}

export default nextConfig
