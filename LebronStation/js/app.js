requirejs.config({
	baseUrl : 'js/lib',
	paths : {
		app : '../app'
	}
})

requirejs(['jquery','app/carousel','app/waterfall','app/gotop'],function($,carousel,waterfall,gotop){
	var data = [
    'https://jirengu-yang.github.io/resume/demo5-1/img/01.jpg',
    'https://jirengu-yang.github.io/resume/demo5-1/img/02.jpg',
    'https://jirengu-yang.github.io/resume/demo5-1/img/03.jpg',
    'https://jirengu-yang.github.io/resume/demo5-1/img/04.jpg',
    'https://jirengu-yang.github.io/resume/demo5-1/img/05.jpg'
  ]
	var Carousel = carousel,Waterfall = waterfall,GoTop = gotop
	new Carousel($('#back'),data)
	new Waterfall($('.container .photos'),3,$('.photos+.button'))
	new GoTop(document.body)
})
