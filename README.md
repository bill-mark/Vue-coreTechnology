# vuejs-webpack
借助webpack自己搭建一个Vue脚手架

#1 cross-env
跨平台执行node命令插件

#2 DefinePlugin
NODE_ENV:isDev ? ' "development" ' :' "production" ' 
不加双引号调用时候会变成process.env.NODE_ENV = development 变量development是不存在的,会报错

#3 sourcemap
方便调试:将浏览器里的代码显示成开发者自己写的.代码映射

#4  "extract-text-webpack-plugin"
CSS分离打包工具

{
  "name": "vue-ssr-tech",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build":"cross-env NODE_ENV=production webpack --config webpack.config.js",
    "dev":"cross-env NODE_ENV=development  webpack-dev-server --config webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "autoprefixer": "7.2.3",  //CSS加浏览器前缀
    "babel-core": "6.26.0",
    "babel-helper-vue-jsx-merge-props": "2.0.3",
    "babel-loader": "7.1.2",
    "babel-plugin-syntax-jsx": "6.18.0",
    "babel-plugin-transform-vue-jsx": "3.5.0",
    "babel-preset-env": "1.6.1",
    "cross-env": "5.1.3",
    "css-loader": "0.28.7",
    "extract-text-webpack-plugin": "3.0.2", //css分离打包工具
    "file-loader": "1.1.6", 
    "html-webpack-plugin": "2.30.1",
    "postcss-loader": "2.0.9",
    "style-loader": "0.19.1",
    "stylus": "0.54.5",
    "stylus-loader": "3.0.1",
    "url-loader": "0.6.2",
    "vue": "2.5.13",
    "vue-loader": "13.6.0",
    "vue-template-compiler": "2.5.13",
    "vue-style-loader": "^4.1.0",    //.vue文件CSS样式热更新
    "webpack": "3.10.0",
    "webpack-dev-server": "2.9.7"
    "webpack-merge": "^4.1.2"  //webpack拓展工具
    "rimraf": "^2.6.2",  //删除目录插件 用来删除dist
  }
}
