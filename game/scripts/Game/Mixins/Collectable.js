(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Collectable = (function() {

    function Collectable(resourceName) {
      this.resourceName = resourceName;
    }

    Collectable.prototype.collect = function() {
      this.eventAggregator.publish("" + this.resourceName + "-collected", this.getCollectArgs != null ? this.getCollectArgs() : null);
      this.eventAggregator.unsubscribe(this);
      return typeof this.onCollect === "function" ? this.onCollect() : void 0;
    };

    Collectable.prototype.canStepOn = function() {
      return true;
    };

    return Collectable;

  })();

}).call(this);
