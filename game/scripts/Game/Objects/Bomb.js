(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Bomb = (function(_super) {

    __extends(Bomb, _super);

    Bomb.include(new app.Moveable);

    Bomb.include(new app.Blowable);

    function Bomb(envCtx, x, y) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      Bomb.__super__.constructor.call(this, 'bomb');
    }

    Bomb.prototype.isBomb = function() {
      return true;
    };

    Bomb.prototype.activeBomb = true;

    Bomb.prototype.createBlowupCallback = function(x, y) {
      var _this = this;
      return function() {
        return _this.envCtx.getObjAt(x, y).blowUp();
      };
    };

    Bomb.prototype.onPush = function() {
      return this.envCtx.sound('container');
    };

    Bomb.prototype.blowUp = function() {
      var dx, dy, obj, _i, _j;
      if (!this.activeBomb) {
        return;
      }
      this.activeBomb = false;
      this.blowUpItself();
      for (dx = _i = -1; _i <= 1; dx = ++_i) {
        for (dy = _j = -1; _j <= 1; dy = ++_j) {
          if ((dx === 0 && dy !== 0) || (dx !== 0 && dy === 0) || (dx !== 0 && dy !== 0)) {
            obj = this.envCtx.getObjAt(this.x + dx, this.y + dy);
            if (obj === null) {
              this.showSmoke(dx, dy);
            } else if (typeof obj.isBomb === "function" ? obj.isBomb() : void 0) {
              this.envCtx.delay(180, this.createBlowupCallback(obj.x, obj.y));
            } else if (((obj.canBlowUp != null) && obj.canBlowUp()) || ((obj.canBombBlowUp != null) && obj.canBombBlowUp())) {
              obj.blowUp();
            } else if (this.envCtx.getObjName(obj) === 'LaserBeam') {
              this.showSmoke(dx, dy);
              this.envCtx.eventAggregator.unsubscribe(obj);
            }
          }
        }
      }
    };

    Bomb.prototype.blowUpItself = function() {
      var smoke;
      smoke = new app.Smoke(this.envCtx, this.x, this.y);
      this.envCtx.putObj(smoke);
      smoke.init();
      this.envCtx.eventAggregator.unsubscribe(this);
      return this.envCtx.sound('explosion');
    };

    Bomb.prototype.showSmoke = function(dx, dy) {
      var smoke;
      smoke = new app.Smoke(this.envCtx, this.x + dx, this.y + dy);
      this.envCtx.putObj(smoke);
      return smoke.init();
    };

    return Bomb;

  })(app.Object);

}).call(this);
