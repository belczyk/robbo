
window.app = window.app ? {}
app = window.app

class app.LaserBeam extends app.Object
	@include(new app.Multistate)

	constructor: (@envCtx,@x,@y,@delta) ->
		@delay = app.LaserBeam.movementDelay
		@isActive = false
		super(if delta.dy()==0 then 'laser-beam-ho' else 'laser-beam-vo')

	init: () ->
		@isActive = true
		@envCtx.delay @delay,()=>@oneStep()

	oneStep: () ->
		obj =@envCtx.getObjAtD this,@delta 
		if (not obj?)
			@beam()
		else
			@hitObject(obj)

	beam: () ->
		@envCtx.moveObjByD @x,@y,@delta
		@envCtx.delay(app.Predef.LaserBeam.movementDelay,()=>@oneStep())
		@changeState()

	hitObject: (obj)->
		if (obj.canBlowUp? and obj.canBlowUp())
			@blewUpObject(obj)
		else
			@desintegrate()
			#@envCtx.sound 'rebound'

	blewUpObject: (obj) ->
		obj.blowUp()
		@isActive = false
		@envCtx.rmObj this
		@desintegrate()

	desintegrate: () ->
		@isActive = false
		smoke = new app.Smoke(@envCtx,@x,@y,2)
		smoke.disturbsBlast = true
		@envCtx.putObj smoke
		smoke.init()

	stateSelector: (currentState, args...) ->
		if currentState[12]=='o'
			return currentState.substring(0,12)+'e'
		return currentState.substring(0,12)+'o'