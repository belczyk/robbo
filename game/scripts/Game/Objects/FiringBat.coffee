window.app = window.app ? {}
app = window.app

class app.FiringBat extends app.Bat

	@include (new app.ArmedWithLaser)	

	constructor: (@envCtx,@x,@y,@orientation,@direction) ->
		@delay = app.Predef.FiringBat.movementDelay
		super(@envCtx,@x,@y,@orientation)
		@initLaser()
