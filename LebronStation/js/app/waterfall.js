define(['jquery'], function($) {
	function Waterfall($container, colNum, $load) {
		//this.$node = $node
		this.$ct = $container
		this.$load = $load
		this.colNum = colNum
		this.init()
	}
	Waterfall.prototype.init = function() {
		var _this = this
		_this.topArr = []
		_this.lowTop = 0
		_this.lowIdx = 0
		_this.idx = 0
		_this.timer = null
		_this.nodeData = []
		_this.nodeWidh = _this.$ct.width() / _this.colNum
			// _this.$fragment = $(document.createDocumentFragment())
		for (var i = 0; i < this.colNum; i++) {
			_this.topArr.push(0)
		}
		_this.getData()
		_this.$load.click(function() {
			if (_this.timer) {
				clearTimeout(_this.timer)
			}
			_this.timer = setTimeout(function() {
				_this.getData()
			}, 500)
		})
	}
	Waterfall.prototype.getData = function() {
		var _this = this
		$.ajax({
			url: 'photos.json',
			type: 'get'
		}).done(function(rel) {
			_this.nodeData.length = 0
			for (var i = 0; i < 5; i++) {
				_this.nodeData.push(rel[Math.floor(Math.random() * 6)])
			}
			//console.log(_this.nodeData)
			_this.createNode()
		})
	}
	Waterfall.prototype.createNode = function() {
		var _this = this
			//_this.$fragment.empty()
		for (var i = 0; i < _this.nodeData.length; i++) {
			(function(j) {
				var $figure = $('<figure></figure>'),
					$a = $('<a href=""></a>'),
					$figcaption = $('<figcaption>' + _this.nodeData[j].title + '</figcaption>'),
					$p = $('<p>' + _this.nodeData[j].intro + '</p>'),
					img = new Image()
				img.src = _this.nodeData[j].src
				$(img).load(function() {
					$a.append($(img))
					$figure.append($a).append($figcaption).append($p)
						//_this.$fragment.append($figure)
					_this.$node = $figure
					_this.updateLow()
					_this.layout()
				})
			})(i)
		}
	}
	Waterfall.prototype.layout = function() {
		//console.log(this.topArr,this.lowTop,this.lowIdx)
		this.$node.css({
			left: this.nodeWidh * this.lowIdx,
			top: this.lowTop
		})
		this.$ct.append(this.$node)

		this.topArr[this.lowIdx] += this.$node.outerHeight()
		var high = this.updateHigh()
		this.$ct.css({
			height: high
		})

		this.idx++
	}
	Waterfall.prototype.updateLow = function() {
		var _this = this

		_this.lowTop = _this.topArr[0]
		_this.lowIdx = 0
		for (var k = 1; k < _this.topArr.length; k++) {
			if (_this.topArr[k] < _this.lowTop) {
				_this.lowTop = _this.topArr[k]
				_this.lowIdx = k
			}
		}
	}
	Waterfall.prototype.updateHigh = function() {
		var _this = this
		var high = _this.topArr[0]
		for (var k = 1; k < _this.topArr.length; k++) {
			if (_this.topArr[k] > high) {
				high = _this.topArr[k]
			}
		}
		return high
	}
	return Waterfall
})