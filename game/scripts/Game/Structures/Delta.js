(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Delta = (function() {

    Delta.prototype.equals = function(d) {
      return this.dx() === d.dx() && this.dy() === d.dy();
    };

    Delta.prototype.coords = [];

    function Delta(coords) {
      var _ref1;
      this.coords = coords;
      if ((_ref1 = this.coords) == null) {
        this.coords = [];
      }
    }

    Delta.fromDirection = function(direction) {
      var delta, ret;
      switch (direction) {
        case 'left':
          delta = [-1, 0];
          break;
        case 'right':
          delta = [1, 0];
          break;
        case 'up':
          delta = [0, -1];
          break;
        case 'down':
          delta = [0, 1];
      }
      ret = new app.Delta();
      ret.coords = delta;
      return ret;
    };

    Delta.fromOrientation = function(orientation) {
      if (orientation === 'vertical') {
        return new app.Delta([0, -1]);
      } else {
        return new app.Delta([-1, 0]);
      }
    };

    Delta.prototype.reversed = function() {
      return new app.Delta([this.coords[0] * -1, this.coords[1] * -1]);
    };

    Delta.prototype.x = function(x) {
      return x + this.coords[0];
    };

    Delta.prototype.y = function(y) {
      return y + this.coords[1];
    };

    Delta.prototype.dx = function(x) {
      return this.coords[0];
    };

    Delta.prototype.dy = function(y) {
      return this.coords[1];
    };

    Delta.prototype.orientationChar = function() {
      if (this.equals(new app.Delta([-1, 0])) || this.equals(new app.Delta([1, 0]))) {
        return 'h';
      } else {
        return 'v';
      }
    };

    return Delta;

  })();

}).call(this);
