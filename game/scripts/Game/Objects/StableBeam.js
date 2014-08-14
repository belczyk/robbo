(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.StableBeamPart = (function(_super) {

    __extends(StableBeamPart, _super);

    StableBeamPart.include(new app.Multistate);

    function StableBeamPart(envCtx, x, y, asset) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      StableBeamPart.__super__.constructor.call(this, asset);
    }

    StableBeamPart.prototype.stateSelector = function() {
      var args, currentState;
      currentState = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (currentState[12] === 'o') {
        return currentState.substring(0, 12) + 'e';
      }
      return currentState.substring(0, 12) + 'o';
    };

    return StableBeamPart;

  })(app.Object);

  app.StableBeam = (function() {

    function StableBeam(envCtx, x, y, direction) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.delay = app.Predef.StableBeam.movementDelay;
      this.elements = [];
      this.bounced = false;
      this.stableBeamDelta = app.Delta.fromDirection(this.direction);
      this.orientationChar = this.stableBeamDelta.orientationChar();
    }

    StableBeam.prototype.init = function() {
      var newX, newY, s,
        _this = this;
      newX = this.x;
      newY = this.y;
      s = new app.StableBeamPart(this.envCtx, newX, newY, "laser-beam-" + this.orientationChar + "o");
      this.envCtx.putObj(s);
      this.elements.push(s);
      return this.envCtx.delay(this.delay, function() {
        return _this.moveOneStep();
      });
    };

    StableBeam.prototype.moveOneStep = function() {
      var s, _i, _len, _ref1;
      _ref1 = this.elements.where(function(p) {
        return p != null;
      });
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        s = _ref1[_i];
        s.changeState();
      }
      if (this.elements.where(function(p) {
        return p != null;
      }).length === 0) {
        return;
      }
      if (!this.bounced) {
        return this.emit();
      } else {
        return this.retreat();
      }
    };

    StableBeam.prototype.retreat = function() {
      var i, obj, _i, _ref1, _results,
        _this = this;
      _results = [];
      for (i = _i = _ref1 = this.elements.length - 1; _ref1 <= 0 ? _i <= 0 : _i >= 0; i = _ref1 <= 0 ? ++_i : --_i) {
        obj = this.elements[i];
        if (obj === null) {
          continue;
        }
        this.envCtx.rmObj(obj);
        this.elements[i] = null;
        this.envCtx.delay(this.delay, function() {
          return _this.moveOneStep();
        });
        break;
      }
      return _results;
    };

    StableBeam.prototype.emit = function() {
      var newX, newY, objAhead, s,
        _this = this;
      newX = this.stableBeamDelta.x(this.elements.last().x);
      newY = this.stableBeamDelta.y(this.elements.last().y);
      objAhead = this.envCtx.getObjAt(newX, newY);
      if (objAhead === null) {
        if (this.lastBeamState === 'o') {
          this.lastBeamState = 'e';
        } else {
          this.lastBeamState = 'o';
        }
        s = new app.StableBeamPart(this.envCtx, newX, newY, ("laser-beam-" + this.orientationChar) + this.lastBeamState);
        this.envCtx.putObj(s);
        this.elements.push(s);
      } else if (typeof objAhead.canBlowUp === "function" ? objAhead.canBlowUp() : void 0) {
        objAhead.blowUp();
        this.bounced = true;
      } else {
        this.bounced = true;
      }
      return this.envCtx.delay(this.delay, function() {
        return _this.moveOneStep();
      });
    };

    return StableBeam;

  })();

}).call(this);
