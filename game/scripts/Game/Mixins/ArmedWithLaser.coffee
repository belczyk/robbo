window.app = window.app ? {}
app = window.app
	
class app.ArmedWithLaser

	constructor: () ->

	initLaser: () ->
		@laserDelta = app.Delta.fromDirection(@direction)
		
		@envCtx.registerRandomCall this,()=>@fire()

	fire: () ->
		try
			@.onFire?()
			obj = @envCtx.getObjAtD this,@laserDelta
			if !obj?
				beam = new app.LaserBeam @envCtx,@laserDelta.x(@x),@laserDelta.y(@y),@laserDelta
				@envCtx.setObjAtD this,@laserDelta,beam
				beam.init()
			else if obj.canBlowUp?()
				obj.blowUp()
		catch e
			console.log e


	onBlowUp: () ->
		@envCtx.unregisterRandomCalls this
