window.app = window.app ? {}
app = window.app

class app.GameMenu 
	constructor: (@element)->
		@selectGame = new app.SelectGameDialog($('.select-game-dialog'),(g)=>@playGameSelected g)
		ko.applyBindings(this,@element[0])

	playGame: () ->
		@selectGame.show()

	playGameSelected: (game) ->	
		window.location.href = '/play/'+game.Id
$ () -> 
	new app.GameMenu $('.game-menu')
		