window.app = window.app ? {}
app = window.app

class app.Container extends app.Object
	@include (new app.Moveable)
	@include (new app.Bombblowable)
	constructor: (@envCtx,@x,@y) ->
				super('container')
	onPush: ()-> @envCtx.sound 'container'
