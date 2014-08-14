window.app = window.app ? {}
app = window.app

class app.Door extends app.Object
	
	unlocked: false
	opened: false
	constructor: (@envCtx,@x,@y) ->
				super('door')
				@eventAggregator.subscribe 'robbo-moving', 
											(() => @openDoor() ),
											this,
											(x,y)=> x == @x and y == @y

	canStepOn: -> @opend 

	openDoor: () ->
		robbo = @envCtx.getRobbo()
		if !@unlocked and robbo.keys>0
			@unlocked = true
			@eventAggregator.publish 'key-used'
			@envCtx.hide @x,@y
			@envCtx.sound 'door'
		else if @unlocked
			@opend = true
			@eventAggregator.unsubscribe this
