window.app = window.app ? {}
app = window.app

class app.IonStorm extends app.Object
	@include new app.Blowable
	isActive: true
	constructor: (@envCtx,@x,@y,orientation) ->
		@delta = app.Delta.fromOrientation(orientation)
		super('ion-storm')
	
	getOrigin: ()->
		row = @envCtx.getRow @y
		for i in [(@x+1)..row.length]
			obj = row[i]
			if obj? and (name = @envCtx.getObjName obj) is 'Wall'
				origin = 
						x: i-1
						y: @y
		if not origin?
			origin =
				x: @envCtx.width-1
				y: @y
		origin
	init: () ->
		@moveOneStep()

	moveOneStep: () ->	
		if @isActive
			objAhead = @envCtx.getObjAtD this,@delta
			if objAhead==null or ((name = @envCtx.getObjName objAhead) isnt 'Wall' and name isnt 'IonStorm' and not objAhead.outsideMap)
					@envCtx.moveObjByD this.x,this.y,@delta
			else
				origin = @getOrigin()
				@envCtx.setObjAt @x,@y,null
				@x=origin.x
				@y=origin.y
				@envCtx.putObj this
			@envCtx.delay app.Predef.IonStorm.movementDelay, ()=>@moveOneStep() if @isActive
	
	canBlowUp: () -> true

	blowUp: () ->
		@isActive = false
		@envCtx.rmObj this