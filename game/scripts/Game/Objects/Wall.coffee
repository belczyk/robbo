window.app = window.app ? {}
app = window.app

class app.Wall extends app.Object
	constructor: (@envCtx,@x,@y) ->
				super('wall')
	canStepOn: () ->
		false
