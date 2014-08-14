(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.RotatingLaser = (function(_super) {

    __extends(RotatingLaser, _super);

    RotatingLaser.include(new app.Bombblowable());

    RotatingLaser.include(new app.ArmedWithLaser());

    RotatingLaser.include(new app.Multistate());

    RotatingLaser.prototype.directions = ['left', 'right', 'up', 'down'];

    function RotatingLaser(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.direction = this.getRandomDirection();
      this.updateLaserDelta();
      this.initLaser();
      RotatingLaser.__super__.constructor.call(this, "rotating-laser-" + this.direction[0]);
      this.envCtx.registerRandomCall(this, function() {
        return _this.rotate();
      });
    }

    RotatingLaser.prototype.rotate = function() {
      this.direction = this.getRandomDirection();
      this.updateLaserDelta();
      return this.changeState(this.direction[0]);
    };

    RotatingLaser.prototype.stateSelector = function(direction) {
      return "rotating-laser-" + direction;
    };

    RotatingLaser.prototype.updateLaserDelta = function() {
      return this.laserDelta = app.Delta.fromDirection(this.direction);
    };

    RotatingLaser.prototype.getRandomDirection = function() {
      return this.directions[app.Tools.getRand(0, 3)];
    };

    return RotatingLaser;

  })(app.Object);

}).call(this);
