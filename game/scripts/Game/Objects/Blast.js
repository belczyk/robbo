(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.BlastPart = (function(_super) {

    __extends(BlastPart, _super);

    function BlastPart(envCtx, x, y, asset) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      BlastPart.__super__.constructor.call(this, asset);
    }

    return BlastPart;

  })(app.Object);

  app.Blast = (function() {

    function Blast(envCtx, x, y, direction) {
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.elements = [];
      this.isBlastActive = false;
      this.toEmit = [4, 3, 2, 1, 2, 3, 4];
      this.delay = app.Predef.Blast.movementDelay;
      this.emiting = true;
      this.blastDelta = app.Delta.fromDirection(this.direction);
    }

    Blast.prototype.emit = function() {
      var i, part, toemit, _i, _ref1;
      toemit = this.toEmit.where(function(p) {
        return p != null;
      });
      this.emiting = toemit.length > 0;
      if (!this.emiting) {
        return;
      }
      part = new app.BlastPart(this.envCtx, this.x, this.y, "smoke-" + (toemit.first()));
      for (i = _i = 0, _ref1 = this.toEmit.length - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        if (this.toEmit[i] != null) {
          this.toEmit[i] = null;
          break;
        }
      }
      this.elements.push(part);
      return this.envCtx.putObj(part);
    };

    Blast.prototype.init = function() {
      var _this = this;
      this.isBlastActive = true;
      return this.envCtx.delay(this.delay, function() {
        return _this.moveOneStep();
      });
    };

    Blast.prototype.moveOneStep = function() {
      var i, objAhead, part, _i, _ref1,
        _this = this;
      for (i = _i = 0, _ref1 = this.elements.length - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        part = this.elements[i];
        if (!(part != null)) {
          continue;
        }
        objAhead = this.envCtx.getObjAt(this.blastDelta.x(part.x), this.blastDelta.y(part.y));
        if ((this.stopAt != null) && this.stopAt[0] === part.x && this.stopAt[1] === part.y) {
          this.envCtx.rmObj(part);
          this.elements[i] = null;
        } else if (objAhead === null) {
          this.envCtx.moveObjByD(part.x, part.y, this.blastDelta);
        } else if (this.envCtx.getObjName(objAhead) === 'LaserBeam' || ((objAhead.disturbsBlast != null) && objAhead.disturbsBlast)) {
          this.stopAt = [part.x, part.y];
          this.envCtx.rmObj(part);
          this.elements[i] = null;
        } else if (typeof objAhead.canBlowUp === "function" ? objAhead.canBlowUp() : void 0) {
          objAhead.isActive = false;
          this.envCtx.unregisterRandomCalls(objAhead);
          this.envCtx.eventAggregator.unsubscribe(objAhead);
          if (typeof objAhead.blast === "function") {
            objAhead.blast();
          }
          this.envCtx.moveObjByD(part.x, part.y, this.blastDelta);
        } else {
          this.envCtx.rmObj(part);
          this.elements[i] = null;
        }
      }
      if (this.emiting) {
        this.emit();
      }
      if (this.elements.where(function(p) {
        return p != null;
      }).length > 0) {
        return this.envCtx.delay(this.delay, function() {
          return _this.moveOneStep();
        });
      }
    };

    return Blast;

  })();

}).call(this);
