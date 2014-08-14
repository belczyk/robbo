window.app = window.app ? {}
app = window.app

class app.RotatingLaser extends app.Object
	@include new app.Bombblowable()
	@include new app.ArmedWithLaser()
	@include new app.Multistate()

	directions: ['left','right','up','down']
	constructor: (@envCtx,@x,@y) ->
		@direction = @getRandomDirection();
		@updateLaserDelta()
		@initLaser()
		super("rotating-laser-#{@direction[0]}")
		@envCtx.registerRandomCall this,()=>@rotate()

	rotate: () ->
		@direction = @getRandomDirection()
		@updateLaserDelta()
		@changeState(@direction[0])

	stateSelector: (direction) ->
		return "rotating-laser-#{direction}"

	updateLaserDelta: () ->
		@laserDelta = app.Delta.fromDirection(@direction)

	getRandomDirection: () ->
		return @directions[app.Tools.getRand(0,3)]