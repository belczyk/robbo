(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('Bomb tests');

  test("Is bomb moveable", function() {
    return app.TestMoveable.testObject(app.Bomb);
  });

}).call(this);
