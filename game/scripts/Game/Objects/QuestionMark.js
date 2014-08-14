(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.QuestionMark = (function(_super) {

    __extends(QuestionMark, _super);

    QuestionMark.include(new app.Blowable());

    QuestionMark.include(new app.Moveable());

    function QuestionMark(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.objects = [
        function() {
          var ship;
          ship = new app.Ship(_this.envCtx, _this.x, _this.y);
          ship.activateShip();
          return ship;
        }, function() {
          var eyes;
          eyes = new app.Eyes(_this.envCtx, _this.x, _this.y);
          eyes.init();
          return eyes;
        }, function() {
          var smoke;
          smoke = new app.Smoke(_this.envCtx, _this.x, _this.y);
          smoke.init();
          return smoke;
        }, function() {
          return new app.Bolt(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.Ammo(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.Bomb(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.RotatingLaser(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.Container(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.Key(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.QuestionMark(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.Live(_this.envCtx, _this.x, _this.y);
        }, function() {
          return new app.MightyLive(_this.envCtx, _this.x, _this.y);
        }
      ];
      QuestionMark.__super__.constructor.call(this, 'question');
    }

    QuestionMark.prototype.blowUp = function() {
      var smoke,
        _this = this;
      this.envCtx.sound('destruction');
      smoke = new app.Smoke(this.envCtx, this.x, this.y, 1, function() {
        return _this.afterBlowup();
      });
      this.envCtx.putObj(smoke);
      return smoke.init();
    };

    QuestionMark.prototype.afterBlowup = function() {
      return this.envCtx.putObj(this.objects[app.Tools.getGaussRand(0, 11, 3)]());
    };

    return QuestionMark;

  })(app.Object);

}).call(this);
