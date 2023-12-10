/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        mongo_url: "mongodb://localhost:27017",
        db_name: "aptofy_t69"
    }
};

module.exports = nextConfig;
