window.app = window.app ? {}
app = window.app


app.TestBombblowable = 	
	testObject: (objFun) ->
		@testIfLaserBeamDestroysObject objFun
		@testIfBombDestroysObject objFun

	testIfBombDestroysObject: (objFun) ->
		#given
		env = app.TestHelper.getEnvCtx 3,3
		obj = new objFun env,0,0
		beam = new app.LaserBeam env,0,2,new app.Delta([0,-1])
		bomb = new app.Bomb env,0,1
		env.putObj obj
		env.putObj beam
		env.putObj bomb
		#when
		beam.init()
		#thenwe
		equal(env.getObjAt(0,0),null,"bomb blew up #{objFun.name}")

	testIfLaserBeamDestroysObject: (objFun) ->
		#given
		env = app.TestHelper.getEnvCtx 3,3
		obj = new objFun env,0,0
		beam = new app.LaserBeam env,0,2,new app.Delta([0,-1])
		env.putObj obj
		env.putObj beam
		#when
		beam.init()
		#then
		equal(env.getObjAt(0,0),obj,"laser beam didn't blow up #{objFun.name}")