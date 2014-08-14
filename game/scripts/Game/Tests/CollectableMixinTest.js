(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.TestCollectable = {
    testObject: function(objFun, expect, resourceGetter) {
      var env, obj, robbo;
      env = app.TestHelper.getEnvCtx(3, 3);
      obj = new objFun(env, 2, 2);
      robbo = new app.Robbo(env, 2, 1);
      env.putObj(obj);
      env.putObj(robbo);
      app.TestHelper.publishArrowDown(env, 'down');
      return equal(resourceGetter(robbo), expect, "robbo collected " + objFun.name);
    }
  };

}).call(this);
