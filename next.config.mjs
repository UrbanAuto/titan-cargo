const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '/titan-cargo') : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NEXT_DIST_DIR || '.next',
  basePath: base,
  assetPrefix: base || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: base },
};
export default nextConfig;
