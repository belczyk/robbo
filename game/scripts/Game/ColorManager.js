(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.ColorTranslation = [
    {
      from: [162, 114, 64, 255],
      to: [102, 114, 64, 255]
    }, {
      from: [28, 39, 131, 255],
      to: [28, 39, 129, 255]
    }, {
      from: [16, 16, 16, 255],
      to: [16, 16, 16, 255]
    }, {
      from: [152, 152, 152, 255],
      to: [152, 152, 152, 255]
    }, {
      from: [0, 0, 0, 0],
      to: [0, 0, 0, 0]
    }, {
      from: [255, 255, 255, 255],
      to: [0, 0, 0, 0]
    }
  ];

  app.ColorManager = (function() {

    function ColorManager(canvas, redraw) {
      var bs, start,
        _this = this;
      this.redraw = redraw;
      bs = $('.background-color-selector');
      start = '#' + bs.attr('data-start-val');
      bs.css('background-color', start);
      bs.ColorPicker({
        color: bs.attr('data-start-val'),
        onSubmit: function(hsb, hex, rgb, el) {
          bs.css('background-color', '#' + hex);
          return canvas.css('background-color', '#' + hex);
        }
      });
      $('.color-selector').each(function(i, e) {
        var startVal;
        startVal = $(e).attr('data-start-val');
        $(e).css('background-color', "#" + startVal);
        return $(e).ColorPicker({
          color: "#" + startVal,
          onSubmit: function(hsb, hex, rgb, el) {
            var to;
            $(el).css('background-color', '#' + hex);
            to = app.ColorTranslation[$(el).attr('data-for')].to;
            to[0] = rgb.r;
            to[1] = rgb.g;
            to[2] = rgb.b;
            app.ColorTranslation.isChanged = true;
            return typeof _this.redraw === "function" ? _this.redraw() : void 0;
          }
        });
      });
    }

    return ColorManager;

  })();

}).call(this);
