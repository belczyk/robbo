(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  Array.prototype.where = function(predicat) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      item = this[_i];
      if (predicat(item)) {
        _results.push(item);
      }
    }
    return _results;
  };

  Array.prototype.single = function(predicat) {
    var item, items, _i, _len;
    items = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      item = this[_i];
      if (predicat(item)) {
        items.push(item);
      }
    }
    if (items.length === 1) {
      return items[0];
    }
    if (items.length === 0) {
      return null;
    }
    throw "Many items for given predicat";
  };

  Array.prototype.top = function(n) {
    return this.slice(0, n);
  };

  Array.prototype.any = function(predicat) {
    var item, items, _i, _len;
    if (predicat != null) {
      items = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        item = this[_i];
        if (predicat(item)) {
          items.push(item);
        }
      }
      return items.length > 0;
    }
    return this.length > 0;
  };

  Array.prototype.contains = function(obj) {
    var item, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      item = this[_i];
      if (item === obj) {
        return true;
      }
    }
    return false;
  };

  Array.prototype.first = function() {
    return this[0];
  };

  Array.prototype.select = function(selector) {
    var item, ret, _i, _len;
    ret = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      item = this[_i];
      ret.push(selector(item));
    }
    return ret;
  };

  Array.prototype.last = function() {
    return this[this.length - 1];
  };

  app.Tools = {};

  app.Tools.getRand = function(x, y) {
    var i, _i;
    for (i = _i = 0; _i <= 113; i = ++_i) {
      Math.random();
    }
    return Math.floor((Math.random() * (y + 1)) + x);
  };

  app.Tools.getGaussRand = function(a, b, stdev) {
    var res;
    res = Math.round(app.Tools.rnd_snd() * stdev + ((a + b) / 2));
    if (res > b) {
      res = b;
    }
    if (res < a) {
      res = a;
    }
    return res;
  };

  app.Tools.rnd_snd = function() {
    return (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
  };

}).call(this);
