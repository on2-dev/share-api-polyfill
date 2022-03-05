const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  const config = {
    devtool: 'source-map',
    entry: './src/share.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: (argv.mode === 'production') ? 'share-min.js' : 'share.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  };

  return config;
}
