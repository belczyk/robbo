## <reference path="References.coffee" />
window.app = window.app ? {}
app = window.app

module('Laser tests')
test "Can bomb blow up laser" , () ->
		#given
		env = app.TestHelper.getEnvCtx 3,3
		obj =new app.Laser env,0,0, 'left'
		beam = new app.LaserBeam env,0,2,new app.Delta([0,-1])
		bomb = new app.Bomb env,0,1
		env.putObj obj
		env.putObj beam
		env.putObj bomb
		#when
		beam.init()
		#then
		equal(env.getObjAt(0,0),null,"bomb blew up app.Laser")
