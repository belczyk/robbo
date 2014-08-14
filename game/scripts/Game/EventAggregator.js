(function() {
  var Subscription, SubscriptionRoot, app, _ref,
    __slice = [].slice;

  window.app = (_ref = window.app) != null ? _ref : {};

  app = window.app;

  SubscriptionRoot = (function() {

    function SubscriptionRoot(event) {
      this.event = event;
      this.subscriptions = [];
    }

    SubscriptionRoot.prototype.add = function(callback, subscriber, predicate) {
      return this.subscriptions.push(new Subscription(callback, subscriber, predicate));
    };

    return SubscriptionRoot;

  })();

  Subscription = (function() {

    function Subscription(callback, subscriber, predicate) {
      this.callback = callback;
      this.subscriber = subscriber;
      this.predicate = predicate;
    }

    return Subscription;

  })();

  app.EventAggregator = (function() {

    function EventAggregator() {
      this.subscriptionRoots = [];
    }

    EventAggregator.prototype.subscribe = function(event, callback, subscriber, predicate) {
      var root, subscriptionRoot;
      subscriptionRoot = this.getRoot(event);
      if (subscriptionRoot === null) {
        root = new SubscriptionRoot(event);
        this.subscriptionRoots.push(root);
        return root.add(callback, subscriber, predicate);
      } else {
        return subscriptionRoot.add(callback, subscriber, predicate);
      }
    };

    EventAggregator.prototype.publish = function() {
      var args, event, sub, subscriptionRoot, _i, _len, _ref1;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      subscriptionRoot = this.getRoot(event);
      if (subscriptionRoot === null) {
        return;
      }
      _ref1 = subscriptionRoot.subscriptions;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        sub = _ref1[_i];
        if ((sub != null) && (!(sub.predicate != null) || sub.predicate.apply(sub.predicate, args))) {
          sub.callback.apply(sub.callback, args);
        }
      }
    };

    EventAggregator.prototype.unsubscribe = function(subscriber) {
      var i, root, sub, _i, _j, _len, _len1, _ref1, _ref2;
      _ref1 = this.subscriptionRoots;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        root = _ref1[_i];
        _ref2 = root.subscriptions;
        for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
          sub = _ref2[i];
          if ((sub != null) && (sub.subscriber === subscriber)) {
            root.subscriptions[i] = null;
          }
        }
        root.subscriptions = root.subscriptions.where(function(i) {
          return i != null;
        });
      }
    };

    EventAggregator.prototype.unsubscribeAll = function() {
      var i, root, sub, _i, _j, _len, _len1, _ref1, _ref2;
      _ref1 = this.subscriptionRoots;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        root = _ref1[_i];
        _ref2 = root.subscriptions;
        for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
          sub = _ref2[i];
          delete root.subscriptions[i];
        }
      }
    };

    EventAggregator.prototype.getRoot = function(event) {
      return this.subscriptionRoots.single(function(s) {
        return s.event === event;
      });
    };

    return EventAggregator;

  })();

}).call(this);
