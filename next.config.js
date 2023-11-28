/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "192.168.0.46", "18.218.116.205", "localhost:30001"], // Agrega el dominio "localhost" aquí
  },
};

module.exports = nextConfig;
