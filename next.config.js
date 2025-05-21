/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mimg2video.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/frames/**',
      },
    ],
  },
};

module.exports = nextConfig; 