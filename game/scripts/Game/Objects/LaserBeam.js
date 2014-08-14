(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.LaserBeam = (function(_super) {

    __extends(LaserBeam, _super);

    LaserBeam.include(new app.Multistate);

    function LaserBeam(envCtx, x, y, delta) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.delta = delta;
      this.delay = app.LaserBeam.movementDelay;
      this.isActive = false;
      LaserBeam.__super__.constructor.call(this, delta.dy() === 0 ? 'laser-beam-ho' : 'laser-beam-vo');
    }

    LaserBeam.prototype.init = function() {
      var _this = this;
      this.isActive = true;
      return this.envCtx.delay(this.delay, function() {
        return _this.oneStep();
      });
    };

    LaserBeam.prototype.oneStep = function() {
      var obj;
      obj = this.envCtx.getObjAtD(this, this.delta);
      if (!(obj != null)) {
        return this.beam();
      } else {
        return this.hitObject(obj);
      }
    };

    LaserBeam.prototype.beam = function() {
      var _this = this;
      this.envCtx.moveObjByD(this.x, this.y, this.delta);
      this.envCtx.delay(app.Predef.LaserBeam.movementDelay, function() {
        return _this.oneStep();
      });
      return this.changeState();
    };

    LaserBeam.prototype.hitObject = function(obj) {
      if ((obj.canBlowUp != null) && obj.canBlowUp()) {
        return this.blewUpObject(obj);
      } else {
        return this.desintegrate();
      }
    };

    LaserBeam.prototype.blewUpObject = function(obj) {
      obj.blowUp();
      this.isActive = false;
      this.envCtx.rmObj(this);
      return this.desintegrate();
    };

    LaserBeam.prototype.desintegrate = function() {
      var smoke;
      this.isActive = false;
      smoke = new app.Smoke(this.envCtx, this.x, this.y, 2);
      smoke.disturbsBlast = true;
      this.envCtx.putObj(smoke);
      return smoke.init();
    };

    LaserBeam.prototype.stateSelector = function() {
      var args, currentState;
      currentState = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (currentState[12] === 'o') {
        return currentState.substring(0, 12) + 'e';
      }
      return currentState.substring(0, 12) + 'o';
    };

    return LaserBeam;

  })(app.Object);

}).call(this);
