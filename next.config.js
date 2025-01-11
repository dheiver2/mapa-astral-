// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
    }
    return config;
  },
};
