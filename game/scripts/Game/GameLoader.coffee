window.app = window.app ? {}
app = window.app


class app.GameLoader
	@loadGamesConfig: ->
		gamesList = $('.games')
		gamesList.find('option').remove()
		
		for game,i in app.Universe.games
			gamesList
				.append($('<option></option>')
					.attr('value',game.index)
					.text(game.name))

		app.GameLoader.reloadPlanets()
		return

	@reloadPlanets: () -> 
		planetsList = $('.planets')
		planetsList.find('option').remove()
		for planet,i in @currentGame().planets
			planetsList
				.append($('<option></option>')
					.attr('value',planet.index)
					.text(planet.name))

		planetsList.change()

	@currentGame: () ->
		app.Universe.games.single (g)-> g.index.toString()==app.GameLoader.currentGameIndex()

	@currentGameIndex: ->
		$('.games').val()

	@currentPlanetIndex: ->
		$('.planets').val()

	constructor: () ->
		@gamesList = $('.games')
		@planetsList = $('.planets')
		@gamesList.change =>  app.GameLoader.reloadPlanets()
		app.GameLoader.loadGamesConfig()
		$('button.play').click => @startGame()
		@setRequestedPlanet()

	startGame: () ->
		game = app.GameLoader.currentGame()
		game = new app.Game($('.game-board'),game,@planetsList,app.GameLoader.currentPlanetIndex())
		
	setRequestedPlanet: ()-> 
		vars = @getParams()
		if(vars["game"]?)
			@gamesList.val(vars["game"])

		if(vars["planet"]?)
			planet = 
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



