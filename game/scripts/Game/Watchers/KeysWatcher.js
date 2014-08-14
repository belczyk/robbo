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
        return _this.increase();
      }), this);
      this.eventAggregator.subscribe('key-used', (function() {
        return _this.decrese();
      }), this);
      this.setText();
    }

    KeyWatcher.prototype.decrese = function() {
      this.count--;
      return this.setText();
    };

    KeyWatcher.prototype.increase = function() {
      this.count++;
      return this.setText();
    };

    KeyWatcher.prototype.setText = function() {
      return $('.keys-left').text(this.count);
    };

    return KeyWatcher;

  })();

}).call(this);
