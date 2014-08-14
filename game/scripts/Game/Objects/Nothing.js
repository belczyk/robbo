(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Nothing = (function(_super) {

    __extends(Nothing, _super);

    function Nothing(envCtx, x, y) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Nothing.__super__.constructor.call(this, 'nothing');
    }

    Nothing.prototype.canStepOn = function() {
      return false;
    };

    return Nothing;

  })(app.Object);

}).call(this);
