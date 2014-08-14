(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Walking = (function() {

    function Walking() {}

    Walking.prototype.startWalking = function(afterMove) {
      var _this = this;
      this.afterMove = afterMove;
      this.envCtx.delay(this.delay, function() {
        return _this.oneStep();
      });
      return this.isActive = true;
    };

    Walking.prototype.oneStep = function() {
      var obj;
      if (!this.isActive) {
        return;
      }
      obj = this.envCtx.getObjAtD(this, this.delta);
      if (!(obj != null)) {
        this.step();
      } else {
        this.delta = this.delta.reversed();
        this.step(true);
      }
      return typeof this.afterMove === "function" ? this.afterMove() : void 0;
    };

    Walking.prototype.step = function(bounce) {
      var _this = this;
      if (!(bounce != null) || !bounce) {
        this.envCtx.moveObjByD(this.x, this.y, this.delta);
      }
      this.envCtx.delay(this.delay, function() {
        return _this.oneStep();
      });
      return this.changeState();
    };

    return Walking;

  })();

}).call(this);
