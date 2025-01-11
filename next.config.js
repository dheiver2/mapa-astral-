// next.config.js
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // Adiciona o node-loader para arquivos .node
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    // Retorna a configuração atualizada
    return config;
  },
};
