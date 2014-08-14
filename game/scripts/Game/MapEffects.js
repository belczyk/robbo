(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.MapEffects = (function() {

    function MapEffects(canvas, envCtx) {
      var _this = this;
      this.canvas = canvas;
      this.envCtx = envCtx;
      this.envCtx.eventAggregator.subscribe('thunder', (function() {
        return _this.onThunder();
      }));
    }

    MapEffects.prototype.onThunder = function() {
      var bacground,
        _this = this;
      bacground = this.canvas.css('background-color');
      this.canvas.css('background-color', 'white');
      setTimeout((function() {
        return _this.canvas.css('background-color', bacground);
      }), 80);
      return this.envCtx.sound('thunder');
    };

    return MapEffects;

  })();

}).call(this);
