window.app = window.app ? {}
app = window.app

class app.MightyLive extends app.Live
	todestroy = ['Door','Laser','RotatingLaser','StableBeamLaser','Blaster','Ant','Coala','Magnet','Bat','FiringBat','Eyes','MovingLaser']
	constructor: (@envCtx,@x,@y) ->
				super(@envCtx,@x,@y)

	onCollect: ()-> 
		@envCtx.sound 'live'
		@eventAggregator.publish 'thunder'
		for row in @envCtx.map
			for obj in row
				if obj is null then continue				
				if todestroy.contains(@envCtx.getObjName obj)
					obj.isActive = false
					@envCtx.unregisterRandomCalls obj
					@eventAggregator.unsubscribe obj
					
					@envCtx.rmObj obj
