window.app = window.app ? {}
app = window.app

class app.Door extends app.Object
	@include(new app.Bombblowable())
	
	constructor: (@envCtx,@x,@y) ->
				super('door')
				@eventAggregator.subscribe 'robbo-moving', 
											(() => @openDoor() ),
											this,
											(x,y)=> x == @x and y == @y

	openDoor: () ->
		robbo = @envCtx.getRobbo()
		if robbo.keys>0
			@eventAggregator.publish 'key-used'
			@envCtx.sound 'door'
			@envCtx.delay 100, ()=>
				@eventAggregator.unsubscribe this
				@envCtx.setObjAt @x,@y,null
			
