/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "192.168.0.46",
      "18.218.116.205",
      "3.139.104.102",
      "https://multistore.3utilities.com",
      "http://multistore.3utilities.com",
      "multistore.3utilities.com",
      "localhost:30001",
    ], // Agrega el dominio "localhost" aquí
  },
};

module.exports = nextConfig;
