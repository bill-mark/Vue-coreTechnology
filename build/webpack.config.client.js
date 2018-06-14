const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')//css分离打包工具
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? ' "development" ' : ' "production" '
        }//不加双引号调用时候会变成process.env.NODE_ENV = development 变量development是不存在的,会报错
    }),
    new HTMLPlugin()
]

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    open: true,
    hot: true,
}

let config

if (isDev) {
    config = merge(baseConfig,{
        devtool : '#cheap-module-eval-source-map',
        module:{
            rules:[
                {
                    test: /\.styl/,
                    use: [
                        'style-loader',
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
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig,{
        entry : {  //把框架单独打包出来,避免浏览器每次都重新加载
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue',]
        },
        output:{
            filename: '[name].[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPluins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({  //打包框架代码
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({  //打包webpack代码,runtime要放在vendor后面
                name: 'runtime'
            }) 
        ])
    })
}

module.exports = config