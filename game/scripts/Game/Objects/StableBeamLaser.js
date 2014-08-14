(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.StableBeamLaser = (function(_super) {

    __extends(StableBeamLaser, _super);

    StableBeamLaser.include(new app.Bombblowable());

    StableBeamLaser.include(new app.ArmedWithStableBeamLaser());

    function StableBeamLaser(envCtx, x, y, direction) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.initLaser();
      StableBeamLaser.__super__.constructor.call(this, "laser-" + this.direction[0]);
    }

    return StableBeamLaser;

  })(app.Object);

}).call(this);
