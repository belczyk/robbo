(function() {
  var app, _ref;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  app.Animation = (function() {

    function Animation(name, states, interval) {
      this.name = name;
      this.states = states;
      this.interval = interval;
      this.currentState = 0;
    }

    Animation.prototype.animate = function(obj) {
      var _this = this;
      if (!obj.isActive) {
        return;
      }
      obj.setCurrentState(this.states[this.currentState]);
      this.currentState++;
      if (this.currentState >= this.states.length) {
        this.currentState = 0;
      }
      return setTimeout((function() {
        return _this.animate(obj);
      }), this.interval);
    };

    return Animation;

  })();

  app.Animatable = (function() {

    Animatable.prototype.isActive = true;

    function Animatable() {}

    Animatable.prototype.animate = function(name) {
      var anim;
      anim = this.animations.single(function(a) {
        return a.name === name;
      });
      return anim.animate(this);
    };

    return Animatable;

  })();

}).call(this);
