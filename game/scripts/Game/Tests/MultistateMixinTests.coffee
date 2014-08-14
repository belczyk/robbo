window.app = window.app ? {}
app = window.app


app.TestMultistate = 
	
	testObject: (objFun, cases) ->
		for testCase in cases 
			#given
			envCtx = app.TestHelper.getEnvCtx()
			obj = new objFun(envCtx,5,5)
			envCtx.initMap 10,10
			envCtx.putObj obj
			#when
			testCase.action(envCtx,obj)
			#then
			equal(obj.currentState,testCase.expectedState,"#{objFun.name} should have state #{testCase.expectedState} after #{testCase.actionDesc}")
		return
