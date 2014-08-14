(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Laser = (function(_super) {

    __extends(Laser, _super);

    Laser.include(new app.Bombblowable());

    Laser.include(new app.ArmedWithLaser());

    function Laser(envCtx, x, y, direction) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.initLaser();
      Laser.__super__.constructor.call(this, "laser-" + direction[0]);
    }

    return Laser;

  })(app.Object);

}).call(this);
