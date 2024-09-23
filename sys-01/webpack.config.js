const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'web-build'),
    filename: 'bundle.web.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript and JSX files
        exclude: /node_modules\/(?!((react-native-vector-icons|@expo|expo-linear-gradient|react-native-paper|react-native-reanimated|react-native-gesture-handler|react-native-vector-icons)\/)).*/, // Include specific libraries
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react', // For React
              // '@babel/preset-flow' // Uncomment if using Flow
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/, // File loader for images
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Keep original name and extension
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/, // Font file loader
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx'],
    fallback: {
      crypto: require.resolve('crypto-browserify'), // Polyfill for crypto
      stream: require.resolve('stream-browserify'), // Polyfill for stream
      vm: require.resolve('vm-browserify'), // Polyfill for vm
    },
  },
};
