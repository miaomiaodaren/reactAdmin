const path = require('path');
const pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

//主要处理一些静态图片的目录设置
exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? 'static' : 'static'
    return path.posix.join(assetsSubDirectory, _path)
}


exports.cssLoaders = function(options) {
    options = options || {};
    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap,
            modules:  true
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
          sourceMap: options.sourceMap
        }
    }

      // generate loader string to be used with extract text plugin
    function generateLoaders (loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'react-style-loader'
            })
        } else {
            return ['react-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

//主要用来处理样式的编译
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options)
    for(const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' +  extension + '$'),
            use: loader
        })
    }
    return output
} 


//跨平台处理消息。。。不是特别了解
exports.createNotifierCallback = function () {
    const notifier = require('node-notifier')
  
    return (severity, errors) => {
      if (severity !== 'error') {
        return
      }
      const error = errors[0]
  
      const filename = error.file.split('!').pop()
      notifier.notify({
        title: pkg.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  }