// Generated by CoffeeScript 1.7.1
(function() {
  var app, givenConstructor, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('RobboConstructor tests');

  givenConstructor = function() {
    return new app.RobboConstructor(app.TestUniverse, $('.game-designer').clone());
  };

  test("Load universe data when created", function() {
    var constructor;
    constructor = givenConstructor();
    ok(constructor.games().length > 0, "RobboConstructor loads games");
    ok(constructor.planets().length > 0, "RobboConstructor loads planets");
    ok(constructor.gameId() === 1, "Sets selected game to to first game on the list");
    ok(constructor.planetId() === 1, "Sets selected planet to to first planet on the list");
  });

  test("Simplified access to selected game and planet", function() {
    var constructor, n1;
    constructor = givenConstructor();
    ok(constructor.game() != null, "Allows easy access to selected game");
    ok(constructor.planet() != null, "Allows easy access to selected planet");
    n1 = constructor.planet().name();
    constructor.planetId(2);
    ok(constructor.planet() != null, "Allows easy access to selected planet after selected planet changes");
    notEqual(n1, constructor.planet().name(), "Name of newly selected planet is different then the first planet");
  });

  test("Planet is updated on main list of games when edited from 'planet' property", function() {
    var constructor, newPlanetName, planet;
    constructor = givenConstructor();
    newPlanetName = "my planet";
    constructor.planet().name(newPlanetName);
    planet = constructor.games()[0].planets()[0];
    equal(planet.name(), newPlanetName, "Changing name of the planet on 'planet' property changes original planet in games collection");
  });

  test("Changing game", function() {
    var constructor, n1;
    constructor = givenConstructor();
    n1 = constructor.game().name();
    constructor.planetId(2);
    constructor.gameId(2);
    equal(constructor.planetId(), 1, "When changing game sets current planet to first one");
    notEqual(n1, constructor.game().name(), "When changing game current game name changes");
    return equal(constructor.planet().name(), "G2 Planet 1", "When changing game new set of planet is loded and frist is selected");
  });

  test("Adding game", function() {
    var constructor, games, n;
    constructor = givenConstructor();
    n = constructor.games().length;
    constructor.newGame();
    games = constructor.games();
    ok(games.length === n + 1, "Can add new game");
    ok(games.last().index() === constructor.gameId(), "Selects game after add");
    return ok(constructor.game().planets().length, "New game has one planet");
  });

  test("Adding planet", function() {
    var constructor, n, planets;
    constructor = givenConstructor();
    n = constructor.planets().length;
    constructor.newPlanet();
    planets = constructor.planets();
    ok(planets.length === n + 1, "Can add new planet");
    return ok(planets.last().index() === constructor.planetId(), "Selects planet after add");
  });

  test("Remove planet", function() {
    var constructor, n, planets;
    constructor = givenConstructor();
    n = constructor.planets().length;
    constructor.removePlanet();
    planets = constructor.planets();
    return ok(planets.length === n - 1, "Can remove planet");
  });

}).call(this);
