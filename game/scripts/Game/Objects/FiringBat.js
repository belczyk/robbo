(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.FiringBat = (function(_super) {

    __extends(FiringBat, _super);

    FiringBat.include(new app.ArmedWithLaser);

    function FiringBat(envCtx, x, y, orientation, direction) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.orientation = orientation;
      this.direction = direction;
      this.delay = app.Predef.FiringBat.movementDelay;
      FiringBat.__super__.constructor.call(this, this.envCtx, this.x, this.y, this.orientation);
      this.initLaser();
    }

    return FiringBat;

  })(app.Bat);

}).call(this);
