(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Circlewalker = (function() {

    function Circlewalker(direction) {
      if (direction === 'clockwise') {
        this.moveMap = app.Circlewalker.clocwiseMap;
      } else {
        this.moveMap = app.Circlewalker.conterClockwiseMap;
      }
    }

    Circlewalker.prototype.init = function() {
      var mn, tail,
        _this = this;
      this.delay = app.Predef.Circlewalker.movementDelay;
      mn = this.envCtx.getMNeighbour(this.x, this.y);
      tail = mn.asOrderedArray([0, -1]).where(function(d) {
        return d != null;
      }).first();
      this.currentTail = [tail.x, tail.y];
      return this.envCtx.delay(this.delay, function() {
        return _this.moveOneStep();
      });
    };

    Circlewalker.prototype.delta = function() {
      return (this.currentTail[0] - this.x).toString() + (this.currentTail[1] - this.y).toString();
    };

    Circlewalker.prototype.deq = function(delta, vec) {
      return delta[0] === vec[0] && delta[1] === vec[1];
    };

    Circlewalker.prototype.tryMove = function(delta, stacked) {
      var nm,
        _this = this;
      nm = this.envCtx.getNNeighbour(this.x, this.y).asArray().where(function(d) {
        return d != null;
      });
      if (nm.length === 4) {
        this.changeState();
        return this.envCtx.delay(this.delay, function() {
          return _this.moveOneStep();
        });
      }
      if (this.envCtx.getObjAt(this.x + delta[0], this.y + delta[1]) != null) {
        this.currentTail = [this.x + delta[0], this.y + delta[1]];
        return this.moveOneStep();
      } else {
        this.envCtx.moveObjBy(this.x, this.y, delta[0], delta[1]);
        this.envCtx.delay(this.delay, function() {
          return _this.moveOneStep();
        });
        this.changeState();
        return this.attack();
      }
    };

    Circlewalker.conterClockwiseMap = {
      "1-1": [0, -1],
      "10": [0, -1],
      "0-1": [-1, 0],
      "-1-1": [-1, 0],
      "11": [1, 0],
      "01": [1, 0],
      "-11": [0, 1],
      "-10": [0, 1]
    };

    Circlewalker.clocwiseMap = {
      "1-1": [1, 0],
      "10": [0, 1],
      "0-1": [1, 0],
      "-1-1": [0, -1],
      "11": [0, 1],
      "01": [-1, 0],
      "-11": [-1, 0],
      "-10": [0, -1]
    };

    Circlewalker.prototype.moveOneStep = function() {
      if (this.isActive) {
        return this.tryMove(this.moveMap[this.delta()]);
      }
    };

    return Circlewalker;

  })();

}).call(this);
