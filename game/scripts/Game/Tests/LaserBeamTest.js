(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('LaserBeam tests');

  test("Beam moves until hit something", function() {
    var beamH, beamV, env, wall1, wall2;
    env = app.TestHelper.getEnvCtx(5, 5);
    beamH = new app.LaserBeam(env, 0, 0, new app.Delta([1, 0]));
    beamV = new app.LaserBeam(env, 0, 1, new app.Delta([0, 1]));
    wall1 = new app.Wall(env, 4, 0);
    wall2 = new app.Wall(env, 0, 4);
    env.putObj(beamH);
    env.putObj(beamV);
    env.putObj(wall1);
    env.putObj(wall2);
    beamH.init();
    beamV.init();
    equal(beamH.isActive, false, "horizontal beam isn't active");
    return equal(beamV.isActive, false, "vertical beam isn't active");
  });

  test("Beam moves until it hit end of map", function() {
    var beamH, beamV, env;
    env = app.TestHelper.getEnvCtx(5, 5);
    beamH = new app.LaserBeam(env, 0, 0, new app.Delta([-1, 0]));
    beamV = new app.LaserBeam(env, 0, 1, new app.Delta([0, -1]));
    env.putObj(beamH);
    env.putObj(beamV);
    beamH.init();
    beamV.init();
    equal(beamH.isActive, false, "horizontal beam isn't active");
    return equal(beamV.isActive, false, "vertical beam isn't active");
  });

  test("Beam blow up a rubble", function() {
    var beamH, beamV, env, rubble1, rubble2;
    env = app.TestHelper.getEnvCtx(5, 5);
    beamH = new app.LaserBeam(env, 0, 0, new app.Delta([1, 0]));
    beamV = new app.LaserBeam(env, 0, 1, new app.Delta([0, 1]));
    rubble1 = new app.Rubble(env, 4, 0);
    rubble2 = new app.Rubble(env, 0, 4);
    env.putObj(beamH);
    env.putObj(beamV);
    env.putObj(rubble1);
    env.putObj(rubble2);
    beamH.init();
    beamV.init();
    equal(env.getObjAt(4, 0), null, "horizontal beam blew up rubble");
    return equal(env.getObjAt(0, 4), null, "vertical beam blew up rubble");
  });

}).call(this);
