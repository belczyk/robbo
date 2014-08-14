window.app = window.app ? {}
app = window.app

class app.Nothing extends app.Object
	constructor: (@envCtx,@x,@y) ->
				super('nothing')
	canStepOn: () ->
		false
	

		

