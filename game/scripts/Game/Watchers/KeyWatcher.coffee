window.app = window.app ? {}
app = window.app

class app.KeyWatcher
	count: 0
	constructor: (@eventAggregator) ->
		@eventAggregator.subscribe 'key-collected', 
									(() => @count++;@setText()),
									this
		@eventAggregator.subscribe 'key-used', 
									(() => @count--;@setText()),
									this
		@eventAggregator.subscribe 'restart-level',(()=>@count=0;@setText()),this
		@setText()

	setText: () ->
		$('.keys-left').text @count