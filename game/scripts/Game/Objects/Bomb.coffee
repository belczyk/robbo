window.app = window.app ? {}
app = window.app

class app.Bomb extends app.Object
	@include (new app.Moveable)
	@include (new app.Blowable)
	constructor: (@envCtx,@x,@y) ->
				super('bomb')
	isBomb: () -> true
	activeBomb: true

	createBlowupCallback: (x,y) ->
		() => @envCtx.getObjAt(x,y).blowUp() 

	onPush: ()-> @envCtx.sound 'container'

	blowUp: () ->
		if not @activeBomb then return
		@activeBomb = false
		this.blowUpItself()
		for dx in [-1..1]
			for dy in [-1..1]
				if (dx is 0 and dy isnt 0) or (dx isnt 0 and dy is 0) or (dx isnt 0 and dy isnt 0)
					obj = @envCtx.getObjAt @x+dx,@y+dy
					if obj is null
						@showSmoke(dx,dy)
					else if obj.isBomb?()
						@envCtx.delay 180, @createBlowupCallback(obj.x,obj.y)
					else if (obj.canBlowUp? and obj.canBlowUp()) or (obj.canBombBlowUp? and obj.canBombBlowUp()) 
						obj.blowUp()
					else if @envCtx.getObjName(obj)=='LaserBeam'
						@showSmoke(dx,dy)
						@envCtx.eventAggregator.unsubscribe obj
		return

	blowUpItself: () ->
		smoke = new app.Smoke(@envCtx,@x,@y)
		@envCtx.putObj smoke
		smoke.init()
		@envCtx.eventAggregator.unsubscribe this
		@envCtx.sound 'explosion'

	showSmoke: (dx,dy) ->
		smoke = new app.Smoke(@envCtx,@x+dx,@y+dy)
		@envCtx.putObj smoke
		smoke.init()

