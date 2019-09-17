const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJSON = require('./package.json');

module.exports = ({ mode }) => {
  return {
    mode,
    entry: 'src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: `bundle-${packageJSON.version.replace(/\./g, '-')}.js`,
      publicPath: '/',
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
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: true,
                }),
              ],
            }),
            transpileOnly: true,
          },
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        base: '/',
      }),
    ].filter(Boolean),
    devServer: {
      contentBase: path.join(__dirname, 'static'),
      port: 3000,
      historyApiFallback: true,
    },
  };
};
