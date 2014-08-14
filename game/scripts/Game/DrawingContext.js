(function() {
  var app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.DrawingContext = (function(_super) {

    __extends(DrawingContext, _super);

    DrawingContext.extend(app.AssetLoader);

    function DrawingContext(ctx) {
      this.ctx = ctx;
    }

    DrawingContext.prototype.width = function() {
      return app.DrawingContext.width;
    };

    DrawingContext.prototype.height = function() {
      return app.DrawingContext.height;
    };

    DrawingContext.prototype.getAsset = function(asset) {
      return app.DrawingContext.getAsset(asset);
    };

    DrawingContext.prototype.draw = function(obj) {
      try {
        if ((obj != null) && (obj.currentState != null)) {
          return this.ctx.putImageData(this.getAsset(obj.currentState), obj.x * this.width(), obj.y * this.height());
        }
      } catch (err) {
        return console.log(err + " for asset " + obj.currentState);
      }
    };

    DrawingContext.prototype.clear = function(x, y) {
      return this.ctx.clearRect(x * this.width(), y * this.height(), this.width(), this.height());
    };

    return DrawingContext;

  })(app.Module);

}).call(this);
