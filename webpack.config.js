const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getPublicPath() {
  return process.env.NODE_ENV === 'production' ? 'https://webyom.github.io/pant/demos/' : '/demos/';
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: './src/demos/scripts/main.ts',
  },
  output: {
    publicPath: getPublicPath(),
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'docs/demos'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/demos/index.ejs',
      minify: true,
    }),
  ],
};
