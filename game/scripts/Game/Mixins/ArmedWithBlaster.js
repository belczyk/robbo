(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.ArmedWithBlaster = (function() {

    function ArmedWithBlaster() {}

    ArmedWithBlaster.prototype.initBlaster = function() {
      var _this = this;
      this.blastDelta = app.Delta.fromDirection(this.direction);
      return this.envCtx.registerRandomCall(this, function() {
        return _this.fire();
      });
    };

    ArmedWithBlaster.prototype.fire = function() {
      var blast, obj;
      if (typeof this.onFire === "function") {
        this.onFire();
      }
      obj = this.envCtx.getObjAt(this.blastDelta.x(this.x), this.blastDelta.y(this.y));
      if (!(obj != null) || (typeof obj.canBlowUp === "function" ? obj.canBlowUp() : void 0)) {
        blast = new app.Blast(this.envCtx, this.blastDelta.x(this.x), this.blastDelta.y(this.y), this.direction);
        this.envCtx.putObj(blast);
        return blast.init();
      }
    };

    ArmedWithBlaster.prototype.onBlowUp = function() {
      return this.envCtx.unregisterRandomCalls(this);
    };

    return ArmedWithBlaster;

  })();

}).call(this);
