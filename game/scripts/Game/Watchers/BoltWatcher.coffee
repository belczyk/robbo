window.app = window.app ? {}
app = window.app

class app.BoltWatcher
	constructor: (@eventAggregator) ->
		@count = 0
		@eventAggregator.subscribe 'bolt-collected', 
									(() =>if @count>0
											@count-- 
											@update()),
									this
		@eventAggregator.subscribe 'starting-number-of-bolts', 
									((n) => @count=n; @update()),
									this
		@setText()

	update: () ->
		@setText()
		if @count == 0
			@eventAggregator.publish 'all-bolts-collected'

	setText: () ->
		$('.bolts-left').text @count