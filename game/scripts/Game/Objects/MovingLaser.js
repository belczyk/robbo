(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.MovingLaser = (function(_super) {

    __extends(MovingLaser, _super);

    MovingLaser.include(new app.Walking);

    MovingLaser.include(new app.Moveable);

    function MovingLaser(envCtx, x, y, orientation, direction) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.orientation = orientation;
      this.direction = direction;
      this.delay = app.Predef.MovingLaser.movementDelay;
      MovingLaser.__super__.constructor.call(this, this.envCtx, this.x, this.y, this.direction);
      this.delta = app.Delta.fromOrientation(orientation);
      this.startWalking();
    }

    MovingLaser.prototype.changeState = function() {};

    MovingLaser.prototype.init = function() {};

    return MovingLaser;

  })(app.Laser);

}).call(this);
