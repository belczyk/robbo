(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.ScrollWatcher = (function() {

    function ScrollWatcher(envCtx, eventAggregator, canvas) {
      var _this = this;
      this.envCtx = envCtx;
      this.eventAggregator = eventAggregator;
      this.canvas = canvas;
      this.topY = 0;
      this.leftX = 0;
      this.span = 16;
      this.step = 3;
      this.threshold = 2;
      this.tailHeight = 32;
      this.tailWidth = 32;
      this.scrollDelay = 60;
      this.eventAggregator.subscribe('level-started', function() {
        return _this.onLevelStarted();
      });
      this.eventAggregator.subscribe('robbo-moved', (function(x, y, d) {
        return _this.scroll(x, y, d);
      }), this);
      this.eventAggregator.subscribe('robbo-teleported', (function(x, y) {
        return _this.scrollTo(x, y, {});
      }), this);
      this.eventAggregator.subscribe('level-restarted', (function() {
        return _this.onLevelStarted();
      }), this);
      this.envCtx.eventAggregator.subscribe('level-up', (function(x, y) {
        _this.canvas.css({
          'margin-top': 0,
          'margin-left': 0
        });
        _this.topY = 0;
        return _this.leftX = 0;
      }), this);
    }

    ScrollWatcher.prototype.onLevelStarted = function() {
      var robbo;
      robbo = this.envCtx.getRobbo();
      robbo.canMove = false;
      this.mapHeight = this.canvas.height() / this.tailHeight;
      this.mapWidth = this.canvas.width() / this.tailWidth;
      return this.scrollTo(robbo.x, robbo.y, robbo);
    };

    ScrollWatcher.prototype.scrollTo = function(x, y, robbo) {
      var dx, dy, step, toScrollX, toScrollY;
      toScrollY = 0;
      toScrollX = 0;
      if (y > this.span - this.threshold) {
        toScrollY = Math.ceil(((y - this.span) + this.threshold * 2) / this.step);
      }
      if (x > this.span - this.threshold) {
        toScrollX = Math.ceil(((x - this.span) + this.threshold * 2) / this.step);
      }
      this.leftX = toScrollX * this.step;
      this.topY = toScrollY * this.step;
      dx = Math.abs(this.leftX - x);
      dy = Math.abs(this.topY - y);
      step = Math.ceil(Math.sqrt(dx * dx * dy * dy)) / this.step;
      if (toScrollY > 0 || toScrollX > 0) {
        return this.canvas.animate({
          'margin-top': toScrollY * -this.tailHeight * this.step,
          'margin-left': toScrollX * -this.tailWidth * this.step
        }, this.scrollDelay * step, function() {
          return robbo.canMove = true;
        });
      } else {
        return robbo.canMove = true;
      }
    };

    ScrollWatcher.prototype.scroll = function(x, y, d) {
      if (d.dy() > 0 && y >= this.topY + this.span - this.threshold) {
        this.scrollDownBy(this.step);
      } else if (y === this.topY + this.threshold - 1) {
        this.scrollUpBy(this.step);
      }
      if (d.dx() > 0 && x >= this.leftX + this.span - this.threshold) {
        return this.scrollRightBy(this.step);
      } else if (x === this.leftX + this.threshold - 1) {
        return this.scrollLeftBy(this.step);
      }
    };

    ScrollWatcher.prototype.scrollDownBy = function(step, delay, whenFinish) {
      if (step == null) {
        step = this.step;
      }
      if (delay == null) {
        delay = this.scrollDelay;
      }
      if (this.topY + this.span >= this.mapHeight) {
        return;
      }
      if (this.topY + this.step + this.span > this.mapHeight) {
        step -= (this.topY + this.span + this.step) - this.mapHeight;
      }
      this.topY += step;
      return this.canvas.animate({
        'margin-top': this.topY * -this.tailHeight
      }, delay * step, function() {
        return typeof whenFinish === "function" ? whenFinish() : void 0;
      });
    };

    ScrollWatcher.prototype.scrollUpBy = function(step, delay, whenFinish) {
      if (step == null) {
        step = this.step;
      }
      if (delay == null) {
        delay = this.scrollDelay;
      }
      if (this.topY === 0) {
        return;
      }
      if (this.topY - step < 0) {
        step += this.topY - step;
      }
      this.topY -= step;
      return this.canvas.animate({
        'margin-top': this.topY * -this.tailHeight
      }, this.scrollDelay * step);
    };

    ScrollWatcher.prototype.scrollRightBy = function(step, delay, whenFinish) {
      if (step == null) {
        step = this.step;
      }
      if (delay == null) {
        delay = this.scrollDelay;
      }
      if (this.leftX + this.span >= this.mapWidth) {
        return;
      }
      if (this.leftX + this.step + this.span > this.mapWidth) {
        step -= (this.leftX + this.span + this.step) - this.mapWidth;
      }
      this.leftX += step;
      return this.canvas.animate({
        'margin-left': this.leftX * -this.tailWidth
      }, delay * step, function() {
        return typeof whenFinish === "function" ? whenFinish() : void 0;
      });
    };

    ScrollWatcher.prototype.scrollLeftBy = function(step, delay, whenFinish) {
      if (step == null) {
        step = this.step;
      }
      if (delay == null) {
        delay = this.scrollDelay;
      }
      if (this.leftX === 0) {
        return;
      }
      if (this.leftX - step < 0) {
        step += this.leftX - step;
      }
      this.leftX -= step;
      return this.canvas.animate({
        'margin-left': this.leftX * -this.tailWidth
      }, this.scrollDelay * step);
    };

    return ScrollWatcher;

  })();

}).call(this);