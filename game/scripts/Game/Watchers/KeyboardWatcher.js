(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.KeyboardWatcher = (function() {

    function KeyboardWatcher(eventAggregator) {
      var _this = this;
      this.eventAggregator = eventAggregator;
      $(document).keydown(function(e, ee) {
        var direction, _ref1;
        if ((37 <= (_ref1 = e.keyCode) && _ref1 <= 40)) {
          switch (e.keyCode) {
            case 37:
              direction = 'left';
              break;
            case 38:
              direction = 'up';
              break;
            case 39:
              direction = 'right';
              break;
            case 40:
              direction = 'down';
          }
          return _this.eventAggregator.publish("arrow-down", {
            keyCode: e.keyCode,
            direction: direction,
            ctrl: e.ctrlKey,
            shift: e.shiftKey
          });
        }
      });
    }

    return KeyboardWatcher;

  })();

}).call(this);
