window.app = window.app ? {}
app = window.app

class app.GameDesigner
	constructor: () -> 
		@gameName = ko.observable()
		@planetName = ko.observable()
		@lives = ko.observable()
		@bolts = ko.observable()
		@width = ko.observable()
		@height = ko.observable()
		@optionsPanel = $('.options-panel')
		@games = ko.observableArray()
		@planets = ko.observableArray()
		@selectedGame = ko.observable()
		@selectedPlanet = ko.observable()
		@selectedGameId = ko.observable(0)
		@selectedPlanetId = ko.observable(0)
		@selectedGameId.subscribe => 
			@selectedGame = @games()[@selectedGameId()]
			@selectedPlanetId(0)
			return 
		@selectedPlanetId.subscribe => 
			@selectedPlanet = @planets[@selectedPlanetId()]
			@load()
			return
		@loadGames()
		@loadPlanets()

		ko.applyBindings this,$('.game-designer')[0]
		$('.has-tooltip').tooltip()

	loadGames: ()->
		for game,i in app.Universe.Games
			game.index = i
			@games.push game
		@selectedGameId 0
		@selectedGame @games[0]

		return

	loadPlanets: () -> 
		for planet,i in app.Universe.Games[@selectedGameId()].Planets
			planet.index = i
			@planets.push planet
		@selectedPlanetId 0
		@selectedPlanet @planets[0]

		return
	saveGame: () -> 
		$('.save-game').text('Saving...')
		$.ajax
			url: app.ConstructorConfig.serverAddress+"/api/robbo"
			data: app.Universe
			type: "POST"
			success: ()-> setTimeout((()->$('.save-game').text('Save game')),200)

		return

	newGame: () ->
		name = "Game "+@games.length+1
		planet = @createPlanet()
		planet.Name += " 1"
		app.Universe.Games.push 
			Name: name
			StartingNumberOfLives: 9
			Planets : [planet]
		@loadGames()
		@load()
		return

	removePlanet: () ->
		if (!@currentPlanetId()?) then return 

		if !confirm("Are you sure you want remove current planet?") then return

		@currentGame().Planets.splice(@currentPlanetId(),1)


	toggleRawMap: () ->
		if($('.map').is(":visible"))
			$('.map').hide("blind")
		else
			$('.map').show("blind")

	removeGame: () -> 
		if (@currentGameId()=="0") 
			alert("You can't remove original game")
			return

		if !confirm("Are you sure you want remove current game?") then return

		app.Universe.Games.splice(@currentGameId(),1)


	toggleOptions: (x,e) ->
		if(@optionsPanel.is(':visible'))
			@optionsPanel.hide('blind')

		else
			@optionsPanel.show('blind')


	createPlanet: () -> 
		planet = 
			BoltsToBeCollected: 5
			Name: "Planet"
			Map : ""

		lines = []
		for  x in [0..31] 
			line = ""
			for  y in [0..16] 
				line+="_.."
			lines.push line

		planet.Map = lines.join("\n")
		planet 

	newPlanet: ()-> 
		planet = @createPlanet()
		planet.Name += " "+(@currentGame().Planets.length+1)
		game.Planets.push planet
		app.Universe.Games[@currentGameId()].Planets push planet
		@selectedPlanetId(game.Planets.length-1)
		@load()

	testPlanet: () ->
		window.open("robbo.html?game=#{@currentGameId()}&planet=#{@currentPlanetId()}","_blank")

	load: () ->
		@width(app.MapLoader.getWidth(@currentPlanet().Map))
		@height(app.MapLoader.getHeight(@currentPlanet().Map))
		@planetName(@currentPlanet().Name)
		@gameName(@currentGame().Name)
		@bolts(@currentPlanet().BoltsToBeCollected)
		@lives(@currentGame().StartingNumberOfLives)

$ ->
	new app.GameDesigner()