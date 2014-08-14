(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.MightyLive = (function(_super) {
    var todestroy;

    __extends(MightyLive, _super);

    todestroy = ['Door', 'Laser', 'RotatingLaser', 'StableBeamLaser', 'Blaster', 'Ant', 'Coala', 'Magnet', 'Bat', 'FiringBat', 'Eyes', 'MovingLaser'];

    function MightyLive(envCtx, x, y) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      MightyLive.__super__.constructor.call(this, this.envCtx, this.x, this.y);
    }

    MightyLive.prototype.onCollect = function() {
      var obj, row, _i, _len, _ref1, _results;
      this.envCtx.sound('live');
      this.eventAggregator.publish('thunder');
      _ref1 = this.envCtx.map;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        row = _ref1[_i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
            obj = row[_j];
            if (obj === null) {
              continue;
            }
            if (todestroy.contains(this.envCtx.getObjName(obj))) {
              obj.isActive = false;
              this.envCtx.unregisterRandomCalls(obj);
              this.eventAggregator.unsubscribe(obj);
              _results1.push(this.envCtx.rmObj(obj));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return MightyLive;

  })(app.Live);

}).call(this);
