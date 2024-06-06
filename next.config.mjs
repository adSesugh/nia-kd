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
    swcMinify: true,
    env: {
        AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
        AWS_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    },
};

export default nextConfig;
