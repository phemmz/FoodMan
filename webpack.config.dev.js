const path = require('path');

module.exports = {
  devtool: '#source-map',
  entry: [
    path.join(__dirname, '/src/App.jsx')
  ],
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /(\.(css|scss))$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty'
  }
};
