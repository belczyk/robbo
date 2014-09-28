window.app = window.app ? {}
app = window.app

class app.RestartLevelWatcher
	
	constructor: (@envCtx,@eventAggregator) ->
		@eventAggregator.subscribe 'key-press', ((args)=>@restartLevel()),(args)=> args.keyChar = "r" and args.shiftKey

	restartLevel: () ->
		robbo = @envCtx.getRobbo()
		robbo.blowUp()
