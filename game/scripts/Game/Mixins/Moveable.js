(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Moveable = (function() {

    function Moveable() {}

    Moveable.prototype.canStepOn = function(delta) {
      return this.envCtx.getObjAtD(this, delta) === null;
    };

    Moveable.prototype.isMoveable = true;

    return Moveable;

  })();

}).call(this);
