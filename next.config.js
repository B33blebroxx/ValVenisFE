module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => ({
    ...config,
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
    },
  }),
};
