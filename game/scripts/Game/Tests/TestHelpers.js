(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.TestHelper = {
    getEnvCtx: function(width, height) {
      var env;
      env = new app.EnvironmentContext(new app.EventAggregator(), {
        draw: (function() {}),
        clear: (function() {})
      }, {
        delay: function(time, fun) {
          return fun();
        }
      });
      if ((width != null) && (height != null)) {
        env.initMap(width, height);
      }
      env.registerRandomCall = function() {};
      env.unregisterRandomCalls = function() {};
      env.sound = function() {};
      return env;
    },
    callNTimes: function(n, action) {
      var i, _i, _ref1;
      if (n == null) {
        n = 1;
      }
      for (i = _i = 0, _ref1 = n - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        action();
      }
    },
    publishArrowDown: function(envCtx, direction, count) {
      switch (direction) {
        case 'left':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 37,
              direction: 'left'
            });
          });
        case 'up':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 38,
              direction: 'up'
            });
          });
        case 'right':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 39,
              direction: 'right'
            });
          });
        case 'down':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 40,
              direction: 'down'
            });
          });
      }
    },
    publishArrowDownCtrl: function(envCtx, direction, count) {
      switch (direction) {
        case 'left':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 37,
              direction: 'left',
              ctrl: true
            });
          });
        case 'up':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 38,
              direction: 'up',
              ctrl: true
            });
          });
        case 'right':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 39,
              direction: 'right',
              ctrl: true
            });
          });
        case 'down':
          return this.callNTimes(count, function() {
            return envCtx.eventAggregator.publish("arrow-down", {
              keyCode: 40,
              direction: 'down',
              ctrl: true
            });
          });
      }
    }
  };

}).call(this);
