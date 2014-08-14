(function() {
  var app, _ref,
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Multistate = (function() {

    function Multistate() {}

    Multistate.prototype.changeState = function() {
      var args, newState;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!(this.stateSelector != null)) {
        return;
      }
      args.push(this.currentState);
      newState = this.stateSelector.apply(this.stateSelector, args);
      return this.setCurrentState(newState);
    };

    return Multistate;

  })();

}).call(this);
