
window.app = window.app ? {}
app = window.app

app.TestMoveable =
	testMoveCase: (params) ->
		envCtx =  app.TestHelper.getEnvCtx()
		envCtx.initMap 3,3
		#given
		obj = new params.objBuilder(envCtx,1,1)
		robbo = new app.Robbo envCtx,params.robbo.startX,params.robbo.startY
		envCtx.putObj obj
		envCtx.putObj robbo
		#when
		app.TestHelper.publishArrowDown(envCtx,params.arrowDirection)
		#then
		equal envCtx.getObjAt(params.object.endX,params.object.endY),obj,"#{params.objBuilder.name} has been moved after arrow #{params.arrowDirection}"
		equal envCtx.getObjAt(1,1),robbo, "Robbo moved on a #{params.objBuilder.name}'s place after arrow #{params.arrowDirection}"

	
	testStuckCase: (params) ->
		envCtx =  app.TestHelper.getEnvCtx()
		envCtx.initMap 3,3
		#given
		obj = new params.objBuilder(envCtx,1,1)
		obj2 = new params.objBuilder(envCtx,params.object2.startX,params.object2.startY)
		robbo = new app.Robbo envCtx,params.robbo.startX,params.robbo.startY
		envCtx.putObj obj
		envCtx.putObj robbo
		envCtx.putObj obj2

		#when
		app.TestHelper.publishArrowDown(envCtx,params.arrowDirection)
		#then
		equal envCtx.getObjAt(1,1),obj,"#{params.objBuilder.name} is stuck, coudn't move after arrow #{params.arrowDirection}"
		equal envCtx.getObjAt(params.robbo.startX,params.robbo.startY),robbo, "Robbo couldn't move #{params.objBuilder.name} after arrow #{params.arrowDirection}"

	testObjectHasCanStepOnMethod: (objFun) ->	
		obj = new objFun(app.TestHelper.getEnvCtx())
		equal(obj.canStepOn?,true,"canStepOn present");

	testIfCanStepOnReturnsFalseIsStuck: (objFun) ->
		envCtx = app.TestHelper.getEnvCtx()
		envCtx.initMap 3,3
		obj = new objFun envCtx,1,1
		envCtx.putObj obj
		envCtx.putObj new objFun envCtx,2,1
	
		equal (obj.canStepOn new app.Delta([1,0])),false,"#{objFun.name}.canStepOn returns false when sth is behind it"

	testIfCanStepOnReturnsTrueIsntStuck: (objFun) ->
		envCtx = app.TestHelper.getEnvCtx()
		envCtx.initMap 3,3
		obj = new objFun envCtx,1,1
		envCtx.putObj obj
		equal (obj.canStepOn new app.Delta([1,0])),true,"#{objFun.name}.canStepOn returns true when nothing is behind it"

	testObject: (objBuilder) ->
		@testIfCanStepOnReturnsFalseIsStuck(objBuilder)
		@testIfCanStepOnReturnsTrueIsntStuck(objBuilder)
		@testMoveCase(
						objBuilder: objBuilder
						robbo: {startX: 0,startY:1}
						object: {endX:2, endY:1}
						arrowDirection: 'right'
		)
		@testMoveCase(
						objBuilder: objBuilder
						robbo: {startX:2,startY:1}
						object: {endX:0, endY:1}
						arrowDirection: 'left'
		)
		@testMoveCase(
						objBuilder: objBuilder
						robbo: {startX: 1,startY:0}
						object: {endX:1, endY:2}
						arrowDirection: 'down'
		)
		@testMoveCase(
						objBuilder: objBuilder
						robbo: {startX: 1,startY:2}
						object: {endX:1, endY:0}
						arrowDirection: 'up'
		)

		@testStuckCase(
						objBuilder: objBuilder
						robbo: {startX: 0,startY:1}
						object2: {startX:2, startY:1}
						arrowDirection: 'right'
		)
		@testStuckCase(
						objBuilder: objBuilder
						robbo: {startX:2,startY:1}
						object2: {startX:0, startY:1}
						arrowDirection: 'left'
		)
		@testStuckCase(
						objBuilder: objBuilder
						robbo: {startX: 1,startY:0}
						object2: {startX:1, startY:2}
						arrowDirection: 'down'
		)
		@testStuckCase(
						objBuilder: objBuilder
						robbo: {startX: 1,startY:2}
						object2: {startX:1, startY:0}
						arrowDirection: 'up'
		)
