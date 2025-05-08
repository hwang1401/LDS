const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@icons': path.resolve(__dirname, 'shared/tokens/icons')
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  }
}; 