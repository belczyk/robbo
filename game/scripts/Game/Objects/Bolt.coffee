window.app = window.app ? {}
app = window.app

class app.Bolt extends app.Object
	@include(new app.Collectable('bolt'))
	@include(new app.Bombblowable())
	constructor: (@envCtx,@x,@y) ->
				super('bolt')
				@eventAggregator.subscribe 'robbo-moved', 
											(() => @collect() ),
											this,
											(x,y)=> x == @x and y == @y

	onCollect: ()-> @envCtx.sound 'bolt'