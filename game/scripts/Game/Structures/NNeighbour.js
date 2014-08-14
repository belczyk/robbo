(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.NNeighbour = (function() {

    function NNeighbour(N, E, S, W) {
      this.N = N;
      this.E = E;
      this.S = S;
      this.W = W;
      this.directions = [];
      this.directions.push({
        delta: [0, -1],
        obj: this.N
      });
      this.directions.push({
        delta: [1, 0],
        obj: this.E
      });
      this.directions.push({
        delta: [0, 1],
        obj: this.S
      });
      this.directions.push({
        delta: [-1, 0],
        obj: this.W
      });
    }

    NNeighbour.prototype.asArray = function() {
      return [this.N, this.E, this.S, this.W];
    };

    NNeighbour.prototype.asOrderedArray = function(startDelta) {
      var delta, i, ii, res, start, _i, _j, _ref1;
      res = [];
      start = 0;
      for (i = _i = 0; _i <= 3; i = ++_i) {
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

    return NNeighbour;

  })();

}).call(this);
