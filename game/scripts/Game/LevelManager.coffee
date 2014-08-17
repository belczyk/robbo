window.app = window.app ? {}
app = window.app

class app.LevelManger 
	constructor: (@gameBoard,@game,@planetsList) ->
		@currentLevel = parseInt(@planetsList.val())+1
		@lives = @game.StartingNumberOfLives

	setupCanvas: () ->
		@canvas = $('<canvas></canvas>')
		@gameBoard.html('')
		@gameBoard.append(@canvas)
		@canvasContext2D = @canvas.get(0).getContext('2d')

	setupLevel: () ->
		@setupCanvas()
		@eventAggregator = new app.EventAggregator()
		@drawingCtx = new app.DrawingContext @canvasContext2D
		@keyboardWatcher = new app.KeyboardWatcher @eventAggregator
		@timer = new app.TimeDelayedMethodCall
		@envCtx = new app.EnvironmentContext @eventAggregator,@drawingCtx,@timer
		@mapLoader = new app.MapLoader @envCtx,@canvas
		@effectManager = new app.MapEffects(@canvas,@envCtx)
		@setupWatchers()
		@subscribeToEvents()
		@envCtx.eventAggregator.publish 'starting-number-of-bolts', @game.Planets[@currentLevel-1].BoltsToBeCollected
		@envCtx.eventAggregator.publish 'load-level',@game.Planets[@currentLevel-1]

	setupWatchers: () ->
		@scrollWatcher = new app.ScrollWatcher @envCtx,@eventAggregator,@canvas
		@boltWatcher = new app.BoltWatcher @eventAggregator
		@keyWatcher = new app.KeyWatcher @eventAggregator
		@liveWatcher = new app.LiveWatcher @lives, @eventAggregator
		@ammoWatcher = new app.AmmoWatcher @eventAggregator

	subscribeToEvents: () ->
		@envCtx.eventAggregator.subscribe 'robbo-destroyed',(()=>@onRobboDestroyed())
		@envCtx.eventAggregator.subscribe 'level-loaded',(()=>@onLevelStarts())
		@envCtx.eventAggregator.subscribe 'level-up',(()=>@onLevelUp())
		@eventAggregator.subscribe 'live-collected', (()=>@lives++)
		
	startGame: () -> @setupLevel()
		

	onLevelUp: () ->
		@envCtx.eventAggregator.unsubscribeAll()
		@timer.resetToken()
		@currentLevel++
		@setupLevel()

	onLevelStarts: () ->
		@envCtx.eventAggregator.publish 'level-started' 
		@planetsList.val(@currentLevel-1)
		@envCtx.sound 'level-starts'

	onRobboDestroyed: ()->
		@lives--
		explosionCallback = () =>
			@envCtx.sound 'explosion'
			for y in [0..@envCtx.height-1]
				for x in [0..@envCtx.width-1]
					obj = @envCtx.getObjAt x,y
					if obj? and @envCtx.getObjName(obj) isnt 'Smoke' and (obj.canBlowUp?() or obj.canBombBlowUp?())
						obj.isActive = false
						smoke = new app.Smoke @envCtx,obj.x,obj.y
						@envCtx.putObj smoke
						@envCtx.eventAggregator.unsubscribe obj
						@envCtx.unregisterRandomCalls obj
						smoke.init()
			setTimeout((()=>
							@envCtx.eventAggregator.publish('restart-level',@game.Planets[@currentLevel-1])),2000)
		setTimeout(explosionCallback,700)
