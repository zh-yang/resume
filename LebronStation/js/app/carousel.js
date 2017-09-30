define(['jquery'],function($){
  function Carousel($container, imgsSrcArr) {
    this.$ct = $container
    this.imgData = imgsSrcArr
    this.init()
  }
  Carousel.prototype.init = function() {
    var _this = this
    _this.imgWidth = _this.$ct.width()
    _this.imgHeight = _this.$ct.height()
    _this.imgCount = _this.imgData.length
    _this.pageIndex = 1
    _this.isAnimate = false
    _this.timer = _this.autoPlay()
    _this.timer2 = null
    _this.isAuto = true
    _this.$wrap = $('<ul></ul>')
    _this.$bullets = $('<div></div>')
    _this.imgData.forEach(function(src) {
      var li = $('<li><a href="#"><img src=' + src + '></a></li>')
      _this.$wrap.append(li)
    })
    _this.$wrap.prepend(_this.$wrap.find('li').last().clone())
    _this.$wrap.append(_this.$wrap.find('li').eq(1).clone())
    for (var i = 0; i < _this.imgCount; i++) {
      _this.$bullets.append($('<a href="#"></a>'))
    }
    _this.$pre = $('<a href="#"><</a>')
    _this.$next = $('<a href="#">></a>')
    _this.$lis = _this.$wrap.find('li')
    _this.createEle()
    _this.bind()
  }
  Carousel.prototype.createEle = function() {
    var _this = this,
      $fragment = $(document.createDocumentFragment())
    _this.$ct.css({
      //position: 'relative',
      overflow: 'hidden'
    })
    _this.$wrap.css({
      position: 'absolute',
      width: _this.imgWidth * _this.$lis.length,
      height: _this.imgHeight,
      top: 0,
      left: _this.imgWidth * (-1)
    })
    _this.$lis.css({
      float: 'left'
    })
    _this.$lis.find('img').css({
      width: _this.imgWidth,
      height: _this.imgHeight
    })
    _this.$pre.css({
      display: 'block',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: 'rgba(200,200,200,0.85)',
      textAlign: 'center',
      lineHeight: '30px',
      color: 'white',
      zIndex: 2,
      left: '20px'
    })
    _this.$next.css({
      display: 'block',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: 'rgba(200,200,200,0.85)',
      textAlign: 'center',
      lineHeight: '30px',
      color: 'white',
      zIndex: 2,
      right: '20px'
    })
    _this.$bullets.css({
      position: 'absolute',
      width: '100%',
      bottom: '50px',
      textAlign: 'center'
    })
    _this.$bullets.find('a').css({
      display: 'inline-block',
      width: '50px',
      height: '10px',
      borderRadius: '2px',
      background: 'rgba(200,200,200,0.85)'
    }).eq(0).css({
      background: '#333'
    })
    $fragment.append(_this.$wrap)
    $fragment.append(_this.$pre).append(_this.$next)
    $fragment.append(_this.$bullets)
    _this.$ct.append($fragment)
  }
  Carousel.prototype.bind = function() {
    var _this = this
    $(window).resize(function(){
      if(_this.timer2){clearTimeout(_this.timer2)}
      _this.timer2 = setTimeout(function(){
        clearInterval(_this.timer)
        _this.init()
      },300)
    })
    _this.$next.click(function() {
      _this.closeAuto()
      _this.nextPlay()
    })
    _this.$pre.click(function() {
      _this.closeAuto()
      _this.prePlay()
    })
    _this.$bullets.on('click', 'a', function(event) {
      _this.closeAuto()
      if ($(event.target).index() > _this.pageIndex - 1) {
        _this.nextPlay($(event.target).index() - _this.pageIndex + 1)
      } else {
        _this.prePlay(_this.pageIndex - $(event.target).index() - 1)
      }
    })
  }
  Carousel.prototype.nextPlay = function(step) {
    var _this = this
    if (_this.isAnimate) {
      return
    }
    _this.isAnimate = true
    if (step === undefined) {
      step = 1
    }
    _this.pageIndex += step
    _this.$wrap.animate({
      left: '-=' + step * _this.imgWidth
    }, function() {
      if (_this.pageIndex > _this.imgCount) {
        _this.$wrap.css({
          left: _this.imgWidth * (-1)
        })
        _this.pageIndex = 1
      }
      _this.setBullet()
      _this.isAnimate = false
    })
  }
  Carousel.prototype.prePlay = function(step) {
    var _this = this
    if (_this.isAnimate) {
      return
    }
    _this.isAnimate = true
    if (step === undefined) {
      step = 1
    }
    _this.pageIndex -= step
    _this.$wrap.animate({
      left: '+=' + step * _this.imgWidth
    }, function() {
      if (_this.pageIndex < 1) {
        _this.$wrap.css({
          left: -_this.imgCount * _this.imgWidth
        })
        _this.pageIndex = _this.imgCount
      }
      _this.setBullet()
      _this.isAnimate = false
    })
  }
  Carousel.prototype.setBullet = function() {
    this.$bullets.find('a').css({
        background: 'rgba(200,200,200,0.85)'
      })
      .eq(this.pageIndex - 1).css({
        background: '#333'
      })
  }
  Carousel.prototype.autoPlay = function() {
    var _this = this
    return setInterval(function() {
      _this.nextPlay()
    }, 1300)
  }
  Carousel.prototype.closeAuto = function() {
    var _this = this
    if (_this.isAuto === false) {
      return
    }
    _this.isAuto = false
    clearInterval(_this.timer)
    setTimeout(function() {
      _this.timer = _this.autoPlay()
      _this.isAuto = true
    }, 3000)
  }
  return Carousel
})


