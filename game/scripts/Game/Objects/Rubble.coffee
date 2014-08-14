window.app = window.app ? {}
app = window.app

class app.Rubble extends app.Object
	@include(new app.Blowable)
	constructor: (@envCtx,@x,@y) ->
				super('rubble')
	canStepOn: () ->
		false

