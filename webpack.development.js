var webpack = require('webpack');
var merge = require('webpack-merge');
const utils = require('./utils');
const config = require('./config/index');
var path = require('path');

var webpackConfig = require('./webpack.config');
var portfinder = require('portfinder'); //用于获取port
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


const webpackConfigDev = {
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', path.resolve(__dirname, 'src/index.tsx')],
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
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
                    // 'css-loader',
                    'less-loader',
                ],
                include: /components/,
            },
            {
                test: /\.less$/, 
                use: [
                    'style-loader?sourceMap',
                    'css-loader',
                    'less-loader',
                ],
                exclude: /components/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                    // 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
            'HOST': config.dev.env.NODE_ENV === "development" ? JSON.stringify('/api') : JSON.stringify('')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,       //暂时不明其意
        hot: true,
        inline: true,
        host: process.env.HOST || config.dev.host,
        port: process.env.PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,   //是否自动打开浏览器
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true,
        } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        // quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        },
        stats: {
            colors: true // 用颜色标识
        }
    }
}

console.info(JSON.stringify(merge(webpackConfig, webpackConfigDev).module.rules));

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(webpackConfig, webpackConfigDev);

// module.exports = merge(webpackConfig, webpackConfigDev)


// const devWebpackConfig = merge(webpackConfig, {
//     devtool: 'eval-source-map',
//     module: {
//         rules: utils.styleLoaders({ sourceMap: false, usePostCSS: true }),
//     },
//     plugins: [
//         new webpack.DefinePlugin({
//             'process.env': config.dev.env,
//             'HOST': config.dev.env.NODE_ENV === '"development"' ? JSON.stringify('/api') : JSON.stringify('')
//         }),
//         // new webpack.optimize.OccurrenceOrderPlugin(),
//         new webpack.HotModuleReplacementPlugin(),
//         // new webpack.NoErrorsPlugin(),
//     ],
//     devServer: {
//         historyApiFallback: true,       //暂时不明其意
//         hot: true,
//         inline: true,
//         host: process.env.HOST || config.dev.host,
//         port: process.env.PORT || config.dev.port,
//         open: config.dev.autoOpenBrowser,   //是否自动打开浏览器
//         overlay: config.dev.errorOverlay ? {
//             warnings: false,
//             errors: true,
//         } : false,
//         publicPath: config.dev.assetsPublicPath,
//         proxy: config.dev.proxyTable,
//         quiet: true, // necessary for FriendlyErrorsPlugin
//         watchOptions: {
//             poll: config.dev.poll,
//         }
//     }
// })

// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = process.env.PORT || config.dev.port
//     portfinder.getPort((err, port) => {
//         if (err) {
//             reject(err)
//         } else {
//             // publish the new Port, necessary for e2e tests
//             process.env.PORT = port
//             // add port to devServer config
//             devWebpackConfig.devServer.port = port

//             // Add FriendlyErrorsPlugin
//             devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//                 compilationSuccessInfo: {
//                 messages: [`Your application is running here: http://${config.dev.host}:${port}`],
//                 },
//                 onErrors: config.dev.notifyOnErrors
//                 ? utils.createNotifierCallback()
//                 : undefined
//             }))

//             resolve(devWebpackConfig)
//         }
//     })
// })


// module.exports = merge(webpackConfig, {
//     devtool: 'eval-source-map',
//     // entry: {
//     //     app: ['webpack-hot-middleware/client'],
//     //     login: ['webpack-hot-middleware/client'],
//     // },
//     module: {
//         rules: utils.styleLoaders({ sourceMap: false, usePostCSS: true }),
//     },
//     plugins: [
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
//         }),
//         // new webpack.optimize.OccurrenceOrderPlugin(),
//         new webpack.HotModuleReplacementPlugin(),
//         // new webpack.NoErrorsPlugin(),
//     ],
// });