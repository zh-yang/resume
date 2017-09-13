//封装 DOM API
function $$(items) {
	return document.querySelectorAll(items)
}
var ct = $$('.ct')[0]
var btn1 = $$('input')[0],
		//统计提交次数
		index = 1,
		//设置防重复点击开关
		lock = false,
		//设置对接密码
		password = 'hello'

btn1.onclick = function() {
	//如果一次请求未完成，lock =t rue ，就不执行后续代码
	if (lock) {
		return
	}
	//如果当前没有请求，改变 lock 为 true ，并执行后续代码
	lock = true
	//设置提交按钮不可点击，不设置也没关系，作用和lock重复了
	btn1.setAttribute('disabled', 'true')
	//定时器模仿网速差等情况
	setTimeout(function() {
		//时间函数执行完才会执行下边的
		ajax()
		//请求OK了，把 lock 改为 false
		lock = false
		//恢复按钮
		btn1.removeAttribute('disabled')
	}, 1000)
}
//调用AJAX、封装事件函数
function ajax() {
	myAJAX('GET', '/getFriends' + '?password=' + password, succ, fail)
	//成功函数，因为返回的responseText 是 index.html 的文档，就不输出它了
	function succ(e) {
		console.log(e)
		console.log('success' + index)
		appends(JSON.parse(e))
		index += 1
	}
	//失败函数
	function fail() {
		console.log('fail')
	}
	//组装DOM
	function appends (arr) {
		var ct1 = document.createDocumentFragment()
		for (var i = 0; i < arr.length; i++) {
			var p = document.createElement('p')
			p.innerHTML = arr[i] + ((index-1)*5 + 3 + i)
			ct1.appendChild(p)
		}
		ct.appendChild(ct1)
	}
}
