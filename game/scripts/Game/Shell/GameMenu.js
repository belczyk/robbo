(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.GameMenu = (function() {

    function GameMenu(element) {
      var _this = this;
      this.element = element;
      this.selectGame = new app.SelectGameDialog($('.select-game-dialog'), function(g) {
        return _this.playGameSelected(g);
      });
      ko.applyBindings(this, this.element[0]);
    }

    GameMenu.prototype.playGame = function() {
      return this.selectGame.show();
    };

    GameMenu.prototype.playGameSelected = function(game) {
      return window.location.href = '/play/' + game.Id;
    };

    return GameMenu;

  })();

  $(function() {
    return new app.GameMenu($('.game-menu'));
  });

}).call(this);
