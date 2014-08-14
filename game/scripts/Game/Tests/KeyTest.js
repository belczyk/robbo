(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  module('Key tests');

  test("Key is collectable", function() {
    return app.TestCollectable.testObject(app.Key, 1, function(r) {
      return r.keys;
    });
  });

  test("Can bomb blow up key", function() {
    return app.TestBombblowable.testObject(app.Key);
  });

}).call(this);
