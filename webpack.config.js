const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point of your application
  entry: './src/index.js',

  // Output configuration for the bundled files
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Ensures proper resolution of assets
  },

  // Set development mode and add source maps for easier debugging
  mode: 'development',
  devtool: 'eval-source-map',

  // Module rules for processing different file types
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Transpile JavaScript if needed
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Resolves CSS imports
        ],
      },
    ],
  },

  // Plugins to extend webpack functionality
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enables HMR for faster development
    new HtmlWebpackPlugin({
      template: './src/template.html', // Uses your custom HTML template
      inject: true,
    }),
  ],

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve from 'dist' where output is generated
    },
    hot: true,      // Enable Hot Module Replacement
    compress: true, // Enable gzip compression for better performance
    port: 8080,     // Port number for the dev server
    open: true,     // Automatically open the browser when the server starts
    historyApiFallback: true, // Support for single-page applications routing
  },

  // Watch options to control file watching behavior
  watchOptions: {
    poll: 100,          // Check for changes every 100ms (adjust if needed)
    ignored: /node_modules/, // Exclude node_modules for performance
  },
};
