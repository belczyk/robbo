window.app = window.app ? {}
app = window.app

class app.GameDesigner
	constructor: () -> 
		@gameName = ko.observable("game")
		@planetName = ko.observable("planet")
		@lives = ko.observable(9)
		@bolts = ko.observable(5)
		@width = ko.observable(16)
		@height = ko.observable(32)

		ko.applyBindings this,$('.game-designer')[0]

	saveGame: () -> 
		alert('save')

	newGame: () ->
		alert('new')

	newPlanet: ()-> 
		alert('newp')

	testPlanet: () ->
		window.open("robbo.html?game=#{app.GameLoader.currentGame()}&planet=#{app.GameLoader.currentPlanet()}","_blank")

	load: () ->
		game = app.Universe.Games[$('.games').val()]
		planet = game.Planets[$('.planets').val()]
		@width(app.MapLoader.getWidth(planet.Map))
		@width(app.MapLoader.getHeight(planet.Map))
		@planetName(planet.Name)
		@gameName(game.Name)
		@bolts(planet.BoltsToBeCollected)
		@lives(game.StartingNumberOfLives)
