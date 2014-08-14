window.app = window.app ? {}
app = window.app

class app.Bat extends app.Object
	@include(new app.Multistate)
	@include(new app.Blowable)
	@include(new app.Walking)
	@include(new app.Enemy)

	isActive: true
	constructor: (@envCtx,@x,@y,orientation) ->
		@delay = app.Predef.Bat.movementDelay
		super('bat-u')
		@delta = app.Delta.fromOrientation(orientation)
		@eventAggregator.subscribe 'robbo-moved', 
			((x,y) => @attack(x,y)  ),
			this,
			(x,y)=> @isRobboInRange(x,y)
		@startWalking(()=>@onMove())


	onMove: () ->
		@attack()

	bounce: () ->
		@delta.reverse()

	stateSelector: (currentState, args...) ->
		if currentState[4]=='u'
			return 'bat-d'
		'bat-u'