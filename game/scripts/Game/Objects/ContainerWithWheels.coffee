window.app = window.app ? {}
app = window.app

class app.ContainerWithWheels extends app.Object
	@include (new app.Bombblowable)

	constructor: (@envCtx,@x,@y) ->
		super('container-with-wheels')
		@delay = app.Predef.ContainerWithWheels.movementDelay
		@eventAggregator.subscribe 'robbo-moving', 
			((x,y,delta) => @pushContainer(delta) ),
			this,
			(x,y)=> x == @x and y == @y

	pushContainer: (delta) ->
		@moveOneStep(delta)


	moveOneStep: (delta) ->
		obj = @envCtx.getObjAtD this,delta
		if obj is null 
			@envCtx.moveObjByD @x,@y,delta
			@envCtx.sound 'container'
			@envCtx.delay @delay,()=>@moveOneStep(delta)
		else if obj.canBlowUp?()
			obj.blowUp()
			return
		
		
		
		