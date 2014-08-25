window.app = window.app ? {}
app = window.app

class app.Wall extends app.Object
	constructor: (@envCtx,@x,@y,@variation) ->
				super('brick-'+@variation)
	canStepOn: () ->
		false
