window.app = window.app ? {}
app = window.app

class app.Walking 
	constructor: () ->
	startWalking: (@afterMove) ->
		@envCtx.delay @delay,()=>@oneStep()
		@isActive = true

	oneStep: () ->
		if not @isActive then return
		obj =@envCtx.getObjAtD this,@delta
		if (not obj?)
			@step()
		else
			@delta=@delta.reversed()
			@step(true)
		@afterMove?()

	step: (bounce) ->
		if (!bounce? || !bounce)
			@envCtx.moveObjByD @x,@y,@delta
		@envCtx.delay(@delay,()=>@oneStep())
		@changeState() 