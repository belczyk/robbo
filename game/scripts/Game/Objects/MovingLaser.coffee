window.app = window.app ? {}
app = window.app

class app.MovingLaser extends app.Laser
	@include (new app.Walking)
	@include (new app.Moveable)	
	constructor: (@envCtx,@x,@y,@orientation,@direction) ->
		@delay = app.Predef.MovingLaser.movementDelay
		super(@envCtx,@x,@y,@direction)
		@delta = app.Delta.fromOrientation(orientation)
		@startWalking()
	
	changeState: () ->
	init: () ->

