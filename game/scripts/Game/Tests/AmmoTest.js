(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('Ammo tests');

  test("Ammo is collectable", function() {
    return app.TestCollectable.testObject(app.Ammo, 9, function(r) {
      return r.ammo;
    });
  });

  test("Ammo disappears when hit by laser beam", function() {
    var ammo, beam, env;
    env = app.TestHelper.getEnvCtx(3, 3);
    ammo = new app.Ammo(env, 2, 2);
    beam = new app.LaserBeam(env, 0, 2, new app.Delta([1, 0]));
    env.putObj(ammo);
    env.putObj(beam);
    beam.init();
    return equal(env.getObjAt(2, 2), null, "ammo disappeared");
  });

  test("Robbo can't collect ammo when it was blew up", function() {
    var ammo, beam, env, robbo;
    env = app.TestHelper.getEnvCtx(3, 3);
    ammo = new app.Ammo(env, 2, 2);
    beam = new app.LaserBeam(env, 0, 2, new app.Delta([1, 0]));
    robbo = new app.Robbo(env, 2, 1);
    env.putObj(ammo);
    env.putObj(beam);
    env.putObj(robbo);
    beam.init();
    app.TestHelper.publishArrowDown(env, 'down');
    return equal(robbo.ammo, 0, "robbo did not collect ammo");
  });

}).call(this);
