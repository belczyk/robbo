(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.ArmedWithStableBeamLaser = (function() {

    function ArmedWithStableBeamLaser() {}

    ArmedWithStableBeamLaser.prototype.initLaser = function() {
      var _this = this;
      this.stableBeamDelta = app.Delta.fromDirection(this.direction);
      return this.envCtx.registerRandomCall(this, function() {
        return _this.fire();
      });
    };

    ArmedWithStableBeamLaser.prototype.fire = function() {
      var beam, obj;
      if (typeof this.onFire === "function") {
        this.onFire();
      }
      obj = this.envCtx.getObjAtD(this, this.stableBeamDelta);
      if (!(obj != null)) {
        beam = new app.StableBeam(this.envCtx, this.stableBeamDelta.x(this.x), this.stableBeamDelta.y(this.y), this.direction);
        this.envCtx.setObjAtD(this, this.stableBeamDelta, beam);
        return beam.init();
      } else if (typeof obj.canBlowUp === "function" ? obj.canBlowUp() : void 0) {
        return obj.blowUp();
      }
    };

    ArmedWithStableBeamLaser.prototype.onBlowUp = function() {
      return this.envCtx.unregisterRandomCalls(this);
    };

    return ArmedWithStableBeamLaser;

  })();

}).call(this);
