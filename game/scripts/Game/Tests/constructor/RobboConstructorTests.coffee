window.app = window.app ? {}
app = window.app

module('RobboConstructor tests')

givenConstructor = () -> new app.RobboConstructor(app.TestUniverse,$('.game-designer').clone())
test "Load universe data when created", ()->
		constructor = givenConstructor()
		ok(constructor.games().length>0,"RobboConstructor loads games")
		ok(constructor.planets().length>0,"RobboConstructor loads planets")
		ok(constructor.gameId()==0, "Sets selected game to to first game on the list")
		ok(constructor.planetId()==0, "Sets selected planet to to first planet on the list")
		return

test "Simplified access to selected game and planet", ()->
	constructor = givenConstructor()
	ok(constructor.game()?,"Allows easy access to selected game")
	ok(constructor.planet()?, "Allows easy access to selected planet")
	n1 = constructor.planet().name()

	constructor.planetId(1)
	ok(constructor.planet()?, "Allows easy access to selected planet after selected planet changes")
	notEqual(n1,constructor.planet().name(),"Name of newly selected planet is different then the first planet")
	return

test "Planet is updated on main list of games when edited from 'planet' property", ()->
	constructor = givenConstructor()
	newPlanetName = "my planet"
	constructor.planet().name(newPlanetName)
	planet = constructor.games()[0].planets()[0]
	equal(planet.name(),newPlanetName,"Changing name of the planet on 'planet' property changes original planet in games collection")
	return
	

test "Changing game", ()-> 
	constructor = givenConstructor()
	n1 = constructor.game().name()
	constructor.planetId(1) 
	constructor.gameId(1)
	equal(constructor.planetId(),0,"When changing game sets current planet to first one")
	notEqual(n1,constructor.game().name(),"When changing game current game name changes")



