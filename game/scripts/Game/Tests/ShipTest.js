(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('Ship tests');

  test("Is ship moveable", function() {
    return app.TestMoveable.testObject(app.Ship);
  });

}).call(this);
