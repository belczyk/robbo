// Generated by CoffeeScript 1.7.1
(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.RobboConstructor = (function() {
    function RobboConstructor(universe, gameDesigner) {
      this.gameDesigner = gameDesigner;
      this.assets = app.AssetLoader;
      this.canvas = $('#constructionyard');
      this.cursorCanvas = $('#currentcell');
      this.toolCanvas = $('#currenttool');
      this.cursorCtx = this.cursorCanvas.get(0).getContext('2d');
      this.toolCtx = this.toolCanvas.get(0).getContext('2d');
      this.mainCtx = this.canvas.get(0).getContext('2d');
      this.$map = $('.map');
      this.eventCtx = new app.EventAggregator();
      this.toolbar = new app.ConstructorToolbar(this.eventCtx);
      this.eventCtx.subscribe('selected-planet-changed', (function(_this) {
        return function(p) {
          return _this.changeMap(p);
        };
      })(this));
      this.games = app.Universe.games;
      this.gamesOptions = new app.GamesOptions(this.gameDesigner, this.games, this.eventCtx);
    }

    RobboConstructor.prototype.changeMap = function(planet) {
      this.mapWidth = planet.width;
      this.mapHeight = planet.height;
      this.map = planet.map;
      this.$map.val(planet.map);
      this.$map.attr("cols", planet.width * 3);
      this.$map.attr("rows", planet.height);
      this.setWidth();
      this.setHeight();
      return this.redrawMap();
    };

    RobboConstructor.prototype.redrawMap = function() {
      var line, lines, x, y, _i, _j, _ref1, _ref2;
      lines = this.map.split('\n');
      for (y = _i = 0, _ref1 = this.mapHeight - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; y = 0 <= _ref1 ? ++_i : --_i) {
        line = lines[y];
        line = line.replace(/[ ]/g, '.');
        for (x = _j = 0, _ref2 = this.mapWidth - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; x = 0 <= _ref2 ? ++_j : --_j) {
          this.draw(x, y, line.substring(x * 3, x * 3 + 3));
        }
      }
    };

    RobboConstructor.prototype.draw = function(x, y, sign) {
      var asset, assetName, e, tool;
      if (sign[0] === "_") {
        return;
      }
      this.mainCtx.clearRect(x * 32, y * 32, 32, 32);
      tool = $('[data-map="' + sign + '"]');
      try {
        assetName = tool.data('tool-icon');
        asset = app.AssetLoader.getAsset(assetName);
        return this.mainCtx.putImageData(asset, x * 32, y * 32);
      } catch (_error) {
        e = _error;
        console.log("Coudn't load asst for '" + sign + "'. Found asset name " + assetName + ". [" + x + "," + y + "]");
        return console.log(e);
      }
    };

    RobboConstructor.prototype.setWidth = function(val) {
      this.canvas.attr('width', this.mapWidth * 32);
      this.toolCanvas.attr('width', this.mapWidth * 32);
      return this.cursorCanvas.attr('width', this.mapWidth * 32);
    };

    RobboConstructor.prototype.setHeight = function(val) {
      this.canvas.attr('height', this.mapHeight * 32);
      this.toolCanvas.attr('height', this.mapHeight * 32);
      return this.cursorCanvas.attr('height', this.mapHeight * 32);
    };

    return RobboConstructor;

  })();

}).call(this);
