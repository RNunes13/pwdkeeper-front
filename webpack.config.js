const path = require('path');
const Package = require('pjson')
const webpack = require('webpack');
const dotenv = require('dotenv').config();
const dotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: !isProd ? 'inline-source-map' : '', 
  node: {
    fs: "empty"
  },
  entry: {
    main: 'main.tsx'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    hot: true
  },

  plugins: [
    new dotenvWebpack(),

    /* Generate hashes based on the relative path of the module */
    new webpack.HashedModuleIdsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    /* Generates the root index based on template */
    new HtmlWebpackPlugin({
      title: Package.name,
      version: Package.version,
      template: path.resolve(__dirname, './src/index.html'),
      minify: true,
    }),

    /* Hot module replacement plugin */
    new webpack.HotModuleReplacementPlugin(),

    /* Generates favicons */
    new FaviconsWebpackPlugin({
      logo: 'assets/images/icon.png',
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
    }),
  ],

  module: {
    rules: [
      /* Typescript Loader */
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      },

      /* Stylesheet loaders */
      {
        test: /\.(scss|css)$/,
        use: [
          // creates style nodes from JS strings
          {
            loader: "style-loader",
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          // translates CSS into CommonJS
          { loader: "css-loader" },
          // Vendor prefixes
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                new IconfontWebpackPlugin({
                  resolve: loader.resolve,
                  fontNamePrefix: 'pk-',
                  enforcedSvgHeight: 5000,
                  modules: false,
                })
              ]
            },
          },
          // compiles Sass to CSS 
          { loader: "sass-loader" }
        ],
      },

      /* Image loader */
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name(file) {
              if (!isProd) {
                return '[path][name].[ext]';
              }
  
              return '[contenthash].[ext]';
            },
          },
        }]
      },

      /* Font loader */
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }],
      },

      /* Others files */
      {
        test: /\.(txt)(\?.*$|$)/,
        use: ['file-loader'],
      },

      /* JSON loader */
      {
        test: /\.json$/,
        exclude: [/node_modules/],
        use: ['json-loader'],
      },
    ]
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [ new UglifyJsPlugin() ],
  }
};
