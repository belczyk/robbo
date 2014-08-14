## <reference path="References.coffee" />
window.app = window.app ? {}
app = window.app

module('Ship tests')
test "Is ship moveable" , () ->
	app.TestMoveable.testObject(app.Ship)
