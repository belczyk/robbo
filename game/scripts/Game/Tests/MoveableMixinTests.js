(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.TestMoveable = {
    testMoveCase: function(params) {
      var envCtx, obj, robbo;
      envCtx = app.TestHelper.getEnvCtx();
      envCtx.initMap(3, 3);
      obj = new params.objBuilder(envCtx, 1, 1);
      robbo = new app.Robbo(envCtx, params.robbo.startX, params.robbo.startY);
      envCtx.putObj(obj);
      envCtx.putObj(robbo);
      app.TestHelper.publishArrowDown(envCtx, params.arrowDirection);
      equal(envCtx.getObjAt(params.object.endX, params.object.endY), obj, "" + params.objBuilder.name + " has been moved after arrow " + params.arrowDirection);
      return equal(envCtx.getObjAt(1, 1), robbo, "Robbo moved on a " + params.objBuilder.name + "'s place after arrow " + params.arrowDirection);
    },
    testStuckCase: function(params) {
      var envCtx, obj, obj2, robbo;
      envCtx = app.TestHelper.getEnvCtx();
      envCtx.initMap(3, 3);
      obj = new params.objBuilder(envCtx, 1, 1);
      obj2 = new params.objBuilder(envCtx, params.object2.startX, params.object2.startY);
      robbo = new app.Robbo(envCtx, params.robbo.startX, params.robbo.startY);
      envCtx.putObj(obj);
      envCtx.putObj(robbo);
      envCtx.putObj(obj2);
      app.TestHelper.publishArrowDown(envCtx, params.arrowDirection);
      equal(envCtx.getObjAt(1, 1), obj, "" + params.objBuilder.name + " is stuck, coudn't move after arrow " + params.arrowDirection);
      return equal(envCtx.getObjAt(params.robbo.startX, params.robbo.startY), robbo, "Robbo couldn't move " + params.objBuilder.name + " after arrow " + params.arrowDirection);
    },
    testObjectHasCanStepOnMethod: function(objFun) {
      var obj;
      obj = new objFun(app.TestHelper.getEnvCtx());
      return equal(obj.canStepOn != null, true, "canStepOn present");
    },
    testIfCanStepOnReturnsFalseIsStuck: function(objFun) {
      var envCtx, obj;
      envCtx = app.TestHelper.getEnvCtx();
      envCtx.initMap(3, 3);
      obj = new objFun(envCtx, 1, 1);
      envCtx.putObj(obj);
      envCtx.putObj(new objFun(envCtx, 2, 1));
      return equal(obj.canStepOn(new app.Delta([1, 0])), false, "" + objFun.name + ".canStepOn returns false when sth is behind it");
    },
    testIfCanStepOnReturnsTrueIsntStuck: function(objFun) {
      var envCtx, obj;
      envCtx = app.TestHelper.getEnvCtx();
      envCtx.initMap(3, 3);
      obj = new objFun(envCtx, 1, 1);
      envCtx.putObj(obj);
      return equal(obj.canStepOn(new app.Delta([1, 0])), true, "" + objFun.name + ".canStepOn returns true when nothing is behind it");
    },
    testObject: function(objBuilder) {
      this.testIfCanStepOnReturnsFalseIsStuck(objBuilder);
      this.testIfCanStepOnReturnsTrueIsntStuck(objBuilder);
      this.testMoveCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 0,
          startY: 1
        },
        object: {
          endX: 2,
          endY: 1
        },
        arrowDirection: 'right'
      });
      this.testMoveCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 2,
          startY: 1
        },
        object: {
          endX: 0,
          endY: 1
        },
        arrowDirection: 'left'
      });
      this.testMoveCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 1,
          startY: 0
        },
        object: {
          endX: 1,
          endY: 2
        },
        arrowDirection: 'down'
      });
      this.testMoveCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 1,
          startY: 2
        },
        object: {
          endX: 1,
          endY: 0
        },
        arrowDirection: 'up'
      });
      this.testStuckCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 0,
          startY: 1
        },
        object2: {
          startX: 2,
          startY: 1
        },
        arrowDirection: 'right'
      });
      this.testStuckCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 2,
          startY: 1
        },
        object2: {
          startX: 0,
          startY: 1
        },
        arrowDirection: 'left'
      });
      this.testStuckCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 1,
          startY: 0
        },
        object2: {
          startX: 1,
          startY: 2
        },
        arrowDirection: 'down'
      });
      return this.testStuckCase({
        objBuilder: objBuilder,
        robbo: {
          startX: 1,
          startY: 2
        },
        object2: {
          startX: 1,
          startY: 0
        },
        arrowDirection: 'up'
      });
    }
  };

}).call(this);
