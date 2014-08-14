window.app = window.app ? {}
app = window.app

class SubscriptionRoot
	constructor: (@event) ->
		@subscriptions = []
	add: (callback,subscriber,predicate) ->
		@subscriptions.push new Subscription(callback,subscriber,predicate)

class Subscription
	constructor: (@callback,@subscriber,@predicate) ->

class app.EventAggregator
	constructor: ->
		@subscriptionRoots = []

	subscribe: (event,callback,subscriber,predicate) ->
		subscriptionRoot = @getRoot(event)
		if subscriptionRoot is null
			root =new SubscriptionRoot(event)
			@subscriptionRoots.push root
			root.add callback,subscriber, predicate
		else 
			subscriptionRoot.add callback,subscriber,predicate

	publish: (event,args...) ->
		#console.log event
		subscriptionRoot = @getRoot(event)
		return if subscriptionRoot == null 
		for sub in subscriptionRoot.subscriptions			
			if sub? and ( not sub.predicate? or sub.predicate.apply sub.predicate, args)
				sub.callback.apply sub.callback, args 
		return

	unsubscribe: (subscriber) ->
		for root in @subscriptionRoots
			for sub,i in root.subscriptions
				if sub? and (sub.subscriber==subscriber)
					root.subscriptions[i] = null
			root.subscriptions = root.subscriptions.where (i)->i?
		return

	unsubscribeAll: ()->
		for root in @subscriptionRoots
			for sub,i in root.subscriptions
					delete root.subscriptions[i]
		return
	getRoot: (event) ->
			@subscriptionRoots.single (s)->s.event==event