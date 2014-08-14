window.app = window.app ? {}
app = window.app

class app.Blaster extends app.Object
	@include new app.Bombblowable()
	@include new app.ArmedWithBlaster()

	constructor: (@envCtx,@x,@y,@direction) ->
		@initBlaster()
		super("laser-#{direction[0]}")

