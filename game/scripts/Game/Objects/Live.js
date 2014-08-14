(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Live = (function(_super) {

    __extends(Live, _super);

    Live.include(new app.Collectable('live'));

    Live.include(new app.Blowable());

    function Live(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Live.__super__.constructor.call(this, 'live');
      this.eventAggregator.subscribe('robbo-moved', (function() {
        return _this.collect();
      }), this, function(x, y) {
        return x === _this.x && y === _this.y;
      });
    }

    Live.prototype.onCollect = function() {
      return this.envCtx.sound('live');
    };

    return Live;

  })(app.Object);

}).call(this);
