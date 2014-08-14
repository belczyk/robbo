window.app = window.app ? {}
app = window.app

class app.BlastPart extends app.Object
	constructor: (@envCtx,@x,@y,asset) ->
		super(asset)

class app.Blast
	constructor: (@envCtx,@x,@y,@direction) ->
		@elements= []
		@isBlastActive= false
		@toEmit= [4,3,2,1,2,3,4]
		@delay= app.Predef.Blast.movementDelay
		@emiting= true
		@blastDelta = app.Delta.fromDirection(@direction)


	emit: ()->
		toemit =@toEmit.where((p)->p?)
		@emiting = toemit.length>0 
		if not @emiting then return

		part = new app.BlastPart(@envCtx,@x,@y,"smoke-#{toemit.first()}")
		for i in [0..@toEmit.length-1]
			if @toEmit[i]?
				@toEmit[i] = null
				break

		@elements.push part
		@envCtx.putObj part
		
	init: () ->
		@isBlastActive = true
		@envCtx.delay @delay,()=>@moveOneStep()
	
	moveOneStep: () ->

		for i in [0..(@elements.length-1)]
			part = @elements[i]
			if not part? then continue
			objAhead = @envCtx.getObjAt @blastDelta.x(part.x),@blastDelta.y(part.y)

			if @stopAt? and @stopAt[0]==part.x and  @stopAt[1]==part.y
				@envCtx.rmObj part
				@elements[i] = null
			else if (objAhead) is null				
				@envCtx.moveObjByD part.x,part.y,@blastDelta
			else if @envCtx.getObjName(objAhead) is 'LaserBeam' or (objAhead.disturbsBlast? and  objAhead.disturbsBlast)
				@stopAt = [part.x,part.y]
				@envCtx.rmObj part
				@elements[i] = null

			else if objAhead.canBlowUp?()
				objAhead.isActive = false
				@envCtx.unregisterRandomCalls objAhead
				@envCtx.eventAggregator.unsubscribe objAhead
				objAhead.blast?()
				@envCtx.moveObjByD part.x,part.y,@blastDelta
			else
				@envCtx.rmObj part
				@elements[i] = null
		
		@emit() if @emiting

		if (@elements.where((p)->p?).length>0)
			@envCtx.delay @delay,()=>@moveOneStep()

	
