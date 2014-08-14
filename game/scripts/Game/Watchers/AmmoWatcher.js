(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.AmmoWatcher = (function() {

    AmmoWatcher.prototype.count = 0;

    function AmmoWatcher(eventAggregator) {
      var _this = this;
      this.eventAggregator = eventAggregator;
      this.eventAggregator.subscribe('ammo-collected', (function(count) {
        _this.count += count;
        return _this.setText();
      }), this);
      this.eventAggregator.subscribe('ammo-used', (function() {
        _this.count--;
        return _this.setText();
      }), this);
      this.eventAggregator.subscribe('restart-level', (function() {
        _this.count = 0;
        return _this.setText();
      }), this);
      this.setText();
    }

    AmmoWatcher.prototype.setText = function() {
      return $('.ammo-left').text(this.count);
    };

    return AmmoWatcher;

  })();

}).call(this);
