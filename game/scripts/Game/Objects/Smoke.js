(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Smoke = (function(_super) {

    __extends(Smoke, _super);

    function Smoke(envCtx, x, y, startState, onFinish) {
      this.onFinish = onFinish;
      Smoke.__super__.constructor.call(this, envCtx, x, y, 'smoke', app.Predef.Smoke.animationDelay, startState);
    }

    return Smoke;

  })(app.DisappearingAnimation);

}).call(this);
