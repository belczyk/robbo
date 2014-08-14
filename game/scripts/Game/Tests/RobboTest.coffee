## <reference path="References.coffee" />
window.app = window.app ? {}
app = window.app

module('Robbo tests')
test "Robb can shot object when stays near it", () ->
	env = app.TestHelper.getEnvCtx(2,2)
	robbo = new app.Robbo env,0,0
	rubble = new app.Rubble env,1,0
	env.putObj robbo
	env.putObj rubble
	robbo.ammo =1 
	app.TestHelper.publishArrowDownCtrl(env,'right')
	equal(env.getObjAt(1,0),null,'robbo shoot a rubble')


test "Is robbo multistate", () ->
	app.Predef.Robbo.movementDelay=-10
	app.TestMultistate.testObject(app.Robbo,
			[
					{
						actionDesc: "game started and no action taken", 
						action: (()->),
						expectedState: "robbo-fu"
					},
					{
						actionDesc: "arrow right", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'right')),
						expectedState: "robbo-rd"
					},
					{
						actionDesc: "arrow right x 2", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'right',2)),
						expectedState: "robbo-ru"
					},
					{
						actionDesc: "arrow right x 3", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'right',3)),
						expectedState: "robbo-rd"
					},
					{
						actionDesc: "arrow left", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'left')),
						expectedState: "robbo-ld"
					},
					{
						actionDesc: "arrow left x 2", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'left',2)),
						expectedState: "robbo-lu"
					},
					{
						actionDesc: "arrow left x 3", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'left',3)),
						expectedState: "robbo-ld"
					},
					{
						actionDesc: "arrow down", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'down')),
						expectedState: "robbo-fd"
					},
					{
						actionDesc: "arrow down x 2", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'down',2)),
						expectedState: "robbo-fu"
					},
					{
						actionDesc: "arrow down x 3", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'down',3)),
						expectedState: "robbo-fd"
					},
					{
						actionDesc: "arrow up", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'up')),
						expectedState: "robbo-ud"
					},
					{
						actionDesc: "arrow up x 2", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'up',2)),
						expectedState: "robbo-uu"
					},
					{
						actionDesc: "arrow up x 3", 
						action: ((env)->app.TestHelper.publishArrowDown(env,'up',3)),
						expectedState: "robbo-ud"
					}
			])