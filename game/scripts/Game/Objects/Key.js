(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Key = (function(_super) {

    __extends(Key, _super);

    Key.include(new app.Collectable('key'));

    Key.include(new app.Bombblowable());

    function Key(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Key.__super__.constructor.call(this, 'key');
      this.eventAggregator.subscribe('robbo-moved', (function() {
        return _this.collect();
      }), this, function(x, y) {
        return x === _this.x && y === _this.y;
      });
    }

    Key.prototype.onCollect = function() {
      return this.envCtx.sound('key');
    };

    return Key;

  })(app.Object);

}).call(this);
