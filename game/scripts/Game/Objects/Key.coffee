window.app = window.app ? {}
app = window.app

class app.Key extends app.Object
	@include new app.Collectable('key')
	@include new app.Bombblowable()
	constructor: (@envCtx,@x,@y) ->
				super('key')
				@eventAggregator.subscribe 'robbo-moved', 
											(() => @collect() ),
											this,
											(x,y)=> x == @x and y == @y

	onCollect: ()-> @envCtx.sound 'key'
