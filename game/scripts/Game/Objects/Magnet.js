(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Magnet = (function(_super) {

    __extends(Magnet, _super);

    Magnet.include(new app.Bombblowable());

    function Magnet(envCtx, x, y, orientation) {
      var asset,
        _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.orientation = orientation;
      switch (this.orientation) {
        case 'left':
          asset = 'magnet-l';
          this.delta = -1;
          break;
        case 'right':
          this.delta = 1;
          asset = 'magnet-r';
      }
      Magnet.__super__.constructor.call(this, asset);
      this.eventAggregator.subscribe('robbo-moved', (function(x, y) {
        return _this.drag(x, y);
      }), this, function(x, y) {
        return y === _this.y && _this.isInField(x, y);
      });
    }

    Magnet.prototype.drag = function(x, y) {
      var robbo,
        _this = this;
      robbo = this.envCtx.getObjAt(x, y);
      robbo.canMove = false;
      if (x !== this.x - this.delta) {
        this.envCtx.moveObjBy(x, y, this.delta, 0);
        return this.envCtx.delay(app.Magnet.dragDelay, function() {
          return _this.drag(x + _this.delta, y);
        });
      } else {
        return robbo.blowUp();
      }
    };

    Magnet.prototype.isInField = function(x, y) {
      var tail, _i, _len, _ref1;
      _ref1 = this.getField();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        tail = _ref1[_i];
        if ((tail != null) && (!(tail.isRobbo != null) || !tail.isRobbo)) {
          return false;
        }
        if ((tail != null ? tail.x : void 0) === x && (tail != null ? tail.y : void 0) === y) {
          return true;
        }
      }
      return false;
    };

    Magnet.prototype.getField = function() {
      var end, line, start;
      if (this.orientation === 'left') {
        start = this.x + 1;
        end = null;
      } else {
        start = 0;
        end = this.x - 1;
      }
      line = this.envCtx.getRow(this.y, start, end);
      if (this.orientation === 'right') {
        line.reverse();
      }
      return line;
    };

    return Magnet;

  })(app.Object);

}).call(this);
