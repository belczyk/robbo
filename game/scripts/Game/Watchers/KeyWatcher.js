(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.KeyWatcher = (function() {

    KeyWatcher.prototype.count = 0;

    function KeyWatcher(eventAggregator) {
      var _this = this;
      this.eventAggregator = eventAggregator;
      this.eventAggregator.subscribe('key-collected', (function() {
        _this.count++;
        return _this.setText();
      }), this);
      this.eventAggregator.subscribe('key-used', (function() {
        _this.count--;
        return _this.setText();
      }), this);
      this.eventAggregator.subscribe('restart-level', (function() {
        _this.count = 0;
        return _this.setText();
      }), this);
      this.setText();
    }

    KeyWatcher.prototype.setText = function() {
      return $('.keys-left').text(this.count);
    };

    return KeyWatcher;

  })();

}).call(this);
