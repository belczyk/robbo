(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.DisappearingAnimation = (function(_super) {

    __extends(DisappearingAnimation, _super);

    DisappearingAnimation.include(new app.Multistate);

    function DisappearingAnimation(envCtx, x, y, asset, delay, startState, numberOfStates, direction) {
      var _ref1, _ref2, _ref3, _ref4;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.asset = asset;
      this.delay = delay;
      this.startState = startState;
      this.numberOfStates = numberOfStates;
      this.direction = direction;
      if ((_ref1 = this.direction) == null) {
        this.direction = 1;
      }
      if (this.direction === 1) {
        if ((_ref2 = this.startState) == null) {
          this.startState = 1;
        }
      }
      if ((_ref3 = this.delay) == null) {
        this.delay = app.DisappearingAnimation.defaultAnimationDelay;
      }
      if ((_ref4 = this.numberOfStates) == null) {
        this.numberOfStates = 4;
      }
      DisappearingAnimation.__super__.constructor.call(this, this.asset + '-' + this.startState);
    }

    DisappearingAnimation.prototype.isDisappearingAnimation = true;

    DisappearingAnimation.prototype.init = function() {
      return this.oneStep();
    };

    DisappearingAnimation.prototype.oneStep = function() {
      var obj,
        _this = this;
      if ((this.currentState !== this.asset + '-' + this.numberOfStates && this.direction === 1) || (this.currentState !== this.asset + '-1' && this.direction === -1)) {
        this.changeState(this.asset, this.direction);
        return this.envCtx.delay(this.delay, function() {
          return _this.oneStep();
        });
      } else {
        obj = this.envCtx.getObjAt(this.x, this.y);
        if (obj === this) {
          this.envCtx.rmObj(this);
        }
        return typeof this.onFinish === "function" ? this.onFinish() : void 0;
      }
    };

    DisappearingAnimation.prototype.stateSelector = function() {
      var args, asset, currentState, direction, i, start;
      asset = arguments[0], direction = arguments[1], currentState = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
      start = currentState.lastIndexOf('-');
      i = parseInt(currentState.substring(start + 1));
      i += direction;
      return asset + '-' + i;
    };

    return DisappearingAnimation;

  })(app.Object);

}).call(this);
