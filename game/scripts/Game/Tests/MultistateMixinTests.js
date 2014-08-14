(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.TestMultistate = {
    testObject: function(objFun, cases) {
      var envCtx, obj, testCase, _i, _len;
      for (_i = 0, _len = cases.length; _i < _len; _i++) {
        testCase = cases[_i];
        envCtx = app.TestHelper.getEnvCtx();
        obj = new objFun(envCtx, 5, 5);
        envCtx.initMap(10, 10);
        envCtx.putObj(obj);
        testCase.action(envCtx, obj);
        equal(obj.currentState, testCase.expectedState, "" + objFun.name + " should have state " + testCase.expectedState + " after " + testCase.actionDesc);
      }
    }
  };

}).call(this);
