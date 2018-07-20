var webpack = require('webpack');
var merge = require('@ersinfotech/merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//加载JS模块压缩编译插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

var path = require('path');
process.env.NODE_ENV = 'production';

var utils = require('./utils');

const productionConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract({
                        fallback: {
                            loader: 'style-loader',
                        },
                        use: [
                            'css-loader',
                            'less-loader?modules',
                        ],
                    }
                ),
                exclude: [/components/],
            },
            {
                test: /\.less$/, 
                use: [
                    'style-loader?sourceMap',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                        } 
                    },
                    'less-loader',
                ],
                include: /components/,
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*.*', 'dist/css/*.*']),
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
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true
        }), // 单独打包CSS
        new CompressionWebpackPlugin({ //gzip 压缩
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$'    //压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    ]
}

module.exports = merge(webpackConfig, productionConfig);


// module.exports = merge(webpackConfig, {
//   module: {
//     rules: [{
//       test: /\.css$/,
//       loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
//       exclude: /components/,
//     }],
//   },
//   plugins: [
//     new ExtractTextPlugin('[name]_[contenthash].css', {
//       allChunks: true,
//     }),
//     new cleanWebpackPlugin(['./dist']),         //创建一个删除文件夹的插件，删除dist目录
//     new webpack.optimize.UglifyJsPlugin({
//         // 最紧凑的输出
//         beautify: false,
//         // 删除所有的注释
//         comments: false,
//         compress: {
//             // 在UglifyJs删除没有用到的代码时不输出警告
//             warnings: false,
//             // 删除所有的 `console` 语句
//             // 还可以兼容ie浏览器
//             drop_console: true,
//             // 内嵌定义了但是只用到一次的变量
//             collapse_vars: true,
//             // 提取出出现多次但是没有定义成变量去引用的静态值
//             reduce_vars: true
//         }
//     }),
//     new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
//     }),
//   ],
// });