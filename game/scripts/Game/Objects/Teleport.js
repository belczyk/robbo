(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Teleport = (function(_super) {

    __extends(Teleport, _super);

    Teleport.include(new app.Animatable());

    Teleport.include(new app.Bombblowable());

    function Teleport(envCtx, x, y, number, seqNum) {
      var _this = this;
      this.envCtx = envCtx;
      this.x = x;
      this.y = y;
      this.number = number;
      this.seqNum = seqNum;
      Teleport.__super__.constructor.call(this, 'teleport-d');
      this.deltas = new app.RingArray([[0, -1], [1, 0], [0, 1], [-1, 0]]);
      this.siblings = new app.RingArray();
      this.eventAggregator.subscribe('robbo-moving', (function(x, y, delta) {
        return _this.teleport(delta);
      }), this, function(x, y) {
        return x === _this.x && y === _this.y;
      });
      this.eventAggregator.subscribe('teleport-receive', (function(number, seqNum, delta, origin, robbo) {
        return _this.receive(delta, origin, robbo);
      }), this, function(number, seqNum) {
        return number === _this.number && seqNum === _this.seqNum;
      });
      this.eventAggregator.subscribe('teleport-destroyed', (function(number, seqNum) {
        return _this.onTeleportDestroyed(seqNum);
      }), this, function(number) {
        return number === _this.number;
      });
      this.eventAggregator.subscribe('teleport-powered-up', (function(number, seqNum) {
        return _this.onTeleportPoweredUp(seqNum);
      }), this, function(number, seqNum) {
        return number === _this.number;
      });
    }

    Teleport.prototype.onTeleportPoweredUp = function(seqNum) {
      return this.siblings.push(seqNum);
    };

    Teleport.prototype.onTeleportDestroyed = function(seqNum) {
      var _this = this;
      return this.siblings.popWhere(function(i) {
        return i === seqNum;
      });
    };

    Teleport.prototype.receive = function(delta, origin, robbo) {
      var newX, newY, obj;
      if (origin !== this.seqNum && !this.canReceive()) {
        this.eventAggregator.publish('teleport-receive', this.number, this.siblings.getNextTo(this.seqNum), delta, origin, robbo);
        return;
      }
      newX = delta.x(this.x);
      newY = delta.y(this.y);
      obj = this.envCtx.getObjAt(newX, newY);
      if (obj === null) {
        return this.materialize(robbo, newX, newY);
      } else {
        return this.receive(new app.Delta(this.deltas.getNextTo(delta.coords, function(i1, i2) {
          return i1[0] === i2[0] && i1[1] === i2[1];
        })), origin, robbo);
      }
    };

    Teleport.prototype.canReceive = function() {
      var available, delta, i, _i;
      available = 0;
      for (i = _i = 0; _i <= 3; i = ++_i) {
        delta = new app.Delta(this.deltas.get(i));
        if ((this.envCtx.getObjAtD(this, delta)) === null) {
          available++;
        }
      }
      return available > 0;
    };

    Teleport.prototype.materialize = function(robbo, x, y) {
      var blink,
        _this = this;
      robbo.x = x;
      robbo.y = y;
      this.eventAggregator.publish('robbo-teleported', x, y);
      blink = new app.Blink(this.envCtx, robbo.x, robbo.y, -1, function() {
        _this.envCtx.putObj(robbo);
        return robbo.activate();
      });
      return blink.init();
    };

    Teleport.prototype.init = function() {
      this.animations = [new app.Animation('teleport', ['teleport-a', 'teleport-d'], app.Predef.Teleport.animationDelay)];
      this.animate('teleport');
      return this.eventAggregator.publish('teleport-powered-up', this.number, this.seqNum);
    };

    Teleport.prototype.onBlowUp = function() {
      this.eventAggregator.publish('teleport-destroyed', this.number, this.seqNum);
      return this.eventAggregator.unsubscribe(this);
    };

    Teleport.prototype.teleport = function(delta) {
      var robbo,
        _this = this;
      robbo = this.envCtx.getRobbo();
      robbo.deactivate();
      this.dematerialize(robbo, function() {
        return _this.eventAggregator.publish('teleport-receive', _this.number, _this.siblings.getNextTo(_this.seqNum), delta, _this.seqNum, robbo);
      });
      return this.envCtx.sound('teleport');
    };

    Teleport.prototype.dematerialize = function(robbo, callback) {
      var blink;
      blink = new app.Blink(this.envCtx, robbo.x, robbo.y, 1, callback);
      this.envCtx.setObjAt(robbo.x, robbo.y, blink);
      return blink.init();
    };

    return Teleport;

  })(app.Object);

}).call(this);
