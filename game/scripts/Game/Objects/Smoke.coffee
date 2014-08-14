window.app = window.app ? {}
app = window.app

class app.Smoke extends app.DisappearingAnimation
	constructor: (envCtx,x,y,startState,@onFinish) ->
		super(envCtx,x,y,'smoke',app.Predef.Smoke.animationDelay,startState)
