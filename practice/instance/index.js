import Vue from 'vue'

const app = new Vue({
	template:'<div>{{text}}</div>',
	data:{
		text:0
	}
})

app.$mount('#root')

