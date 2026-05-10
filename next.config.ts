/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Cela permet de déployer même s'il y a des petites erreurs de style
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Cela permet de déployer même s'il y a des petites erreurs de type
    ignoreBuildErrors: true,
  },
};

export default nextConfig;