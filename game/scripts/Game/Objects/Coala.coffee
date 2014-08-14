window.app = window.app ? {}
app = window.app

class app.Coala extends app.Object
	@include(new app.Multistate)
	@include(new app.Blowable)
	@include( new app.Circlewalker('conterClockwise'))
	@include(new app.Enemy)
	isActive: true
	constructor: (@envCtx,@x,@y) ->
		super('coala-u')
		@eventAggregator.subscribe 'robbo-moved', 
			((x,y) => @attack(x,y)  ),
			this,
			(x,y)=> @isRobboInRange(x,y)


	stateSelector: (currentState, args...) ->
		if currentState[6]=='u'
			return 'coala-d'
		'coala-u'	