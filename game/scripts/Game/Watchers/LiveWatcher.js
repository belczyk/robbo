(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.LiveWatcher = (function() {

    function LiveWatcher(count, eventAggregator) {
      var _this = this;
      this.count = count;
      this.eventAggregator = eventAggregator;
      this.eventAggregator.subscribe('live-collected', (function() {
        _this.count++;
        return _this.update();
      }), this);
      this.eventAggregator.subscribe('robbo-destroyed', (function() {
        _this.count--;
        return _this.update();
      }), this);
      this.setText();
    }

    LiveWatcher.prototype.update = function() {
      this.setText();
      if (this.count === 0) {
        return this.eventAggregator.publish('game-over');
      }
    };

    LiveWatcher.prototype.setText = function() {
      return $('.lives-left').text(this.count);
    };

    return LiveWatcher;

  })();

}).call(this);
