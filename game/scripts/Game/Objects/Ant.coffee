window.app = window.app ? {}
app = window.app

class app.Ant extends app.Object
	@include(new app.Multistate)
	@include(new app.Blowable)
	@include( new app.Circlewalker('clockwise'))
	@include(new app.Enemy)
	isActive: true
	constructor: (@envCtx,@x,@y) ->
		super('ant-u')
		@eventAggregator.subscribe 'robbo-moved', 
			((x,y) => @attack(x,y)  ),
			this,
			(x,y)=> @isRobboInRange(x,y)

	stateSelector: (currentState, args...) ->
		if currentState[4]=='u'
			return 'ant-d'
		'ant-u'	
