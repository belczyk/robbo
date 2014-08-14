(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.MNeighbour = (function() {

    function MNeighbour(N, NE, E, SE, S, SW, W, NW) {
      this.N = N;
      this.NE = NE;
      this.E = E;
      this.SE = SE;
      this.S = S;
      this.SW = SW;
      this.W = W;
      this.NW = NW;
      this.directions = [];
      this.directions.push({
        delta: [0, -1],
        obj: this.N
      });
      this.directions.push({
        delta: [1, -1],
        obj: this.NE
      });
      this.directions.push({
        delta: [1, 0],
        obj: this.E
      });
      this.directions.push({
        delta: [1, 1],
        obj: this.SE
      });
      this.directions.push({
        delta: [0, 1],
        obj: this.S
      });
      this.directions.push({
        delta: [-1, 1],
        obj: this.SW
      });
      this.directions.push({
        delta: [-1, 0],
        obj: this.W
      });
      this.directions.push({
        delta: [-1, -1],
        obj: this.NW
      });
    }

    MNeighbour.prototype.asArray = function() {
      return [this.N, this.NE, this.E, this.SE, this.S, this.SW, this.W, this.NW];
    };

    MNeighbour.prototype.asOrderedArray = function(startDelta) {
      var delta, i, ii, res, start, _i, _j, _ref1;
      res = [];
      start = 0;
      for (i = _i = 0; _i <= 7; i = ++_i) {
        delta = this.directions[i].delta;
        if (delta[0] === startDelta[0] && delta[1] === startDelta[1]) {
          start = i;
          break;
        }
      }
      for (i = _j = start, _ref1 = start + 7; start <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = start <= _ref1 ? ++_j : --_j) {
        ii = i < 8 ? i : i - 8;
        res.push(this.directions[ii].obj);
      }
      return res;
    };

    return MNeighbour;

  })();

}).call(this);
