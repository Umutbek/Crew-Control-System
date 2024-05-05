const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point to your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('process.env')
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
