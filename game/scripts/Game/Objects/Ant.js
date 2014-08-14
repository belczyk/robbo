(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Ant = (function(_super) {

    __extends(Ant, _super);

    Ant.include(new app.Multistate);

    Ant.include(new app.Blowable);

    Ant.include(new app.Circlewalker('clockwise'));

    Ant.include(new app.Enemy);

    Ant.prototype.isActive = true;

    function Ant(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Ant.__super__.constructor.call(this, 'ant-u');
      this.eventAggregator.subscribe('robbo-moved', (function(x, y) {
        return _this.attack(x, y);
      }), this, function(x, y) {
        return _this.isRobboInRange(x, y);
      });
    }

    Ant.prototype.stateSelector = function() {
      var args, currentState;
      currentState = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (currentState[4] === 'u') {
        return 'ant-d';
      }
      return 'ant-u';
    };

    return Ant;

  })(app.Object);

}).call(this);
