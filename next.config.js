/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  presets: ['next/babel'],
  plugins: [['babel-plugin-styled-components', { fileName: true, displayName: true, pure: true }]],
};

module.exports = nextConfig;
