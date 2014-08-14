(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Coala = (function(_super) {

    __extends(Coala, _super);

    Coala.include(new app.Multistate);

    Coala.include(new app.Blowable);

    Coala.include(new app.Circlewalker('conterClockwise'));

    Coala.include(new app.Enemy);

    Coala.prototype.isActive = true;

    function Coala(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Coala.__super__.constructor.call(this, 'coala-u');
      this.eventAggregator.subscribe('robbo-moved', (function(x, y) {
        return _this.attack(x, y);
      }), this, function(x, y) {
        return _this.isRobboInRange(x, y);
      });
    }

    Coala.prototype.stateSelector = function() {
      var args, currentState;
      currentState = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (currentState[6] === 'u') {
        return 'coala-d';
      }
      return 'coala-u';
    };

    return Coala;

  })(app.Object);

}).call(this);
