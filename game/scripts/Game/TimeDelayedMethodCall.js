(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.TimeDelayedMethodCall = (function() {

    TimeDelayedMethodCall.prototype.enabled = true;

    function TimeDelayedMethodCall() {
      this.randomCallers = [];
      this.resetToken();
    }

    TimeDelayedMethodCall.prototype.resetToken = function() {
      this.currentToken = Math.uuid();
      return console.log("new token: " + this.currentToken);
    };

    TimeDelayedMethodCall.prototype.delay = function(time, fun) {
      var _this = this;
      return setTimeout((function() {
        return _this.execute(fun, _this.currentToken);
      }), time);
    };

    TimeDelayedMethodCall.prototype.execute = function(fun, token) {
      try {
        if (token === this.currentToken) {
          return fun();
        } else {
          return console.log('canceled token');
        }
      } catch (e) {
        return console.log("error: token:" + token + " currentToken:" + this.currentToken + ": " + e);
      }
    };

    TimeDelayedMethodCall.prototype.registerRandomCall = function(obj, fun) {
      this.randomCallers.push({
        obj: obj,
        fun: fun,
        token: this.currentToken
      });
      return this.randomTrigger(obj, fun, this.currentToken);
    };

    TimeDelayedMethodCall.prototype.unregisterRandomCalls = function(obj) {
      var i, rCall, _i, _len, _ref1;
      _ref1 = this.randomCallers;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        rCall = _ref1[i];
        if ((rCall != null) && (rCall.obj === obj)) {
          this.randomCallers[i] = null;
        }
        this.randomCallers = this.randomCallers.where(function(i) {
          return i != null;
        });
      }
    };

    TimeDelayedMethodCall.prototype.randomTrigger = function(obj, fun) {
      var callback, rc, time,
        _this = this;
      rc = this.randomCallers.single(function(c) {
        return c.obj === obj && c.fun === fun;
      });
      if ((rc != null) && rc.token === this.currentToken) {
        time = app.Tools.getRand(1, 15) * 300;
        callback = function() {
          rc = _this.randomCallers.single(function(c) {
            return c.obj === obj && c.fun === fun;
          });
          if ((rc != null) && rc.token === _this.currentToken) {
            rc.fun();
            return _this.randomTrigger(rc.obj, rc.fun);
          } else {
            return console.log('subscribtion token canceled');
          }
        };
        return setTimeout((function() {
          return callback();
        }), time);
      } else {
        return console.log('subscribtion token canceled ');
      }
    };

    return TimeDelayedMethodCall;

  })();

}).call(this);
