(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Ship = (function(_super) {

    __extends(Ship, _super);

    Ship.prototype.isShipActive = false;

    Ship.include(new app.Moveable());

    Ship.include(new app.Animatable());

    Ship.include(new app.Bombblowable());

    function Ship(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Ship.__super__.constructor.call(this, 'ship-inactive');
      this.eventAggregator.subscribe('robbo-moving', function() {
        return _this.onRobboSteptOn();
      }, this, function(x, y) {
        return x === _this.x && y === _this.y;
      });
      this.eventAggregator.subscribe('all-bolts-collected', function() {
        return _this.activateShip();
      }, this);
      this.animations = [];
      this.animations.push(new app.Animation('active', ['ship-active', 'ship-inactive'], app.Predef.Ship.animationDelay));
    }

    Ship.prototype.onRobboSteptOn = function() {
      var robbo;
      if (this.isShipActive) {
        robbo = this.envCtx.getRobbo();
        robbo.deactivate();
        this.envCtx.rmObj(robbo);
        return this.eventAggregator.publish('level-up');
      }
    };

    Ship.prototype.canStepOn = function(delta) {
      return this.isShipActive || this.envCtx.getObjAtD(this, delta) === null;
    };

    Ship.prototype.activateShip = function() {
      this.eventAggregator.publish('thunder');
      this.isShipActive = true;
      this.isMoveable = false;
      return this.animate('active');
    };

    Ship.prototype.levelUp = function() {};

    return Ship;

  })(app.Object);

}).call(this);
