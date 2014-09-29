window.app = window.app ? {}
app = window.app

class app.RobboGame
	constructor: ()->
		interval = setInterval(@setupLogoSpectrumAnimation,1800)

		$('.start-game').click ()=>
			clearInterval(interval)
			$('.game-logo').stop().removeClass('.color-animated').css('color','green')
			$('.screen').hide()
			$('.game-chrome').show()
			new app.GameLoader()


	setupLogoSpectrumAnimation: ()->
		$('.color-animated').stop()
		hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		$('.color-animated').animate({color: hue},1500)
		return
