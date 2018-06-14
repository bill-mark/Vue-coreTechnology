const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')//css分离打包工具

const isDev = process.env.NODE_ENV === 'development'



const config = {
    target:'web',
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:isDev ? ' "development" ' :' "production" ' 
            }//不加双引号调用时候会变成process.env.NODE_ENV = development 变量development是不存在的,会报错
        }),
        new HTMLPlugin()
    ]
}

if (isDev) {
   config.module.rules.push({      
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
   })
   config.devtool = '#cheap-module-eval-source-map'
   config.devServer = {
       port:8000,
       host:'0.0.0.0',
       overlay:{
           errors:true,
       },
       open:true,
       hot:true,
   }
   config.plugins.push(
       new webpack.HotModuleReplacementPlugin(),
       new webpack.NoEmitOnErrorsPlugin()
   )
}else{
   config.entry = {  //把框架单独打包出来,避免浏览器每次都重新加载
       app: path.join(__dirname, 'src/index.js'),
       vendor:['vue',]
   } 
   config.output.filename = '[name].[chunkhash:8].js'
   config.module.rules.push(
       {
           test: /\.styl/,
           use: ExtractPlugin.extract({
               fallback:'style-loader',
               use:[
                   'css-loader',
                   {
                       loader:'postcss-loader',
                       options:{
                           sourceMap:true 
                       }
                   },
                   'stylus-loader'
               ]
           }) 
       }
   )
   config.plugins.push(
       new ExtractPlugin('styles.[contentHash:8].css'),
       new webpack.optimize.CommonsChunkPlugin({  //打包框架代码
           name:'vendor'
       }),
       new webpack.optimize.CommonsChunkPlugin({  //打包webpack代码,runtime要放在vendor后面
           name:'runtime'
       })
   )
}

module.exports = config