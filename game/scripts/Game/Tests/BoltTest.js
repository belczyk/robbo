(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('Bolt tests');

  test("Bolt is collectable", function() {
    return app.TestCollectable.testObject(app.Bolt, 1, function(r) {
      return r.bolts;
    });
  });

  test("Can step on bolt", function() {
    var ammo, env;
    env = app.TestHelper.getEnvCtx(1, 1);
    ammo = new app.Bolt(env, 0, 0);
    return equal(ammo.canStepOn(), true, "Robbo can step on bolt");
  });

  test("Can bomb blow up bolt", function() {
    return app.TestBombblowable.testObject(app.Bolt);
  });

}).call(this);
