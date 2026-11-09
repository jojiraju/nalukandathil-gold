/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Production builds can go to a separate folder (DIST=.next-build) so they never clash with `npm run dev`.
  distDir: process.env.DIST || ".next",
};

export default nextConfig;
