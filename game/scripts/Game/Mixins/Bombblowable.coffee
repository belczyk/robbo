window.app = window.app ? {}
app = window.app

class app.Bombblowable extends app.Module
	@include new app.Blowable()
	constructor: () ->

	canBlowUp: () -> false

	canBombBlowUp: () -> true