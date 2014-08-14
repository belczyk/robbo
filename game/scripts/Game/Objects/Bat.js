(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Bat = (function(_super) {

    __extends(Bat, _super);

    Bat.include(new app.Multistate);

    Bat.include(new app.Blowable);

    Bat.include(new app.Walking);

    Bat.include(new app.Enemy);

    Bat.prototype.isActive = true;

    function Bat(envCtx, x, y, orientation) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.delay = app.Predef.Bat.movementDelay;
      Bat.__super__.constructor.call(this, 'bat-u');
      this.delta = app.Delta.fromOrientation(orientation);
      this.eventAggregator.subscribe('robbo-moved', (function(x, y) {
        return _this.attack(x, y);
      }), this, function(x, y) {
        return _this.isRobboInRange(x, y);
      });
      this.startWalking(function() {
        return _this.onMove();
      });
    }

    Bat.prototype.onMove = function() {
      return this.attack();
    };

    Bat.prototype.bounce = function() {
      return this.delta.reverse();
    };

    Bat.prototype.stateSelector = function() {
      var args, currentState;
      currentState = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (currentState[4] === 'u') {
        return 'bat-d';
      }
      return 'bat-u';
    };

    return Bat;

  })(app.Object);

}).call(this);
