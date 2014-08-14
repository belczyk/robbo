(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.ArmedWithLaser = (function() {

    function ArmedWithLaser() {}

    ArmedWithLaser.prototype.initLaser = function() {
      var _this = this;
      this.laserDelta = app.Delta.fromDirection(this.direction);
      return this.envCtx.registerRandomCall(this, function() {
        return _this.fire();
      });
    };

    ArmedWithLaser.prototype.fire = function() {
      var beam, obj;
      try {
        if (typeof this.onFire === "function") {
          this.onFire();
        }
        obj = this.envCtx.getObjAtD(this, this.laserDelta);
        if (!(obj != null)) {
          beam = new app.LaserBeam(this.envCtx, this.laserDelta.x(this.x), this.laserDelta.y(this.y), this.laserDelta);
          this.envCtx.setObjAtD(this, this.laserDelta, beam);
          return beam.init();
        } else if (typeof obj.canBlowUp === "function" ? obj.canBlowUp() : void 0) {
          return obj.blowUp();
        }
      } catch (e) {
        return console.log(e);
      }
    };

    ArmedWithLaser.prototype.onBlowUp = function() {
      return this.envCtx.unregisterRandomCalls(this);
    };

    return ArmedWithLaser;

  })();

}).call(this);
