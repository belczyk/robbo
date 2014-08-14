window.app = window.app ? {}
app = window.app

class app.Laser extends app.Object
	@include new app.Bombblowable()
	@include new app.ArmedWithLaser()
	constructor: (@envCtx,@x,@y,@direction) ->
		@initLaser()
		super("laser-#{direction[0]}")



