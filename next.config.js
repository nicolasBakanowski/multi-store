/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "192.168.0.46",
      "https://multistore.3utilities.com",
      "localhost:30001",
    ], // Agrega el dominio "localhost" aquí
  },
};

module.exports = nextConfig;
