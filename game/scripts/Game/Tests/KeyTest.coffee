## <reference path="References.coffee" />
window.app = window.app ? {}
app = window.app


module('Key tests')
test "Key is collectable" , () ->
	app.TestCollectable.testObject app.Key,1,(r)->r.keys


test "Can bomb blow up key", () ->
	app.TestBombblowable.testObject app.Key