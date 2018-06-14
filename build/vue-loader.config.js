//vue-loader是处理.vue结尾文件的middleware
module.exports = (isDev) =>{
	return {
		preserveWhitespace:false,  //消除模板空格
		extractCSS:!isDev,  //生成环境,.vue格式CSS单独打包
		cssModules:{
			localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true  //CSS命名方式
		},
	}
}