import Vue from 'vue'

const app = new Vue({
	template:'<div>{{text}}</div>',
	data:{
		text:0
	}
})

app.$mount('#root')

console.log(app.$data)
console.log(app.$pros)
console.log(app.$root)