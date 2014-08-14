window.app = window.app ? {}
app = window.app

class app.Moveable
	canStepOn: (delta) ->
			@envCtx.getObjAtD(this,delta) is null

	isMoveable: true

