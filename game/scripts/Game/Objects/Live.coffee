window.app = window.app ? {}
app = window.app

class app.Live extends app.Object
	@include(new app.Collectable('live'))
	@include(new app.Blowable())
	constructor: (@envCtx,@x,@y) ->
				super('live')
				@eventAggregator.subscribe 'robbo-moved', 
											(() => @collect() ),
											this,
											(x,y)=> x == @x and y == @y

	onCollect: ()-> @envCtx.sound 'live'