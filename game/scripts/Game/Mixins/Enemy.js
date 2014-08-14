(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Enemy = (function() {

    function Enemy() {}

    Enemy.prototype.isRobboInRange = function(x, y) {
      var mn,
        _this = this;
      mn = this.envCtx.getNNeighbour(this.x, this.y).asArray().where(function(o) {
        return o != null ? o.isRobbo : void 0;
      });
      return mn.length === 1;
    };

    Enemy.prototype.attack = function() {
      var mn,
        _this = this;
      mn = this.envCtx.getNNeighbour(this.x, this.y).asArray().where(function(o) {
        return o != null ? o.isRobbo : void 0;
      });
      if (mn.length === 1) {
        return mn.first().blowUp();
      }
    };

    return Enemy;

  })();

}).call(this);
