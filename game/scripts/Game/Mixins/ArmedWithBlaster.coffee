window.app = window.app ? {}
app = window.app
	
class app.ArmedWithBlaster

	constructor: () ->

	initBlaster: () ->
		@blastDelta = app.Delta.fromDirection(@direction)

		@envCtx.registerRandomCall this,()=>@fire()

	fire: () ->
			@.onFire?()
			obj = @envCtx.getObjAt @blastDelta.x(@x),@blastDelta.y(@y)
			if !obj? or obj.canBlowUp?()
				blast = new app.Blast @envCtx,@blastDelta.x(@x),@blastDelta.y(@y),@direction
				@envCtx.putObj blast
				blast.init()

	onBlowUp: () ->
		@envCtx.unregisterRandomCalls this