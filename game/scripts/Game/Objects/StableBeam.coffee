
window.app = window.app ? {}
app = window.app

class app.StableBeamPart extends app.Object
	@include(new app.Multistate)
	constructor: (@envCtx,@x,@y,asset) ->
		super(asset)

	stateSelector: (currentState, args...) ->
		if currentState[12]=='o'
			return currentState.substring(0,12)+'e'
		return currentState.substring(0,12)+'o'

class app.StableBeam

	
	constructor: (@envCtx,@x,@y,@direction) ->
		@delay = app.Predef.StableBeam.movementDelay
		@elements= []
		@bounced= false
		@stableBeamDelta = app.Delta.fromDirection(@direction)

		@orientationChar = @stableBeamDelta.orientationChar()



	init: ()->
		newX = @x
		newY = @y
		s = new app.StableBeamPart(@envCtx,newX,newY,"laser-beam-#{this.orientationChar}o")
		@envCtx.putObj s
		@elements.push s
		@envCtx.delay @delay,()=>@moveOneStep()
		
	moveOneStep: () ->

		for s in @elements.where((p)->p?)
			s.changeState()

		if @elements.where((p)->p?).length==0
			return
		if not @bounced
			@emit()
		else
			@retreat()

	retreat: ()->
		for i in [(@elements.length-1)..0]
			obj = @elements[i]
			if obj is null then continue
			@envCtx.rmObj obj
			@elements[i]=null
			@envCtx.delay @delay,()=>@moveOneStep()
			break

	emit: () ->
		newX = @stableBeamDelta.x(@elements.last().x)
		newY = @stableBeamDelta.y(@elements.last().y)
		objAhead = @envCtx.getObjAt(newX,newY)
		if (objAhead is null)
			if @lastBeamState=='o' 
				@lastBeamState='e' 
			else 
				@lastBeamState='o'
			s = new app.StableBeamPart(@envCtx,newX,newY,"laser-beam-#{this.orientationChar}"+@lastBeamState)
			@envCtx.putObj s
			@elements.push s
			
		else if objAhead.canBlowUp?()
			objAhead.blowUp()
			@bounced = true
		else
			@bounced = true
		@envCtx.delay @delay,()=>@moveOneStep()
