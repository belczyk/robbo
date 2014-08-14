(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Object = (function(_super) {

    __extends(Object, _super);

    function Object(currentState) {
      this.currentState = currentState;
      this.eventAggregator = this.envCtx.eventAggregator;
    }

    Object.prototype.setCurrentState = function(currentState) {
      this.currentState = currentState;
      return this.envCtx.objChangedState(this);
    };

    return Object;

  })(app.Module);

}).call(this);
