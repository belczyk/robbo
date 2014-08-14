(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.GameVM = (function() {

    function GameVM(name, worldCount, Id) {
      this.Id = Id;
      this.Name = ko.observable(name);
      this.WorldCount = ko.observable(worldCount);
      this.Selected = ko.observable(false);
    }

    GameVM.prototype.select = function() {
      this.deselectAll();
      return this.Selected(!this.Selected());
    };

    return GameVM;

  })();

  app.SelectGameDialog = (function() {

    function SelectGameDialog(element, callback) {
      this.element = element;
      this.callback = callback;
      this.IsLoading = ko.observable(true);
      this.Games = ko.observableArray();
      ko.applyBindings(this, this.element[0]);
    }

    SelectGameDialog.prototype.onDialogClose = function(anySelected) {
      return this.modal.dialog('close');
    };

    SelectGameDialog.prototype.show = function() {
      var _this = this;
      this.IsLoading(true);
      this.element.modal('show');
      this.Games.removeAll();
      return $.get('/api/game', function(data) {
        _this.addAll(data);
        return _this.IsLoading(false);
      });
    };

    SelectGameDialog.prototype.addAll = function(games) {
      var game, gameVm, _i, _len,
        _this = this;
      for (_i = 0, _len = games.length; _i < _len; _i++) {
        game = games[_i];
        gameVm = new app.GameVM(game.Name, game.WorldCount, game.Id);
        gameVm.deselectAll = function() {
          return _this.deselectAll(gameVm);
        };
        this.Games.push(gameVm);
      }
    };

    SelectGameDialog.prototype.deselectAll = function() {
      var game, _i, _len, _ref1, _results;
      _ref1 = this.Games();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        game = _ref1[_i];
        _results.push(game.Selected(false));
      }
      return _results;
    };

    SelectGameDialog.prototype.saveChanges = function() {
      var selectedGame;
      this.element.modal('show');
      selectedGame = this.Games().single(function(g) {
        return g.Selected();
      });
      return this.callback(ko.toJS(selectedGame));
    };

    return SelectGameDialog;

  })();

}).call(this);
