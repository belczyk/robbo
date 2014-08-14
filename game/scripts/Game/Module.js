(function() {
  var app, moduleKeywords, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  moduleKeywords = ['extended', 'included'];

  app.Module = (function() {

    function Module() {}

    Module.extend = function(obj) {
      var key, value, _ref1;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref1 = obj.extended) != null) {
        _ref1.apply(this);
      }
      return this;
    };

    Module.include = function(obj) {
      var key, value, _ref1;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          if (key !== 'constructor') {
            this.prototype[key] = value;
          }
        }
      }
      if ((_ref1 = obj.included) != null) {
        _ref1.apply(this);
      }
      return this;
    };

    return Module;

  })();

}).call(this);
