/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/gallery',
        destination: '/#gallery',
        permanent: false,
      },
      {
        source: '/gallery/:slug',
        destination: '/?item=:slug#gallery',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
