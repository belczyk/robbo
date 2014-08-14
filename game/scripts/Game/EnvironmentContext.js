(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.EnvironmentContext = (function() {

    function EnvironmentContext(eventAggregator, drawingCtx, timer) {
      var _this = this;
      this.eventAggregator = eventAggregator;
      this.drawingCtx = drawingCtx;
      this.timer = timer;
      this.keys = 0;
      this.eventAggregator.subscribe('key-collected', (function() {
        return _this.keys++;
      }), this);
      this.eventAggregator.subscribe('key-used', (function() {
        return _this.keys--;
      }), this);
      this.eventAggregator.subscribe('restart-level', (function() {
        return _this.keys = 0;
      }), this);
    }

    EnvironmentContext.prototype.delay = function(time, fun) {
      return this.timer.delay(time, fun);
    };

    EnvironmentContext.prototype.hide = function(x, y) {
      return this.drawingCtx.clear(x, y);
    };

    EnvironmentContext.prototype.initMap = function(width, height) {
      var i, j, _i, _ref1, _results;
      this.width = width;
      this.height = height;
      this.map = [];
      _results = [];
      for (i = _i = 0, _ref1 = height - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        this.map.push([]);
        _results.push((function() {
          var _j, _ref2, _results1;
          _results1 = [];
          for (j = _j = 0, _ref2 = width - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; j = 0 <= _ref2 ? ++_j : --_j) {
            _results1.push(this.map[i].push(null));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    EnvironmentContext.prototype.getNNeighbour = function(x, y) {
      return new app.NNeighbour(this.getObjAt(x, y - 1), this.getObjAt(x, y + 1), this.getObjAt(x + 1, y), this.getObjAt(x - 1, y));
    };

    EnvironmentContext.prototype.getMNeighbour = function(x, y) {
      var n;
      n = this.getNNeighbour(x, y);
      return new app.MNeighbour(n.N, this.getObjAt(x + 1, y - 1), n.E, this.getObjAt(x + 1, y + 1), n.S, this.getObjAt(x - 1, y + 1), n.W, this.getObjAt(x - 1, y - 1));
    };

    EnvironmentContext.prototype.getKeysNumber = function() {
      return this.keys;
    };

    EnvironmentContext.prototype.getRow = function(lineNumber, startingColumn, endingColumn) {
      var i, ret, _i;
      if (startingColumn == null) {
        startingColumn = 0;
      }
      if (endingColumn == null) {
        endingColumn = this.width - 1;
      }
      ret = [];
      for (i = _i = startingColumn; startingColumn <= endingColumn ? _i <= endingColumn : _i >= endingColumn; i = startingColumn <= endingColumn ? ++_i : --_i) {
        ret.push(this.getObjAt(i, lineNumber));
      }
      return ret;
    };

    EnvironmentContext.prototype.getObjAt = function(x, y) {
      if (x > this.width - 1 || y > this.height - 1 || x < 0 || y < 0) {
        return {
          message: "Outside the map",
          outsideMap: true,
          canStepOn: (function() {
            return false;
          }),
          canBlowUp: function() {
            return false;
          }
        };
      }
      return this.map[y][x];
    };

    EnvironmentContext.prototype.getObjAtD = function(obj, delta) {
      var x, y;
      x = delta.x(obj.x);
      y = delta.y(obj.y);
      if (x > this.width - 1 || y > this.height - 1 || x < 0 || y < 0) {
        return {
          message: "Outside the map",
          outsideMap: true,
          canStepOn: (function() {
            return false;
          }),
          canBlowUp: function() {
            return false;
          }
        };
      }
      return this.map[y][x];
    };

    EnvironmentContext.prototype.setObjAtD = function(objr, delta, obj) {
      var x, y;
      x = delta.x(objr.x);
      y = delta.y(objr.y);
      this.map[y][x] = obj;
      if (obj != null) {
        obj.x = x;
        obj.y = y;
        return this.drawingCtx.draw(obj);
      } else {
        return this.drawingCtx.clear(x, y);
      }
    };

    EnvironmentContext.prototype.setObjAt = function(x, y, obj) {
      this.map[y][x] = obj;
      if (obj != null) {
        obj.x = x;
        obj.y = y;
        return this.drawingCtx.draw(obj);
      } else {
        return this.drawingCtx.clear(x, y);
      }
    };

    EnvironmentContext.prototype.putObj = function(obj) {
      if (obj != null) {
        return this.setObjAt(obj.x, obj.y, obj);
      }
    };

    EnvironmentContext.prototype.moveObjByD = function(x, y, delta) {
      var obj;
      obj = this.getObjAt(x, y);
      this.setObjAt(x, y, null);
      return this.setObjAt(delta.x(x), delta.y(y), obj);
    };

    EnvironmentContext.prototype.moveObjBy = function(x, y, dx, dy) {
      var obj;
      obj = this.getObjAt(x, y);
      this.setObjAt(x, y, null);
      return this.setObjAt(x + dx, y + dy, obj);
    };

    EnvironmentContext.prototype.stepOnD = function(x, y, delta) {
      var obj;
      obj = this.getObjAt(x, y);
      if ((obj != null) && (obj.isMoveable != null) && obj.isMoveable) {
        if (typeof obj.onPush === "function") {
          obj.onPush();
        }
        return this.moveObjByD(x, y, delta);
      }
    };

    EnvironmentContext.prototype.stepOn = function(x, y, dx, dy) {
      var obj;
      obj = this.getObjAt(x, y);
      if ((obj != null) && (obj.isMoveable != null) && obj.isMoveable) {
        if (typeof obj.onPush === "function") {
          obj.onPush();
        }
        return this.moveObjBy(x, y, dx, dy);
      }
    };

    EnvironmentContext.prototype.getRobbo = function() {
      var cell, row, _i, _j, _len, _len1, _ref1;
      _ref1 = this.map;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        row = _ref1[_i];
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          cell = row[_j];
          if ((cell != null ? cell.isRobbo : void 0) != null) {
            return cell;
          }
        }
      }
    };

    EnvironmentContext.prototype.objChangedState = function(obj) {
      return this.drawingCtx.draw(obj);
    };

    EnvironmentContext.prototype.rmObj = function(obj) {
      return this.setObjAt(obj.x, obj.y, null);
    };

    EnvironmentContext.prototype.getObjName = function(obj) {
      var funcNameRegex, results;
      funcNameRegex = /function(.{1,})\(/;
      results = funcNameRegex.exec(obj.constructor.toString());
      if (results && results.length > 1) {
        return results[1].trim();
      } else {
        return "";
      }
    };

    EnvironmentContext.prototype.registerRandomCall = function(obj, fun) {
      return this.timer.registerRandomCall(obj, fun);
    };

    EnvironmentContext.prototype.unregisterRandomCalls = function(obj) {
      return this.timer.unregisterRandomCalls(obj);
    };

    EnvironmentContext.prototype.sound = function(name) {
      var sound, _ref1;
      sound = $("#audio-" + name).clone()[0];
      return (_ref1 = $("#audio-" + name).clone()[0]) != null ? _ref1.play() : void 0;
    };

    return EnvironmentContext;

  })();

}).call(this);
