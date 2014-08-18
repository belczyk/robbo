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

	saveGame: () -> 
		alert(app.ConstructorConfig.serverAddress+"/api/robbo")

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


	toggleOptions: (x,e) -> 
		if(@optionsPanel.is(':visible'))
			@optionsPanel.hide('blind')
			$(e.target).find('i').removeClass('glyphicon-chevron-up')
			$(e.target).find('i').addClass('glyphicon-chevron-down')
		else
			@optionsPanel.show('blind')
			$(e.target).find('i').removeClass('glyphicon-chevron-down')
			$(e.target).find('i').addClass('glyphicon-chevron-up')



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
