const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
        '@ant-design/icons/lib/dist$': path.join(__dirname, 'src/icons.ts'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|js|ts)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: true,
                }),
              ],
            }),
            compilerOptions: {
              module: 'es2015',
            },
          },
          exclude: /node_modules/,
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
                modifyVars: {
                  'primary-color': '#ff787e',
                },
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        base: '/',
      }),
      mode === 'production'
        ? new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            defaultSizes: 'gzip',
          })
        : null,
    ].filter(Boolean),
    devServer: {
      contentBase: path.join(__dirname, 'static'),
      port: 3000,
      historyApiFallback: true,
    },
  };
};
