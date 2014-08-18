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
		ko.applyBindings this,$('.game-designer')[0]
		$('.has-tooltip').tooltip()

	saveGame: () -> 
		$('.save-game').text('Saving...')
		$.ajax
			url: app.ConstructorConfig.serverAddress+"/api/robbo"
			data: app.Universe
			type: "POST"
			success: ()-> setTimeout((()->$('.save-game').text('Save game')),200)

		return

	newGame: () ->
		name = "Game "+(app.Universe.Games.length+1)
		planet = @createPlanet()
		planet.Name += " 1"
		app.Universe.Games.push 
			Name: name
			StartingNumberOfLives: 9
			Planets : [planet]

		app.GameLoader.loadGamesConfig()
		app.GameLoader.selectGame(app.Universe.Games.length-1)
		@load()
		return

	removePlanet: () ->
		if (!app.GameLoader.currentPlanet()?) then return 

		if !confirm("Are you sure you want remove current planet?") then return

		app.Universe.Games[app.GameLoader.currentGame()].Planets.splice(app.GameLoader.currentPlanet(),1)
		app.GameLoader.loadGamesConfig()

	toggleRawMap: () ->
		if($('.map').is(":visible"))
			$('.map').hide("blind")
		else
			$('.map').show("blind")

	removeGame: () -> 
		if (app.GameLoader.currentGame()=="0") 
			alert("You can't remove original game")
			return

		if !confirm("Are you sure you want remove current game?") then return

		app.Universe.Games.splice(app.GameLoader.currentGame(),1)
		app.GameLoader.loadGamesConfig()

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
		gameN = app.GameLoader.currentGame()

		planet = @createPlanet()
		game = app.Universe.Games[app.GameLoader.currentGame()]
		planet.Name += " "+(game.Planets.length+1)
		game.Planets.push planet
		app.GameLoader.loadGamesConfig()
		app.GameLoader.selectGame(gameN)
		app.GameLoader.selectPlanet(game.Planets.length-1)
		@load()

	testPlanet: () ->
		window.open("robbo.html?game=#{app.GameLoader.currentGame()}&planet=#{app.GameLoader.currentPlanet()}","_blank")

	load: () ->
		game = app.Universe.Games[$('.games').val()]
		planet = game.Planets[$('.planets').val()]
		@width(app.MapLoader.getWidth(planet.Map))
		@height(app.MapLoader.getHeight(planet.Map))
		@planetName(planet.Name)
		@gameName(game.Name)
		@bolts(planet.BoltsToBeCollected)
		@lives(game.StartingNumberOfLives)
