/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/case-studies', destination: '/projects', permanent: true },
      { source: '/case-studies/:slug', destination: '/projects/:slug', permanent: true },
    ];
  },
};
