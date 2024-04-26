/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nia-kd.s3.amazonaws.com',
            },
        ],
    },
    reactStrictMode: true,
    swcMinify: true
};

export default nextConfig;
