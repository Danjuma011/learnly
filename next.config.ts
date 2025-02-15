import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export', // For static site generation
//   experimental: {
//     buildCache: true, // Enable build caching
//   },
// };

// module.exports = nextConfig;