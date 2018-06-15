import Vue from 'vue'

// new Vue({
// 	el:'#root',
// 	template:'<div>this is content</div>'
// })

const app = new Vue({
	//el:'#root',
	template:'<div>{{text}}</div>',
	data:{
		text:0
	}
})

app.$mount('#root')

console.log(app.$data)
console.log(app.$pros)
console.log(app.$el)

// setInterval( ()=>{
// 	app.text += 1
// },1000 )