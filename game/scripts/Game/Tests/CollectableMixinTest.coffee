window.app = window.app ? {}
app = window.app


app.TestCollectable = 	
	testObject: (objFun,expect,resourceGetter) ->
		env = app.TestHelper.getEnvCtx 3,3
		obj = new objFun env,2,2
		robbo = new app.Robbo env,2,1
		env.putObj obj
		env.putObj robbo
		app.TestHelper.publishArrowDown(env,'down')
		equal(resourceGetter(robbo),expect,"robbo collected #{objFun.name}")
