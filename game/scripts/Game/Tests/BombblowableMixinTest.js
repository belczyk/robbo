(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.TestBombblowable = {
    testObject: function(objFun) {
      this.testIfLaserBeamDestroysObject(objFun);
      return this.testIfBombDestroysObject(objFun);
    },
    testIfBombDestroysObject: function(objFun) {
      var beam, bomb, env, obj;
      env = app.TestHelper.getEnvCtx(3, 3);
      obj = new objFun(env, 0, 0);
      beam = new app.LaserBeam(env, 0, 2, new app.Delta([0, -1]));
      bomb = new app.Bomb(env, 0, 1);
      env.putObj(obj);
      env.putObj(beam);
      env.putObj(bomb);
      beam.init();
      return equal(env.getObjAt(0, 0), null, "bomb blew up " + objFun.name);
    },
    testIfLaserBeamDestroysObject: function(objFun) {
      var beam, env, obj;
      env = app.TestHelper.getEnvCtx(3, 3);
      obj = new objFun(env, 0, 0);
      beam = new app.LaserBeam(env, 0, 2, new app.Delta([0, -1]));
      env.putObj(obj);
      env.putObj(beam);
      beam.init();
      return equal(env.getObjAt(0, 0), obj, "laser beam didn't blow up " + objFun.name);
    }
  };

}).call(this);
