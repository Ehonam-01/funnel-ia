/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cette option aide souvent pour les déploiements sur Netlify
  output: 'standalone', 
};

export default nextConfig;