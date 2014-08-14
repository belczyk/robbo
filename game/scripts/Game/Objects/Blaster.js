(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Blaster = (function(_super) {

    __extends(Blaster, _super);

    Blaster.include(new app.Bombblowable());

    Blaster.include(new app.ArmedWithBlaster());

    function Blaster(envCtx, x, y, direction) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.initBlaster();
      Blaster.__super__.constructor.call(this, "laser-" + direction[0]);
    }

    return Blaster;

  })(app.Object);

}).call(this);
