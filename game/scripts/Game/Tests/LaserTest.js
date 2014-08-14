(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('Laser tests');

  test("Can bomb blow up laser", function() {
    var beam, bomb, env, obj;
    env = app.TestHelper.getEnvCtx(3, 3);
    obj = new app.Laser(env, 0, 0, 'left');
    beam = new app.LaserBeam(env, 0, 2, new app.Delta([0, -1]));
    bomb = new app.Bomb(env, 0, 1);
    env.putObj(obj);
    env.putObj(beam);
    env.putObj(bomb);
    beam.init();
    return equal(env.getObjAt(0, 0), null, "bomb blew up app.Laser");
  });

}).call(this);
