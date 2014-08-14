window.app = window.app ? {}
app = window.app

class app.StableBeamLaser extends app.Object
	@include new app.Bombblowable()
	@include new app.ArmedWithStableBeamLaser()
	constructor: (@envCtx,@x,@y,@direction) ->
		@initLaser()
		super("laser-#{this.direction[0]}")