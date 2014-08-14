(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.IonStorm = (function(_super) {

    __extends(IonStorm, _super);

    IonStorm.include(new app.Blowable);

    IonStorm.prototype.isActive = true;

    function IonStorm(envCtx, x, y, orientation) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.delta = app.Delta.fromOrientation(orientation);
      IonStorm.__super__.constructor.call(this, 'ion-storm');
    }

    IonStorm.prototype.getOrigin = function() {
      var i, name, obj, origin, row, _i, _ref1, _ref2;
      row = this.envCtx.getRow(this.y);
      for (i = _i = _ref1 = this.x + 1, _ref2 = row.length; _ref1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; i = _ref1 <= _ref2 ? ++_i : --_i) {
        obj = row[i];
        if ((obj != null) && (name = this.envCtx.getObjName(obj)) === 'Wall') {
          origin = {
            x: i - 1,
            y: this.y
          };
        }
      }
      if (!(origin != null)) {
        origin = {
          x: this.envCtx.width - 1,
          y: this.y
        };
      }
      return origin;
    };

    IonStorm.prototype.init = function() {
      return this.moveOneStep();
    };

    IonStorm.prototype.moveOneStep = function() {
      var name, objAhead, origin,
        _this = this;
      if (this.isActive) {
        objAhead = this.envCtx.getObjAtD(this, this.delta);
        if (objAhead === null || ((name = this.envCtx.getObjName(objAhead)) !== 'Wall' && name !== 'IonStorm' && !objAhead.outsideMap)) {
          this.envCtx.moveObjByD(this.x, this.y, this.delta);
        } else {
          origin = this.getOrigin();
          this.envCtx.setObjAt(this.x, this.y, null);
          this.x = origin.x;
          this.y = origin.y;
          this.envCtx.putObj(this);
        }
        return this.envCtx.delay(app.Predef.IonStorm.movementDelay, function() {
          if (_this.isActive) {
            return _this.moveOneStep();
          }
        });
      }
    };

    IonStorm.prototype.canBlowUp = function() {
      return true;
    };

    IonStorm.prototype.blowUp = function() {
      this.isActive = false;
      return this.envCtx.rmObj(this);
    };

    return IonStorm;

  })(app.Object);

}).call(this);
