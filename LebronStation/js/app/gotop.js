define(['jquery'],function($){
	function GoTop(container){
	  this.ct = container
	  this.target = document.createElement('button')
	  this.target.innerText = 'GoTop'
	  this.target.classList.add('go-top')
	  this.createNode()
	  this.bindEvent()
	}
	GoTop.prototype = {
	  createNode: function(){
	    this.ct.appendChild(this.target)
	  },bindEvent: function(){
	    var _this = this
	    _this.ct.onscroll = function(){
	    	var scrollTop = _this.ct.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0 
	    	//console.log(scrollTop,_this.ct.scrollHeight)
	      if(scrollTop<200){
	        _this.target.style.display = 'none'
	      }else{
	        _this.target.style.display = 'block'
	      }
	    }
	    this.target.onclick = function(){
	    	if(_this.ct.scrollTop){
	    		_this.ct.scrollTop = 0
	    	}else if(document.documentElement.scrollTop){
	    		document.documentElement.scrollTop = 0
	    	}else if(window.pageYOffset){
	    		window.pageYOffset = 0
	    	}
	    }
	  }
	}
	return GoTop
})