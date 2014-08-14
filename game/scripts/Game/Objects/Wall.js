(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Wall = (function(_super) {

    __extends(Wall, _super);

    function Wall(envCtx, x, y) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Wall.__super__.constructor.call(this, 'wall');
    }

    Wall.prototype.canStepOn = function() {
      return false;
    };

    return Wall;

  })(app.Object);

}).call(this);
