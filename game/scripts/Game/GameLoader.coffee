window.app = window.app ? {}
app = window.app


class app.GameLoader
	@loadGamesConfig: ->
		gamesList = $('.games')
		planetsList = $('.planets')
		for game,i in app.Universe.Games
			gamesList
				.append($('<option></option>')
					.attr('value',i)
					.text(game.Name))
			for planet,i in game.Planets
				planetsList
					.append($('<option></option>')
						.attr('value',i)
						.text(planet.Name))

			return

	@currentGame: ->
		$('.games').val()

	@currentPlanet: ->
		$('.planets').val()

	constructor: () ->
		@gamesList = $('.games')
		@planetsList = $('.planets')
		app.GameLoader.loadGamesConfig()
		$('button.play').click => @startGame()
		@setRequestedPlanet()

	startGame: () ->
		game = app.Universe.Games[@gamesList.val()]
		game = new app.Game($('.game-board'),game,@planetsList)
		new app.ColorManager($('.game-board canvas'),()->game.redraw())

	setRequestedPlanet: ()-> 
		vars = @getParams()
		if(vars["game"]?)
			@gamesList.val(vars["game"])

		if(vars["planet"]?)
			@planetsList.val(vars["planet"])
			@startGame()


	getParams: () ->
		query = window.location.search.substring(1)
		raw_vars = query.split("&")

		params = {}

		for v in raw_vars
		  [key, val] = v.split("=")
		  params[key] = decodeURIComponent(val)

		params



