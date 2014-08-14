window.app = window.app ? {}
app = window.app

class app.Ship extends app.Object
	isShipActive: false
	@include new app.Moveable()
	@include new app.Animatable()
	@include new app.Bombblowable()

	constructor: (@envCtx,@x,@y) ->
				super('ship-inactive')
				@eventAggregator.subscribe 'robbo-moving',
											() => @onRobboSteptOn(),
											this,
											(x,y)=> x == @x and y == @y

				@eventAggregator.subscribe 'all-bolts-collected', 
											() => @activateShip(),
											this
				@animations=[]
				@animations.push (new app.Animation 'active',['ship-active','ship-inactive'],app.Predef.Ship.animationDelay)

	onRobboSteptOn: () ->
		if  @isShipActive 
			robbo = @envCtx.getRobbo()
			robbo.deactivate()
			@envCtx.rmObj robbo
			@eventAggregator.publish 'level-up'

	canStepOn: (delta) ->
			@isShipActive || @envCtx.getObjAtD(this,delta) is null

	activateShip: () ->
			@eventAggregator.publish 'thunder'
			
			@isShipActive=true
			@isMoveable = false
			@animate 'active'

	levelUp: () ->
			
			