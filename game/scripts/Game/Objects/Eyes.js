(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Eyes = (function(_super) {

    __extends(Eyes, _super);

    Eyes.include(new app.Multistate);

    Eyes.include(new app.Blowable);

    Eyes.include(new app.Enemy);

    Eyes.prototype.isActive = false;

    Eyes.prototype.randomDeltas = [[0, 1], [1, 0], [-1, 0], [0, -1]];

    function Eyes(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.delay = app.Predef.Eyes.movementDelay;
      Eyes.__super__.constructor.call(this, 'eyes-u');
      this.envCtx.registerRandomCall(this, function() {
        return _this.randomMove();
      });
      this.eventAggregator.subscribe('robbo-moved', (function(x, y) {
        return _this.attack(x, y);
      }), this, function(x, y) {
        return _this.isRobboInRange(x, y);
      });
    }

    Eyes.prototype.randomMove = function() {
      var delta, objAhead;
      delta = this.randomDeltas[app.Tools.getRand(0, 3)];
      objAhead = this.envCtx.getObjAt(this.x + delta[0], this.y + delta[1]);
      if (objAhead === null) {
        return this.envCtx.moveObjBy(this.x, this.y, delta[0], delta[1]);
      }
    };

    Eyes.prototype.init = function() {
      this.isActive = true;
      return this.moveOneStep();
    };

    Eyes.prototype.moveOneStep = function() {
      var delta, deltas, objAhead, _i, _len,
        _this = this;
      if (!this.isActive) {
        return;
      }
      this.changeState();
      deltas = this.getDeltas();
      if (deltas != null) {
        for (_i = 0, _len = deltas.length; _i < _len; _i++) {
          delta = deltas[_i];
          objAhead = this.envCtx.getObjAt(this.x + delta[0], this.y + delta[1]);
          if (objAhead === null) {
            this.envCtx.moveObjBy(this.x, this.y, delta[0], delta[1]);
            break;
          }
        }
        this.attack();
      }
      return this.envCtx.delay(this.delay, function() {
        return _this.moveOneStep();
      });
    };

    Eyes.prototype.stateSelector = function() {
      var args, currentState;
      currentState = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (currentState[5] === 'u') {
        return 'eyes-d';
      }
      return 'eyes-u';
    };

    Eyes.prototype.getDeltas = function() {
      var dx, dy, robbo;
      robbo = this.envCtx.getRobbo();
      if (!(robbo != null)) {
        return null;
      }
      dx = robbo.x - this.x;
      if (dx > 0) {
        dx = 1;
      } else if (dx < 0) {
        dx = -1;
      }
      dy = robbo.y - this.y;
      if (dy > 0) {
        dy = 1;
      } else if (dy < 0) {
        dy = -1;
      }
      if (app.Tools.getRand(0, 1) === 1) {
        return [[dx, 0], [0, dy]];
      } else {
        return [[0, dy], [dx, 0]];
      }
    };

    Eyes.prototype.onBlowUp = function() {
      this.envCtx.unregisterRandomCalls(this);
      return this.envCtx.eventAggregator.unsubscribe(this);
    };

    return Eyes;

  })(app.Object);

}).call(this);
