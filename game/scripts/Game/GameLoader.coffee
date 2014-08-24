window.app = window.app ? {}
app = window.app


class app.GameLoader
	@loadGamesConfig: ->
		gamesList = $('.games')
		gamesList.find('option').remove()
		
		for game,i in app.Universe.games
			gamesList
				.append($('<option></option>')
					.attr('value',i)
					.text(game.name))

		app.GameLoader.reloadPlanets()
		return

	@reloadPlanets: () -> 
		planetsList = $('.planets')
		planetsList.find('option').remove()
		for planet,i in app.Universe.games[app.GameLoader.currentGame()].planets
			planetsList
				.append($('<option></option>')
					.attr('value',i)
					.text(planet.name))

		planetsList.change()

	@currentGame: ->
		$('.games').val()

	@currentPlanet: ->
		$('.planets').val()

	@selectGame: (n) -> 
		$('.games').val(n)
		$('.games').change()

	@selectPlanet: (n) -> 
		$('.planets').val(n)
		$('.planets').change()

	constructor: () ->
		@gamesList = $('.games')
		@planetsList = $('.planets')
		@gamesList.change =>  app.GameLoader.reloadPlanets()
		app.GameLoader.loadGamesConfig()
		$('button.play').click => @startGame()
		@setRequestedPlanet()

	startGame: () ->
		game = app.Universe.games[@gamesList.val()]
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



