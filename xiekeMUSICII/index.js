/*---------切换专辑面板--------*/
function Tab ($tabs,$panels) {
	this.$tabs = $tabs
	this.$panels = $panels
	this.init()
}
Tab.prototype.init = function () {
	this.$tabs.first().addClass('active')
	this.$panels.first().addClass('active')
	this.bind()
}
Tab.prototype.bind = function () {
	var _this = this
	_this.$tabs.on('click',function () {
		$(this).addClass('active').siblings().removeClass('active')
		_this.$panels.eq($(this).index()).addClass('active')
														.siblings().removeClass('active')
	})
}
new Tab ($('main>.head>span'),$('.album-panel>.album-lists'))
/*---------播放/专辑界面切换--------*/
$('aside>.btn-album').click(function () {
	if($(this).hasClass('active')){
		return
	}else {
		$(this).addClass('active')
		$('main>.album-panel').addClass('active')
		$('main>.head').addClass('active')

		$('aside>.btn-play').removeClass('active')
		$('main>.play-panel').removeClass('active')
	}
})
$('aside>.btn-play').click(function () {
	if($(this).hasClass('active')){
		return
	}else {
		$(this).addClass('active')
		$('main>.play-panel').addClass('active')

		$('aside>.btn-album').removeClass('active')
		$('main>.head').removeClass('active')
		$('main>.album-panel').removeClass('active')
	}
})
/*-----------------初始化播放音乐------------------*/
function playMusic(list) {
			var $play = $('.control>.play')
			var $next = $('.control>.next')
			var $totalPro = $('.bar>.progress-total')
			var $nowPro = $('.bar>.progress-now')
			var $totalVol = $('.volume>.volume-total')
			var $changeVol = $('.volume>.volume-change')
			var $toggleVol = $('.volume>span')
			var $title = $('.current-info>.title')
			var $author = $('.current-info>.author')
			var $time = $('.current-info>.time')
			var $cover = $('.current-img>img')
			var $lrcWrap = $('.play-panel>.lrc-wrap>.lrcs')
			var timerUpdate = null
			var timerClick = null
			var channel = ''
			var parsed = {}

			var audioObject = new Audio()
			audioObject.autoplay = true
			audioObject.volume = 0.5

			getMusic(channel,loadNextMusic)
			$play.click(function () {
				if(audioObject.paused){
					audioObject.play()
					$(this).addClass('icon-zanting1').removeClass('icon-zanting')
				}else{
					audioObject.pause()
					$(this).addClass('icon-zanting').removeClass('icon-zanting1')
				}	
			})
			$next.click(function(){
				if(timerClick){
					clearTimeout(timerClick)
				}
				timerClick = setTimeout(function(){
					getMusic(channel,loadNextMusic)
				},300)
			})
			$totalPro.click(function (event) {
				var e = event || window.event
				var percent = e.offsetX/parseInt($(this).css('width'))
				audioObject.currentTime = percent*audioObject.duration
				updateLyric()
				$nowPro.css('width',parseInt($totalPro.css('width'))*percent)
				
			})
			$nowPro.click(function (e) {
				var e = event || window.event
				var percent = e.offsetX/parseInt($totalPro.css('width'))
				audioObject.currentTime = percent*audioObject.duration
				updateLyric()
				$nowPro.css('width',parseInt($totalPro.css('width'))*percent)
			})
			$totalVol.click(function (event) {
				if($toggleVol.hasClass('icon-yinliangguan')){
					$toggleVol.removeClass('icon-yinliangguan').addClass('icon-yinliangkai')
				}
				var e = event || window.event
				var percent = e.offsetX/parseInt($(this).css('width'))
				console.log(percent)
				audioObject.volume = percent
				$changeVol.css('width',parseInt($totalVol.css('width'))*percent)
				
			})
			$changeVol.click(function (e) {
				if($toggleVol.hasClass('icon-yinliangguan')){
					$toggleVol.removeClass('icon-yinliangguan').addClass('icon-yinliangkai')
				}
				var e = event || window.event
				var percent = e.offsetX/parseInt($totalVol.css('width'))
				audioObject.volume = percent
				$changeVol.css('width',parseInt($totalVol.css('width'))*percent)
			})
			$toggleVol.click(function(){
				if ($(this).hasClass('icon-yinliangkai')) {
					$(this).removeClass('icon-yinliangkai').addClass('icon-yinliangguan')
					audioObject.volume = 0
					$changeVol.css('width',0)
				}else {
					$(this).removeClass('icon-yinliangguan').addClass('icon-yinliangkai')
					audioObject.volume = 0.3
					$changeVol.css('width',parseInt($totalVol.css('width'))*(0.3))
				}
			})
			$('.album-lists>.list').click(function(){
				channel = $(this).attr('channel-id')
				getMusic(channel,loadNextMusic)
			})
			$('footer .current-img').click(function () {
				if($('aside>.btn-play').hasClass('active')){
					return
				}else {
					$('aside>.btn-play').addClass('active')
					$('main>.play-panel').addClass('active')

					$('aside>.btn-album').removeClass('active')
					$('main>.head').removeClass('active')
					$('main>.album-panel').removeClass('active')
				}
			})
			audioObject.onplaying = function () {
				timerUpdate = setInterval(function () {
					updateProgress()
				},1000)
			}
			audioObject.onpause = function () {
				clearInterval(timerUpdate)
			}
			audioObject.onended = function(){
				getMusic(channel,loadNextMusic)
			}
			audioObject.ontimeupdate = function(){
				updateLyric()
			}


			function loadNextMusic(music){
				$time.text('0:00')
				$nowPro.css('width',0)
				if(audioObject.paused){
					$play.addClass('icon-zanting1').removeClass('icon-zanting')
				}
				var randomMusic = music
				renderLyric(randomMusic.sid)
				audioObject.src = randomMusic.url
				$title.text(randomMusic.title)
				$author.text(randomMusic.artist)
				var img = new Image()
				img.src = randomMusic.picture
				$(img).load(function(){
					$cover.attr('src',img.src)
				})
			}
			function updateProgress () {
				var percent = (audioObject.currentTime/audioObject.duration)
				$nowPro.css('width',parseInt($totalPro.css('width'))*percent)
				var minutes = parseInt(audioObject.currentTime/60)
				var seconds = parseInt(audioObject.currentTime%60) + ''
				seconds = seconds.length === 1 ? '0' + seconds : seconds
				$time.text(minutes + ':' + seconds)
			}
			function getMusic(cid,callback){
				$.get('https://jirenguapi.applinzi.com/fm/getSong.php',{channel: cid})
				 .done(function(song){
				 	//console.log(JSON.parse(song).song[0],callback)
					callback(JSON.parse(song).song[0])
			 })
			}


			function fetchLrc(sid,success,error){
        $.get('https://jirenguapi.applinzi.com/fm/getLyric.php',{sid:sid})
				.done(function(rel){
    			var lyric = parseLrc(JSON.parse(rel).lyric)
    			if(success)success(lyric)
  			}).fail(function(e){
  				if(error)error(e)
  			})
    	}

			function parseLrc(lrcString){
				var lyrics = lrcString.split("\n")
		    var lrcObj = {}
		    for(var i=0; i<lyrics.length; i++){
		        var lyric = decodeURIComponent(lyrics[i]);
		        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
		        var timeRegExpArr = lyric.match(timeReg)
		        if(!timeRegExpArr)continue
		        var clause = lyric.replace(timeReg,'')
		        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
		            var t = timeRegExpArr[k]
		            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
		                sec = Number(String(t.match(/\:\d*/i)).slice(1))
		            var time = min * 60 + sec
		            lrcObj[time] = clause
		        }
		    }
		    return lrcObj
			}

			function renderLyric(sid){
		    $lrcWrap.html("")
		    var lyricLineHeight = 27,
		        offset = 27
		        
		        $lyrics = $(document.createDocumentFragment())
		    fetchLrc(sid,function(data){
		        parsed = {}
		        var i = 0
		        for(var k in data){
		            var txt = data[k]
		            if(!txt)txt = "&nbsp;"
		            parsed[k] = {
		                index:i++,
		                text:txt,
		                top: (-i*lyricLineHeight+offset)
		            }
		            var li = $("<li>"+txt+"</li>")
		            li.css('top',i*lyricLineHeight+offset)
		            $lyrics.append(li)
		        }
		        $lrcWrap.append($lyrics)
		    },function(){
		        lyric.html("<li style='text-align: center'>歌词加载失败</li>")
		    })
			}
			var text_temp
			function updateLyric(){
				var data = parsed
		    if(!data)return
		    var currentTime = Math.round(audioObject.currentTime)
		    var lrc = data[currentTime]
		    if(!lrc)return
		    var text = lrc.text
		    if(text != text_temp){
		        locationLrc(lrc)
		        text_temp = text
		    }
		    function locationLrc(lrc){
		        $lrcWrap.find("li.on").removeClass("on")
		        var li = $lrcWrap.find("li:nth-child("+(lrc.index+1)+")")
		        li.addClass("on");
		        $lrcWrap.css('top',Math.min(27,lrc.top))
		    }
			}
		}
		playMusic()
/*------全屏定时-----*/
		var timerFullScreen = setTimeout(function(){
			$('.play-panel.active').addClass('full-screen')
		},9000)
		$(window).mouseenter(function(){
			if(timerFullScreen){
				clearTimeout(timerFullScreen)
			}
			$('.play-panel.active').removeClass('full-screen')
			timerFullScreen = setTimeout(function(){
				$('.play-panel.active').addClass('full-screen')
			},8000)
		})
		$(window).click(function(){
			if(timerFullScreen){
				clearTimeout(timerFullScreen)
			}
			$('.play-panel.active').removeClass('full-screen')
			timerFullScreen = setTimeout(function(){
				$('.play-panel.active').addClass('full-screen')
			},8000)
		})

