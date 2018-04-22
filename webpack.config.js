var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('./utils.js');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

//生成JS的目录地址(默认:)
const jsDir = 'js/';
//生成css的目录地址(默认:)
const cssDir = 'css/';

function resolve(dir) {
    //2018-3-6修复
    return path.join(__dirname, '.', dir);
}

// 测试地址问题
console.info(path.resolve(__dirname, 'src'), 222222222222222222222222);

module.exports = {
    //入口文件
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, 'src/index.tsx')],
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'react-router-dom']
    },
    //出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[hash:8].js',
        publicPath: "/"
    },
    //配置模块如何解析
    resolve: {
        //设置查找路径,例如在使用了import * form vue  会先从Src文件中引入vue,如果有没，再从node_modules中去找
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
        //默认拓展值，可以在import的时候不用加入后辍名
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src'),
            '@api': resolve('src/api'),
        },
        // plugins: [
        //     new TsconfigPathsPlugin({
        //         configFile: path.resolve(__dirname, 'tsconfig.json')
        //     })
        // ],
    },
    devtool: 'source-map',
    //这部分会帮助我们去处理不同类型的文件，其中 test 就是文件的后缀，loaders 是“转译器”，include 是指定文件的目录，exclude 是排除某个目录。  
    //2017.12.13,此处貌似可以做按需加载，可以大大减少数万行生成后的代码  http://www.jianshu.com/p/c0bec50ec385
    module: {
        rules: [
           {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'awesome-typescript-loader']
            },
            // {
            //     test: /\.js[x]?$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/,
            // query: {
            //     presets: ['react', 'es2015']
            // }
            //loader的详细写法可以使用use
            // use: [
            //         {
            //             loader: "style-loader" //用来处理最基础的css样式
            //         }, {
            //             loader: "css-loader",
            //             options: {
            //                 modules: true, //是否支持css-modules
            //                 camelCase: true,//是否支持 -(中缸线)写法的class,id名称
            //                 localIdentName: "[name]_[local]_[hash:base64:3]",//css-modules的生成格式
            //                 importLoaders: 1, // 是否支持css import方法
            //                 sourceMap: true //是否生成css的sourceMap, 主要用来方便调试
            //             }
            //         }, {
            //             loader: "postcss-loader", //postCSS加载模块,可以使用postCSS的插件模块
            //             options: {
            //                 sourceMap: true,
            //                 plugins: () => [
            //                     precss(), //支持Sass的一些特性
            //                     autoprefixer({
            //                         browsers: ['last 3 version', 'ie >= 10']
            //                     }),//CSS3 自动化兼容方案
            //                     postcsseasysprites({imagePath: '../img', spritePath: './assets/dist/img'}) //支持css精灵功能
            //                 ]
            //             }
            //         }
            //     ]
        // },
        {
            test: /\.(jpe?g|png|gif|svg|ico)/i,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:8].[ext]')
            }
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)/,
            loader: 'file-loader',
        }, {
            test: /\.(pdf)/,
            loader: 'file',
        }, {
            test: /\.(swf|xap)/,
            loader: 'file',
        }],
    },
    plugins: [
        //html-webpack-plugin会自动生成一个html,并引用相关的assets,常用有
        //title文件标题 
        //filename 文件名默认为inde.html,
        //template根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader
        //inject  true, body, head, false. 默认值，script标签位于html文件的 body 底部: 同 true : script 标签位于 head 标签内 : 不插入生成的 js 文件，只是单纯的生成一个 html 文件
        //favicon:  给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名。
        //minify 对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩。 html-webpack-plugin 内部集成了 html-minifier ,这个压缩选项同 html-minify 的压缩选项完全一样，
        //hash hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 。
        //cache 默认值是 true。表示只有在内容变化时才生成一个新的文件。
        //showErrors showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。
        //chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。 chunks: ['index','index2']
        //excludeChunks 弄懂了 chunks 之后，excludeChunks 选项也就好理解了，跟 chunks 是相反的，排除掉某些 js 文件。 excludeChunks: ['index1.js']
        //chunksSortMode 选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'。
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            favicon: __dirname + '/src/favicon.ico',
            inject: true,
            // 压缩HTML
            minify: {
                // 移除空白
                collapseWhitespace: true,
                // 移除注释
                removeComments: true,
                // 移除属性中的双引号
                removeAttributeQuotes: true
            },
            chunks: ['manifest', 'vendor', 'app'],
        }),
        // 这里为什么多了个manifest? 这个是个啥东西, 说简单点, 就是webpack2 用来存储一些关系啦, 链接啦之类的东西, 
        // 如果不提取这个模块, 每次打包之后vendor 都会有变化, 就失去了我们替换资源时不替换vendor包的意义了
        // 所以每次项目更新下,只需要替换index.js和mainifest.js就可以了
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendor', 'manifest'
            ],
            filename: jsDir + '[name].js'
        }),
        new CheckerPlugin(),
        new webpack.HashedModuleIdsPlugin(),    
        // new webpack.HotModuleReplacementPlugin(),
    ]
}