window.app = window.app ? {}
app = window.app

class app.Blink extends app.DisappearingAnimation
	constructor: (envCtx,x,y,direction,@onFinish) ->
		startState= 1 if direction is 1
		startState= 4 if direction is -1
		super(envCtx,x,y,'blink',app.Predef.Blink.animationDelay,startState,4,direction)