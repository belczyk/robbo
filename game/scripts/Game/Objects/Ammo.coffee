window.app = window.app ? {}
app = window.app

class app.Ammo extends app.Object
	@include(new app.Collectable('ammo'))
	@include(new app.Blowable)
	constructor: (@envCtx,@x,@y) ->
				super('ammo')
				@eventAggregator.subscribe 'robbo-moved', 
											(() => @collect() ),
											this,
											(x,y)=> x == @x and y == @y
				

	getCollectArgs: () -> app.Predef.Ammo.numOfCharges

	onCollect: ()-> @envCtx.sound 'ammo'
