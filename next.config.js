/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: false,
  presets: ['next/babel'],
  plugins: [['babel-plugin-styled-components', { fileName: true, displayName: true, pure: true }]],
  async rewrites() {
    return [
      {
        source: '/:pagination*',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
