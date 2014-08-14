## <reference path="References.coffee" />
window.app = window.app ? {}
app = window.app


module('Ammo tests')

test "Ammo is collectable", () ->
	app.TestCollectable.testObject app.Ammo,9,(r)->r.ammo

test "Ammo disappears when hit by laser beam", () ->
	env = app.TestHelper.getEnvCtx(3,3)
	ammo = new app.Ammo(env,2,2)
	beam = new app.LaserBeam(env,0,2,new app.Delta([1,0]))
	env.putObj ammo
	env.putObj beam
	beam.init()
	equal(env.getObjAt(2,2),null,"ammo disappeared")

test "Robbo can't collect ammo when it was blew up", () ->
	env = app.TestHelper.getEnvCtx 3,3
	ammo = new app.Ammo env,2,2
	beam = new app.LaserBeam env,0,2,new app.Delta([1,0])
	robbo = new app.Robbo env,2,1
	env.putObj ammo
	env.putObj beam
	env.putObj robbo
	beam.init()
	app.TestHelper.publishArrowDown(env,'down')
	equal(robbo.ammo,0,"robbo did not collect ammo")	