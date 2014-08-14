(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('Container tests');

  test("Is container moveable", function() {
    return app.TestMoveable.testObject(app.Container);
  });

  test("Can bomb blow up container", function() {
    return app.TestBombblowable.testObject(app.Container);
  });

}).call(this);
