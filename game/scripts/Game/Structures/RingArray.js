(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.RingArray = (function() {

    function RingArray(innerArray) {
      var _ref1;
      this.innerArray = innerArray;
      if ((_ref1 = this.innerArray) == null) {
        this.innerArray = [];
      }
      this.length = this.innerArray.length;
    }

    RingArray.prototype.push = function(obj) {
      this.innerArray.push(obj);
      this.length++;
      return this.innerArray.sort();
    };

    RingArray.prototype.popWhere = function(func) {
      var i;
      i = this.getIndex(this.innerArray.single(func));
      if (i === null) {
        return;
      }
      this.innerArray[i] = null;
      this.innerArray = this.innerArray.where(function(i) {
        return i != null;
      });
      return this.length--;
    };

    RingArray.prototype.getIndex = function(obj) {
      var i, item, _i, _len, _ref1;
      _ref1 = this.innerArray;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        item = _ref1[i];
        if (item === obj) {
          return i;
        }
      }
      return null;
    };

    RingArray.prototype.getNextTo = function(obj, comparer) {
      var i, item, _i, _len, _ref1;
      if (comparer == null) {
        comparer = function(i1, i2) {
          return i1 === i2;
        };
      }
      _ref1 = this.innerArray;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        item = _ref1[i];
        if (comparer(item, obj)) {
          if (i === this.length - 1) {
            return this.innerArray[0];
          }
          return this.innerArray[i + 1];
        }
      }
      return null;
    };

    RingArray.prototype.get = function(i) {
      return this.innerArray[i];
    };

    return RingArray;

  })();

}).call(this);
