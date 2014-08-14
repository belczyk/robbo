window.app = window.app ? {}
app = window.app

class app.LiveWatcher
	constructor: (@count,@eventAggregator) ->
		@eventAggregator.subscribe 'live-collected', 
									(() =>@count++; @update()),
									this
		@eventAggregator.subscribe 'robbo-destroyed', 
									(() =>@count--; @update()),
									this
		@setText()

	update: () ->
		@setText()
		if @count == 0
			@eventAggregator.publish 'game-over'

	setText: () ->
		$('.lives-left').text @count