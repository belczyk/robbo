// Generated by CoffeeScript 1.7.1
(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.GameLoader = (function() {
    GameLoader.loadGamesConfig = function() {
      var game, gamesList, i, _i, _len, _ref1;
      gamesList = $('.games');
      gamesList.find('option').remove();
      _ref1 = app.Universe.games;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        game = _ref1[i];
        gamesList.append($('<option></option>').attr('value', game.index).text(game.name));
      }
      app.GameLoader.reloadPlanets();
    };

    GameLoader.reloadPlanets = function() {
      var i, planet, planetsList, _i, _len, _ref1;
      planetsList = $('.planets');
      planetsList.find('option').remove();
      _ref1 = this.currentGame().planets;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        planet = _ref1[i];
        planetsList.append($('<option></option>').attr('value', planet.index).text(planet.name));
      }
      return planetsList.change();
    };

    GameLoader.currentGame = function() {
      return app.Universe.games.single(function(g) {
        return g.index.toString() === app.GameLoader.currentGameIndex();
      });
    };

    GameLoader.currentGameIndex = function() {
      return $('.games').val();
    };

    GameLoader.currentPlanetIndex = function() {
      return $('.planets').val();
    };

    function GameLoader() {
      this.gamesList = $('.games');
      this.planetsList = $('.planets');
      this.gamesList.change((function(_this) {
        return function() {
          return app.GameLoader.reloadPlanets();
        };
      })(this));
      app.GameLoader.loadGamesConfig();
      $('button.play').click((function(_this) {
        return function() {
          return _this.startGame();
        };
      })(this));
      this.setRequestedPlanet();
      this.startGame();
    }

    GameLoader.prototype.startGame = function() {
      var game;
      game = app.GameLoader.currentGame();
      return new app.Game($('.game-board'), game, this.planetsList, app.GameLoader.currentPlanetIndex());
    };

    GameLoader.prototype.setRequestedPlanet = function() {
      var planet, vars;
      vars = this.getParams();
      if ((vars["game"] != null)) {
        this.gamesList.val(vars["game"]);
      }
      if ((vars["planet"] != null)) {
        planet = this.planetsList.val(vars["planet"]);
        return this.startGame();
      }
    };

    GameLoader.prototype.getParams = function() {
      var key, params, query, raw_vars, v, val, _i, _len, _ref1;
      query = window.location.search.substring(1);
      raw_vars = query.split("&");
      params = {};
      for (_i = 0, _len = raw_vars.length; _i < _len; _i++) {
        v = raw_vars[_i];
        _ref1 = v.split("="), key = _ref1[0], val = _ref1[1];
        params[key] = decodeURIComponent(val);
      }
      return params;
    };

    return GameLoader;

  })();

}).call(this);
