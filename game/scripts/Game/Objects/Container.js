(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Container = (function(_super) {

    __extends(Container, _super);

    Container.include(new app.Moveable);

    Container.include(new app.Bombblowable);

    function Container(envCtx, x, y) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Container.__super__.constructor.call(this, 'container');
    }

    Container.prototype.onPush = function() {
      return this.envCtx.sound('container');
    };

    return Container;

  })(app.Object);

}).call(this);
