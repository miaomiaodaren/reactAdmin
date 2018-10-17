const path = require('path')

module.exports = {
    dev: {
        env: require('./dev.env'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api/':{
                target:'http://127.0.0.1:3003',
                // target: '47.96.114.115:3003',
                changeOrigin:true,
                pathRewrite:{
                    '^/api': '/api'
                }
            },
        },
        host: 'localhost',
        port: 8488,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'eval-source-map',
        cacheBusting: true,
        cssSourceMap: false,   
    },
    build: {
        env: require('./prod.env'),
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),
        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
    
        /**
         * SourceMap
        */
        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',
        
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        // bundleAnalyzerReport: process.env.npm_config_report
    }
}