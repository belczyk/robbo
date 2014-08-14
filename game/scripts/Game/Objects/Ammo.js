(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Ammo = (function(_super) {

    __extends(Ammo, _super);

    Ammo.include(new app.Collectable('ammo'));

    Ammo.include(new app.Blowable);

    function Ammo(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Ammo.__super__.constructor.call(this, 'ammo');
      this.eventAggregator.subscribe('robbo-moved', (function() {
        return _this.collect();
      }), this, function(x, y) {
        return x === _this.x && y === _this.y;
      });
    }

    Ammo.prototype.getCollectArgs = function() {
      return app.Predef.Ammo.numOfCharges;
    };

    Ammo.prototype.onCollect = function() {
      return this.envCtx.sound('ammo');
    };

    return Ammo;

  })(app.Object);

}).call(this);
