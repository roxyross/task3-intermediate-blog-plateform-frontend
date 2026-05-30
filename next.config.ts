import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    
    // If the destination would be the same as the source, don't add the rewrite
    if (apiUrl === "/api/v1" || apiUrl === "/api/v1/") {
      return [];
    }

    // Ensure apiUrl doesn't end with a slash
    if (apiUrl.endsWith("/")) {
      apiUrl = apiUrl.slice(0, -1);
    }

    // Ensure it's a valid absolute URL or relative path
    const destination = (apiUrl.startsWith("http") || apiUrl.startsWith("/")) 
      ? `${apiUrl}/:path*` 
      : `https://${apiUrl}/:path*`;

    return [
      {
        source: "/api/v1/:path*",
        destination: destination,
      },
    ];
  },
};

export default nextConfig;
