(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Blink = (function(_super) {

    __extends(Blink, _super);

    function Blink(envCtx, x, y, direction, onFinish) {
      var startState;
      this.onFinish = onFinish;
      if (direction === 1) {
        startState = 1;
      }
      if (direction === -1) {
        startState = 4;
      }
      Blink.__super__.constructor.call(this, envCtx, x, y, 'blink', app.Predef.Blink.animationDelay, startState, 4, direction);
    }

    return Blink;

  })(app.DisappearingAnimation);

}).call(this);
