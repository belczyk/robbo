window.app = window.app ? {}
app = window.app
	
class app.ArmedWithStableBeamLaser

	constructor: () ->

	initLaser: () ->
		@stableBeamDelta = app.Delta.fromDirection(@direction)
		
		@envCtx.registerRandomCall this,()=>@fire()

	fire: () ->
		@.onFire?()
		obj = @envCtx.getObjAtD this,@stableBeamDelta
		if !obj?
			beam = new app.StableBeam @envCtx,@stableBeamDelta.x(@x),@stableBeamDelta.y(@y),@direction
			@envCtx.setObjAtD this,@stableBeamDelta,beam
			beam.init()
		else if obj.canBlowUp?()
			obj.blowUp()


	onBlowUp: () ->
		@envCtx.unregisterRandomCalls this
