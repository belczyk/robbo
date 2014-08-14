window.app = window.app ? {}
app = window.app

class app.Collectable
	
	constructor: (@resourceName) ->
		
	collect: () ->
			@eventAggregator.publish "#{@resourceName}-collected",if @getCollectArgs? then @getCollectArgs() else null
			@eventAggregator.unsubscribe this
			@onCollect?()

	canStepOn: () -> true