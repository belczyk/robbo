window.app = window.app ? {}
app = window.app

class app.RobboConstructor
	constructor: (universe,@gameDesigner) ->
		@eventCtx = new app.EventAggregator()
		@games = app.Universe.games

		@designerVM = new app.GamesOptions(@gameDesigner,@games,@eventCtx)




