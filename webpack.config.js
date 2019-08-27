const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = ({ mode }) => {
  const isProduction = mode === 'production';

  return {
    mode,
    entry: 'src/index.ts',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
      ],
    },
    plugins: [
      isProduction ? new MiniCssExtractPlugin() : null,
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ].filter(Boolean),
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 3000,
    },
  };
};
