window.app = window.app ? {}
app = window.app

class app.Eyes extends app.Object
	@include(new app.Multistate)
	@include(new app.Blowable)
	@include(new app.Enemy)
	isActive: false
	randomDeltas: [[0,1],[1,0],[-1,0],[0,-1]]

	constructor: (@envCtx,@x,@y) ->
		@delay = app.Predef.Eyes.movementDelay
		super('eyes-u')
		@envCtx.registerRandomCall this,()=>@randomMove()
		@eventAggregator.subscribe 'robbo-moved', 
			((x,y) => @attack(x,y)  ),
			this,
			(x,y)=> @isRobboInRange(x,y)

	randomMove: () ->
		delta = @randomDeltas[app.Tools.getRand(0,3)]

		objAhead = @envCtx.getObjAt @x+delta[0],@y+delta[1]
		if objAhead is null
			@envCtx.moveObjBy @x,@y,delta[0],delta[1]


	init: () ->
		@isActive = true
		@moveOneStep()

	moveOneStep: ()->
		if not @isActive then return
		@changeState()
		deltas = @getDeltas()
		if deltas?
			for delta in deltas
				objAhead = @envCtx.getObjAt @x+delta[0],@y+delta[1]
				if objAhead is null
					@envCtx.moveObjBy @x,@y,delta[0],delta[1]
					break
			@attack()
		@envCtx.delay @delay,()=>@moveOneStep()


	stateSelector: (currentState, args...) ->
		if currentState[5]=='u'
			return 'eyes-d'
		'eyes-u'

	getDeltas: ()->
		robbo = @envCtx.getRobbo()
		if not robbo? then return null
		dx = robbo.x-@x
		if dx>0 then dx=1
		else if dx<0 then dx=-1
		dy = robbo.y-@y
		if dy>0 then dy=1
		else if dy<0 then dy=-1
		if app.Tools.getRand(0,1)==1
			[[dx,0],[0,dy]]
		else
			[[0,dy],[dx,0]]

	onBlowUp: ()->
		@envCtx.unregisterRandomCalls this
		@envCtx.eventAggregator.unsubscribe this

		