var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('./utils.js');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    //入口文件
    entry: {
        app: [path.resolve(__dirname, 'src/index')],
    },
    //出口文件
    output: {
        path: path.resolve(__dirname, '_dist'),
        filename: '[name]_[hash:8].js',
    },
    //配置模块如何解析
    resolve: {
        //设置查找路径,例如在使用了import * form vue  会先从Src文件中引入vue,如果有没，再从node_modules中去找
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
        //默认拓展值，可以在import的时候不用加入后辍名
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src'),
            '@api': resolve('src/api'),
        }
    },
    //这部分会帮助我们去处理不同类型的文件，其中 test 就是文件的后缀，loaders 是“转译器”，include 是指定文件的目录，exclude 是排除某个目录。  
    //2017.12.13,此处貌似可以做按需加载，可以大大减少数万行生成后的代码  http://www.jianshu.com/p/c0bec50ec385
    module: {
        rules: [{
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            // query: {
            //     presets: ['react', 'es2015']
            // }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            include: /components/,
        }, {
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
        }, {
            test: /\.less$/, 
            loader: 'style-loader!css-loader!less-loader',
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
            template: __dirname + '/src/index.html',
            favicon: __dirname + '/src/favicon.ico',
            inject: true,
        })
    ]
}