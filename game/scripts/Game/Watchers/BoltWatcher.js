(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.BoltWatcher = (function() {

    function BoltWatcher(eventAggregator) {
      var _this = this;
      this.eventAggregator = eventAggregator;
      this.count = 0;
      this.eventAggregator.subscribe('bolt-collected', (function() {
        if (_this.count > 0) {
          _this.count--;
          return _this.update();
        }
      }), this);
      this.eventAggregator.subscribe('starting-number-of-bolts', (function(n) {
        _this.count = n;
        return _this.update();
      }), this);
      this.setText();
    }

    BoltWatcher.prototype.update = function() {
      this.setText();
      if (this.count === 0) {
        return this.eventAggregator.publish('all-bolts-collected');
      }
    };

    BoltWatcher.prototype.setText = function() {
      return $('.bolts-left').text(this.count);
    };

    return BoltWatcher;

  })();

}).call(this);
