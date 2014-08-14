window.app = window.app ? {}
app = window.app

class app.DisappearingAnimation extends app.Object
	@include (new app.Multistate)
	constructor: (@envCtx,@x,@y,@asset,@delay,@startState,@numberOfStates,@direction) ->
		@direction?=1
		@startState?=1 if @direction is 1

		@delay?=app.DisappearingAnimation.defaultAnimationDelay
		@numberOfStates?=4
		super(@asset+'-'+@startState)
	isDisappearingAnimation: true
	init: () ->
		@oneStep()	

	oneStep: () ->
		if (@currentState isnt @asset+'-'+@numberOfStates and @direction is 1) or
			(@currentState isnt @asset+'-1' and @direction is -1)
				@changeState(@asset,@direction)
				@envCtx.delay(@delay,()=>@oneStep())
		else
			obj = @envCtx.getObjAt @x,@y 
			if obj == this
				@envCtx.rmObj this
			@onFinish?()

	stateSelector: (asset,direction,currentState,args...) ->
		start = currentState.lastIndexOf('-')
		i = parseInt currentState.substring(start+1)
		i+=direction
		return asset+'-'+i 