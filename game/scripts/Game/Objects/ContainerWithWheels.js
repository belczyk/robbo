(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.ContainerWithWheels = (function(_super) {

    __extends(ContainerWithWheels, _super);

    ContainerWithWheels.include(new app.Bombblowable);

    function ContainerWithWheels(envCtx, x, y) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      ContainerWithWheels.__super__.constructor.call(this, 'container-with-wheels');
      this.delay = app.Predef.ContainerWithWheels.movementDelay;
      this.eventAggregator.subscribe('robbo-moving', (function(x, y, delta) {
        return _this.pushContainer(delta);
      }), this, function(x, y) {
        return x === _this.x && y === _this.y;
      });
    }

    ContainerWithWheels.prototype.pushContainer = function(delta) {
      return this.moveOneStep(delta);
    };

    ContainerWithWheels.prototype.moveOneStep = function(delta) {
      var obj,
        _this = this;
      obj = this.envCtx.getObjAtD(this, delta);
      if (obj === null) {
        this.envCtx.moveObjByD(this.x, this.y, delta);
        this.envCtx.sound('container');
        return this.envCtx.delay(this.delay, function() {
          return _this.moveOneStep(delta);
        });
      } else if (typeof obj.canBlowUp === "function" ? obj.canBlowUp() : void 0) {
        obj.blowUp();
      }
    };

    return ContainerWithWheels;

  })(app.Object);

}).call(this);
