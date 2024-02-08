/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Add URL patterns for allowed remote image domains
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        ],
    },
};

export default nextConfig;
