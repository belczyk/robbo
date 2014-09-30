window.app = window.app ? {}
app = window.app

class app.RobboGame
	constructor: ()->
		$('button.start-game, button.play-again').click ()=>@startGame()
		$('button.back-home').click ()=> @backHome()

	backHome: ()->
		$('.screen').hide()
		$('.start-screen').show()

	startGame: () ->
		@currentGame = null
		$('.screen').hide()
		$('.game-chrome').show()
		@currentGame = new app.GameLoader()

	setupLogoSpectrumAnimation: ()->
		$('.color-animated').stop()
		hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		$('.color-animated').animate({color: hue},1500)
		return
