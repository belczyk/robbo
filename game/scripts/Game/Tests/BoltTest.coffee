## <reference path="References.coffee" />
window.app = window.app ? {}
app = window.app


module('Bolt tests')
test "Bolt is collectable" , () ->
	app.TestCollectable.testObject app.Bolt,1,(r)->r.bolts


test "Can step on bolt" , () ->
	env = app.TestHelper.getEnvCtx(1,1)
	ammo = new app.Bolt(env,0,0)
	equal(ammo.canStepOn(),true,"Robbo can step on bolt")

test "Can bomb blow up bolt", () ->
	app.TestBombblowable.testObject app.Bolt