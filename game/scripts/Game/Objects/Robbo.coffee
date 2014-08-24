window.app = window.app ? {}
app = window.app

	
class app.Robbo extends app.Object
	@include (new app.Blowable)
	@include (new app.Multistate)
	isRobbo: true
	isActive: true
	canMove: true
	
	constructor: (@envCtx,@x,@y) ->
				super('robbo-fu')
				@ammo = 0
				@bolts = 0
				@keys = 0
				@currentState = 'robbo-fu'
				@delay = app.Predef.Robbo.movementDelay
				@eventAggregator.subscribe 'arrow-down',
											((args)=>@arrowDown(args)),
											this
				@eventAggregator.subscribe 'ammo-collected',
										((count)=>@ammo+=count)
				@eventAggregator.subscribe 'bolt-collected',
										(()=>@bolts++)
				@eventAggregator.subscribe 'key-collected',
										(()=>@keys++)
				@eventAggregator.subscribe 'key-used',
										(()=>@keys--)
					
	onBlowUp: () ->
				@envCtx.timer.randomCallers  = []
				@envCtx.timer.resetToken()
				@eventAggregator.publish 'robbo-destroyed'

	stateSelector: (delta,currentState, args...) ->
					s = currentState[6]
					ms = currentState[7]
					ms = if ms=='u' then 'd' else 'u'
					if ((s=='f' or s=='l')and delta.dx() == -1 and delta.dy()== 0)
						return 'robbo-l'+ms
					else if ((s=='f' or s=='r')and delta.dx() == 1 and delta.dy()== 0)
						return 'robbo-r'+ms
					else if (s=='f' and delta.dx() == 0 and delta.dy()== 1)
						return 'robbo-f'+ms
					else if ((s=='f' or s=='u') and delta.dx() == 0 and delta.dy()== -1)
						return 'robbo-u'+ms
					return 'robbo-fu'



	deactivate: ()->
		@isActive = false
		@canMove = false
	activate: () ->
		@isActive = true
		@canMove = true

	arrowDown: (evnetArgs) ->
		if not @canMove  then return
		if (evnetArgs.ctrl or evnetArgs.shift)
			if @ammo<=0 then return
			@fire(evnetArgs.direction)
		else
			@makeMove(evnetArgs.direction)

	fire: (direction) ->
		delta = @getDelta(direction)
		@ammo--
		@eventAggregator.publish 'ammo-used'
		@envCtx.sound 'fire'
		x_ = delta.x(@x)
		y_ = delta.y(@y)
		obj = @envCtx.getObjAt x_,y_
		if !(obj)?
			beam = new app.LaserBeam @envCtx,x_,y_,delta
			@envCtx.putObj beam
			beam.init()
		else if  (obj.canBlowUp and obj.canBlowUp())
			obj.blowUp()
		@changeState delta

	makeMove: (direction) ->
		
		if @lastMove!=null and ((new Date())-@lastMove)<@delay then return
		delta = @getDelta(direction)
		newX = delta.x(@x)
		newY = delta.y(@y)
		@eventAggregator.publish 'robbo-moving',newX,newY,delta

		obj = @envCtx.getObjAt(newX,newY)
		if @isActive
			@envCtx.delay app.Predef.Robbo.changeStateDelay,()=>@changeState delta if @isActive
		if (obj is null or obj.canStepOn?(delta))
			@envCtx.stepOnD newX,newY, delta
			@envCtx.moveObjByD @x,@y, delta
			@eventAggregator.publish 'robbo-moved',@x,@y,delta
			@envCtx.sound 'step'
		@lastMove = new Date()

	getDelta: (direction) ->
		delta = app.Delta.fromDirection(direction)
		
	

