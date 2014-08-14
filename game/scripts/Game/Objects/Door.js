(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Door = (function(_super) {

    __extends(Door, _super);

    Door.prototype.unlocked = false;

    Door.prototype.opened = false;

    function Door(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Door.__super__.constructor.call(this, 'door');
      this.eventAggregator.subscribe('robbo-moving', (function() {
        return _this.openDoor();
      }), this, function(x, y) {
        return x === _this.x && y === _this.y;
      });
    }

    Door.prototype.canStepOn = function() {
      return this.opend;
    };

    Door.prototype.openDoor = function() {
      var robbo;
      robbo = this.envCtx.getRobbo();
      if (!this.unlocked && robbo.keys > 0) {
        this.unlocked = true;
        this.eventAggregator.publish('key-used');
        this.envCtx.hide(this.x, this.y);
        return this.envCtx.sound('door');
      } else if (this.unlocked) {
        this.opend = true;
        return this.eventAggregator.unsubscribe(this);
      }
    };

    return Door;

  })(app.Object);

}).call(this);
