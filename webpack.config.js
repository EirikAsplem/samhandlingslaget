var combineLoaders = require('webpack-combine-loaders')

module.exports = {
  entry: './src/client.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[local]'//'[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
