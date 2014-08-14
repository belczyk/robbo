## <reference path="References.coffee" />
window.app = window.app ? {}
app = window.app

module('Container tests')
test "Is container moveable" , () ->
	app.TestMoveable.testObject( app.Container)

test "Can bomb blow up container", () ->
	app.TestBombblowable.testObject app.Container