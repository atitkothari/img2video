/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mimg2video.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mimg2video.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/frames/**',
      },
      {
        protocol: 'https',
        hostname: 'mimg2video.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/test/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 