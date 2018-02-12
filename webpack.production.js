var webpack = require('webpack');
var merge = require('@ersinfotech/merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//加载JS模块压缩编译插件
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var webpackConfig = require('./webpack.config');
const cleanWebpackPlugin = require('clean-webpack-plugin')

process.env.NODE_ENV = 'production';

module.exports = merge(webpackConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      exclude: /components/,
    }],
  },
  plugins: [
    new ExtractTextPlugin('[name]_[contenthash].css', {
      allChunks: true,
    }),
    new cleanWebpackPlugin(['./dist']),         //创建一个删除文件夹的插件，删除dist目录
    new webpack.optimize.UglifyJsPlugin({
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
        compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
        }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
  ],
});