import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nia-kd.s3.us-east-1.amazonaws.com'
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
    webpack: (config) => {
        const pdfWorkerPath = `./node_modules/pdfjs-dist/build/pdf.worker.min.mjs`;

        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: pdfWorkerPath,
                        to: path.resolve(process.cwd(), 'public'),
                    },
                ],
            })
        );
    
        return config;
    },
};

export default nextConfig;
