window.app = window.app ? {}
app = window.app

class app.RobboConstructor

	constructor: (universe,@gameDesinger) ->
		@games = ko.observableArray()
		for game in universe.games
			@games.push ko.mapping.fromJS(game)
		@gameId = ko.observable(0)
		@planets = @games()[0].planets
		@planetId = ko.observable(0)
		@gameId.subscribe ()=> @planetId(0)
		@game = ko.computed () =>
			ko.mapping.fromJS @games()[@gameId()]
		@planet = ko.computed () =>
			ko.mapping.fromJS @planets()[@planetId()]

		ko.applyBindings this, @gameDesinger[0]
		return

	saveGame: () ->
	newGame: () ->
	removeGame: () ->
	newPlanet: () ->
	removePlanet: () ->
	testPlanet: () ->
	toggleOptions : ()->
	toggleRawMap   : ()->


