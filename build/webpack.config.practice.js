const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')


const defaultPluins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: ' "development" ' 
        }
    }),
    new HTMLPlugin({
        template:path.join(__dirname,'template.html')
    })
]

const devServer = {
    port: 8087,
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    open: false,
    hot: true,
}

let config

config = merge(baseConfig,{
        entry:path.join(__dirname,'../practice/index.js'),
        devtool : '#cheap-module-eval-source-map',
        module:{
            rules:[
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader', //vue-style-loader可以做到CSS样式热更新
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,//stylus-loader已经生成了sourcemap,配置为true,避免再生成一次
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        //默认importVue的版本是modules里的runtime版本
        resolve:{
            alias:{
                'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
            }
        },
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
})

module.exports = config




