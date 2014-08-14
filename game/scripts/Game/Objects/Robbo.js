(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Robbo = (function(_super) {

    __extends(Robbo, _super);

    Robbo.include(new app.Blowable);

    Robbo.include(new app.Multistate);

    Robbo.prototype.isRobbo = true;

    Robbo.prototype.isActive = true;

    Robbo.prototype.canMove = true;

    function Robbo(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Robbo.__super__.constructor.call(this, 'robbo-fu');
      this.ammo = 0;
      this.bolts = 0;
      this.keys = 0;
      this.currentState = 'robbo-fu';
      this.delay = app.Predef.Robbo.movementDelay;
      this.eventAggregator.subscribe('arrow-down', (function(args) {
        return _this.arrowDown(args);
      }), this);
      this.eventAggregator.subscribe('ammo-collected', (function(count) {
        return _this.ammo += count;
      }));
      this.eventAggregator.subscribe('bolt-collected', (function() {
        return _this.bolts++;
      }));
      this.eventAggregator.subscribe('key-collected', (function() {
        return _this.keys++;
      }));
      this.eventAggregator.subscribe('key-used', (function() {
        return _this.keys--;
      }));
    }

    Robbo.prototype.onBlowUp = function() {
      this.envCtx.timer.randomCallers = [];
      this.envCtx.timer.resetToken();
      return this.eventAggregator.publish('robbo-destroyed');
    };

    Robbo.prototype.stateSelector = function() {
      var args, currentState, delta, ms, s;
      delta = arguments[0], currentState = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      s = currentState[6];
      ms = currentState[7];
      ms = ms === 'u' ? 'd' : 'u';
      if ((s === 'f' || s === 'l') && delta.dx() === -1 && delta.dy() === 0) {
        return 'robbo-l' + ms;
      } else if ((s === 'f' || s === 'r') && delta.dx() === 1 && delta.dy() === 0) {
        return 'robbo-r' + ms;
      } else if (s === 'f' && delta.dx() === 0 && delta.dy() === 1) {
        return 'robbo-f' + ms;
      } else if ((s === 'f' || s === 'u') && delta.dx() === 0 && delta.dy() === -1) {
        return 'robbo-u' + ms;
      }
      return 'robbo-fu';
    };

    Robbo.prototype.deactivate = function() {
      this.isActive = false;
      return this.canMove = false;
    };

    Robbo.prototype.activate = function() {
      this.isActive = true;
      return this.canMove = true;
    };

    Robbo.prototype.arrowDown = function(evnetArgs) {
      if (!this.canMove) {
        return;
      }
      if (evnetArgs.ctrl || evnetArgs.shift) {
        if (this.ammo <= 0) {
          return;
        }
        return this.fire(evnetArgs.direction);
      } else {
        return this.makeMove(evnetArgs.direction);
      }
    };

    Robbo.prototype.fire = function(direction) {
      var beam, delta, obj, x_, y_;
      delta = this.getDelta(direction);
      this.ammo--;
      this.eventAggregator.publish('ammo-used');
      this.envCtx.sound('fire');
      x_ = delta.x(this.x);
      y_ = delta.y(this.y);
      obj = this.envCtx.getObjAt(x_, y_);
      if (!(obj != null)) {
        beam = new app.LaserBeam(this.envCtx, x_, y_, delta);
        this.envCtx.putObj(beam);
        beam.init();
      } else if (obj.canBlowUp && obj.canBlowUp()) {
        obj.blowUp();
      }
      return this.changeState(delta);
    };

    Robbo.prototype.makeMove = function(direction) {
      var delta, newX, newY, obj,
        _this = this;
      if (this.lastMove !== null && ((new Date()) - this.lastMove) < this.delay) {
        return;
      }
      delta = this.getDelta(direction);
      newX = delta.x(this.x);
      newY = delta.y(this.y);
      this.eventAggregator.publish('robbo-moving', newX, newY, delta);
      obj = this.envCtx.getObjAt(newX, newY);
      if (this.isActive) {
        this.envCtx.delay(app.Predef.Robbo.changeStateDelay, function() {
          if (_this.isActive) {
            return _this.changeState(delta);
          }
        });
      }
      if (obj === null || (typeof obj.canStepOn === "function" ? obj.canStepOn(delta) : void 0)) {
        this.envCtx.stepOnD(newX, newY, delta);
        this.envCtx.moveObjByD(this.x, this.y, delta);
        this.eventAggregator.publish('robbo-moved', this.x, this.y, delta);
        this.envCtx.sound('step');
      }
      return this.lastMove = new Date();
    };

    Robbo.prototype.getDelta = function(direction) {
      var delta;
      return delta = app.Delta.fromDirection(direction);
    };

    return Robbo;

  })(app.Object);

}).call(this);
