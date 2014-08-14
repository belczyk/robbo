## <reference path="References.coffee" />



window.app = window.app ? {}
app = window.app


module('Bomb tests')
test "Is bomb moveable" , () ->
	app.TestMoveable.testObject( app.Bomb)