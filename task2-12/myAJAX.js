//函数参数1.提交方法2.提交地址3.成功函数4.失败函数(可选)
function myAJAX(method, url, fnSucc, fnFail) {
		//1.创建XHR对象
	var xhr = new XMLHttpRequest()
		//2.设置method,url,true/false
	xhr.open(method, url, true)
		//3.发送请求
	xhr.send()
		//4.监听请求
	xhr.onreadystatechange = function() {
		if (!(xhr.readyState === 4)) {
			return
		}
			//返回请求后作出判定
			//如果成功
		if (xhr.status === 200 || xhr.status === 304) {
			console.log(xhr.status)
			//因为提交的地址是自身，所以 responseText 是 index.html 的文档
			fnSucc(xhr.responseText)
		} else {
			//如果失败,存在失败函数则调用
			if (fnFail) {
				fnFail(xhr.statusText)
			}
		}
	}
}