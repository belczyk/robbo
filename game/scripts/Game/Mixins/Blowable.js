(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Blowable = (function() {

    function Blowable() {}

    Blowable.prototype.canBlowUp = function() {
      return true;
    };

    Blowable.prototype.blast = function() {
      if (this.onBlowUp != null) {
        return this.onBlowUp();
      }
    };

    Blowable.prototype.blowUp = function() {
      var smoke;
      this.isActive = false;
      this.envCtx.sound('destruction');
      smoke = new app.Smoke(this.envCtx, this.x, this.y);
      this.envCtx.putObj(smoke);
      smoke.init();
      this.envCtx.eventAggregator.unsubscribe(this);
      this.envCtx.unregisterRandomCalls(this);
      if (this.onBlowUp != null) {
        return this.onBlowUp();
      }
    };

    return Blowable;

  })();

}).call(this);
