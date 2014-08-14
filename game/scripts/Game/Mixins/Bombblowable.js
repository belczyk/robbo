(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Bombblowable = (function(_super) {

    __extends(Bombblowable, _super);

    Bombblowable.include(new app.Blowable());

    function Bombblowable() {}

    Bombblowable.prototype.canBlowUp = function() {
      return false;
    };

    Bombblowable.prototype.canBombBlowUp = function() {
      return true;
    };

    return Bombblowable;

  })(app.Module);

}).call(this);
