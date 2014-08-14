(function() {
  var $, Editor, app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  $ = jQuery;

  Editor = (function() {

    function Editor() {
      var height, width,
        _this = this;
      this.setupMenu();
      new app.ColorManager($('#constructionyard'), function() {});
      this.canvas = $('#constructionyard');
      this.cursorCanvas = $('#currentcell');
      this.toolCanvas = $('#currenttool');
      this.scrollPane = $('.scroll-panel');
      width = 16;
      height = 32;
      this.assets = app.AssetLoader;
      this.setHeight(32);
      this.setWidth(16);
      this.cursorCanvas.mousemove(function(e) {
        return _this.onMouseMoveInCanvas(e);
      });
      this.cursorCtx = this.cursorCanvas.get(0).getContext('2d');
      this.toolCtx = this.toolCanvas.get(0).getContext('2d');
      this.mainCtx = this.canvas.get(0).getContext('2d');
      this.setupDocumentEvents();
      this.setupMouseWheel();
      this.setupToolbar();
      this.setupClick();
      this.selectGame = new app.SelectGameDialog($('.select-game-dialog'), function(i) {
        return alert(i.Name);
      });
      $('.open-select-game').click(function() {
        return _this.selectGame.show();
      });
    }

    Editor.prototype.onMouseMoveInCanvas = function(e) {
      this.x = Math.floor((e.pageX - this.cursorCanvas.offset().left) / 32.0);
      this.y = Math.floor((e.pageY - this.cursorCanvas.offset().top) / 32.0);
      this.cursorCtx.lineWidth = 1;
      this.cursorCtx.strokeStyle = 'white';
      this.cursorCtx.clearRect(0, 0, this.cursorCanvas.width(), this.cursorCanvas.height());
      this.cursorCtx.strokeRect(this.x * 32, this.y * 32, 32, 32);
      this.drawToolIcon();
      if (this.isLeftDown) {
        this.drawCurrentToolOnCanvas(this.x, this.y);
      }
      if (this.isRightDown) {
        return this.removeTail();
      }
    };

    Editor.prototype.setupMenu = function() {};

    Editor.prototype.drawCurrentToolOnCanvas = function(x, y) {
      var asset;
      if (!(this.selectedTool != null)) {
        return;
      }
      asset = this.assets.getAsset(this.selectedToolIcon);
      return this.mainCtx.putImageData(asset, x * 32, y * 32);
    };

    Editor.prototype.drawToolIcon = function() {
      var asset;
      if (!(this.selectedTool != null)) {
        return;
      }
      this.toolCtx.clearRect(0, 0, this.toolCanvas.width(), this.toolCanvas.height());
      asset = this.assets.getAsset(this.selectedToolIcon);
      return this.toolCtx.putImageData(asset, this.x * 32, this.y * 32);
    };

    Editor.prototype.setHeight = function(val) {
      this.height = val;
      this.canvas.attr('height', val * 32);
      this.toolCanvas.attr('height', val * 32);
      return this.cursorCanvas.attr('height', val * 32);
    };

    Editor.prototype.setWidth = function(val) {
      var w;
      this.width = val;
      this.canvas.attr('width', val * 32);
      this.toolCanvas.attr('width', val * 32);
      this.cursorCanvas.attr('width', val * 32);
      w = (val * 32) + 20;
      if (w > 800) {
        w = 800;
      }
      return this.scrollPane.css('width', w + 'px');
    };

    Editor.prototype.setupDocumentEvents = function() {
      var _this = this;
      this.isLeftDown = false;
      this.isRightDown = false;
      $('body').attr('onContextMenu', 'return false');
      $(document).mousedown(function(e) {
        if (event.which === 1) {
          _this.isLeftDown = true;
        }
        if (event.which === 3) {
          return _this.isRightDown = true;
        }
      });
      return $(document).mouseup(function(e) {
        if (event.which === 1) {
          _this.isLeftDown = false;
        }
        if (event.which === 3) {
          return _this.isRightDown = false;
        }
      });
    };

    Editor.prototype.setupToolbar = function() {
      var _this = this;
      return $('.tool').click(function(e, item) {
        $('.tool').removeClass('selected');
        $(e.target).parent().addClass('selected');
        _this.selectedTool = $(e.target);
        return _this.selectedToolIcon = _this.selectedTool.data('tool-icon');
      });
    };

    Editor.prototype.setupMouseWheel = function() {
      var _this = this;
      return $('.editor').mousewheel(function(e, delta) {
        var editor;
        editor = _this;
        $('.tool').each(function(i, e) {
          var curr, imgs;
          imgs = $(this).find('img');
          if (imgs.size() === 1) {
            return;
          }
          curr = -1;
          imgs.each(function(j, img) {
            if ($(img).hasClass('curr')) {
              return curr = j;
            }
          });
          if (delta < 0) {
            curr++;
          } else {
            curr--;
          }
          if (curr < 0) {
            curr = imgs.size() - 1;
          }
          if (curr === imgs.size()) {
            curr = 0;
          }
          imgs.removeClass('curr');
          $(imgs[curr]).addClass('curr');
          if ($(e).hasClass('selected')) {
            editor.selectedTool = $(imgs[curr]);
            return editor.selectedToolIcon = $(imgs[curr]).data('tool-icon');
          }
        });
        _this.drawToolIcon(_this.x, _this.y);
        return false;
      });
    };

    Editor.prototype.setupClick = function() {
      var _this = this;
      this.cursorCanvas.mousedown(function(e) {
        if (event.which === 1) {
          return _this.drawCurrentToolOnCanvas(_this.x, _this.y);
        } else if (event.which === 3) {
          if (_this.selectedTool != null) {
            return _this.deselectTool();
          } else {
            return _this.removeTail(_this.x, _this.y);
          }
        }
      });
      this.cursorCanvas.mouseout(function(e) {
        var leftDown, rightDown;
        leftDown = false;
        return rightDown = false;
      });
    };

    Editor.prototype.deselectTool = function() {
      this.toolCtx.clearRect(0, 0, this.toolCanvas.width(), this.toolCanvas.height());
      $('.tool.selected').removeClass('selected');
      this.selectedTool = null;
      return this.selectedToolIcon = null;
    };

    Editor.prototype.removeTail = function(x, y) {
      if (!(this.selectedTool != null)) {
        return this.mainCtx.clearRect(this.x * 32, this.y * 32, 32, 32);
      }
    };

    return Editor;

  })();

  $(function() {
    return new Editor();
  });

}).call(this);
