(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.LevelManger = (function() {

    function LevelManger(levels, gameBoard) {
      this.levels = levels;
      this.gameBoard = gameBoard;
      this.lives = app.Predef.Game.lives;
      this.currentLevel = 1;
    }

    LevelManger.prototype.setupCanvas = function() {
      this.canvas = $('<canvas></canvas>');
      this.gameBoard.html('');
      this.gameBoard.append(this.canvas);
      return this.canvasContext2D = this.canvas.get(0).getContext('2d');
    };

    LevelManger.prototype.setupLevel = function() {
      this.setupCanvas();
      this.eventAggregator = new app.EventAggregator();
      this.drawingCtx = new app.DrawingContext(this.canvasContext2D);
      this.keyboardWatcher = new app.KeyboardWatcher(this.eventAggregator);
      this.timer = new app.TimeDelayedMethodCall;
      this.envCtx = new app.EnvironmentContext(this.eventAggregator, this.drawingCtx, this.timer);
      this.mapLoader = new app.MapLoader(this.envCtx, this.canvas);
      this.effectManager = new app.MapEffects(this.canvas, this.envCtx);
      this.setupWatchers();
      this.subscribeToEvents();
      return this.envCtx.eventAggregator.publish('load-level', this.levels[this.currentLevel - 1]);
    };

    LevelManger.prototype.setupWatchers = function() {
      this.scrollWatcher = new app.ScrollWatcher(this.envCtx, this.eventAggregator, this.canvas);
      this.boltWatcher = new app.BoltWatcher(this.eventAggregator);
      this.keyWatcher = new app.KeyWatcher(this.eventAggregator);
      this.liveWatcher = new app.LiveWatcher(this.lives, this.eventAggregator);
      return this.ammoWatcher = new app.AmmoWatcher(this.eventAggregator);
    };

    LevelManger.prototype.subscribeToEvents = function() {
      var _this = this;
      this.envCtx.eventAggregator.subscribe('robbo-destroyed', (function() {
        return _this.onRobboDestroyed();
      }));
      this.envCtx.eventAggregator.subscribe('level-loaded', (function() {
        return _this.onLevelStarts();
      }));
      this.envCtx.eventAggregator.subscribe('level-up', (function() {
        return _this.onLevelUp();
      }));
      return this.eventAggregator.subscribe('live-collected', (function() {
        return _this.lives++;
      }));
    };

    LevelManger.prototype.startGame = function() {
      return this.setupLevel();
    };

    LevelManger.prototype.onLevelUp = function() {
      this.envCtx.eventAggregator.unsubscribeAll();
      this.timer.resetToken();
      this.currentLevel++;
      return this.setupLevel();
    };

    LevelManger.prototype.onLevelStarts = function() {
      this.envCtx.eventAggregator.publish('level-started');
      return this.envCtx.sound('level-starts');
    };

    LevelManger.prototype.onRobboDestroyed = function() {
      var explosionCallback,
        _this = this;
      this.lives--;
      explosionCallback = function() {
        var obj, smoke, x, y, _i, _j, _ref1, _ref2;
        _this.envCtx.sound('explosion');
        for (y = _i = 0, _ref1 = _this.envCtx.height - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; y = 0 <= _ref1 ? ++_i : --_i) {
          for (x = _j = 0, _ref2 = _this.envCtx.width - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; x = 0 <= _ref2 ? ++_j : --_j) {
            obj = _this.envCtx.getObjAt(x, y);
            if ((obj != null) && _this.envCtx.getObjName(obj) !== 'Smoke' && ((typeof obj.canBlowUp === "function" ? obj.canBlowUp() : void 0) || (typeof obj.canBombBlowUp === "function" ? obj.canBombBlowUp() : void 0))) {
              obj.isActive = false;
              smoke = new app.Smoke(_this.envCtx, obj.x, obj.y);
              _this.envCtx.putObj(smoke);
              _this.envCtx.eventAggregator.unsubscribe(obj);
              _this.envCtx.unregisterRandomCalls(obj);
              smoke.init();
            }
          }
        }
        return setTimeout((function() {
          return _this.envCtx.eventAggregator.publish('restart-level', _this.levels[_this.currentLevel - 1]);
        }), 2000);
      };
      return setTimeout(explosionCallback, 700);
    };

    return LevelManger;

  })();

}).call(this);
