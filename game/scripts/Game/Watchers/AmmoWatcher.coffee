window.app = window.app ? {}
app = window.app

class app.AmmoWatcher
	count: 0
	constructor: (@eventAggregator) ->
		@eventAggregator.subscribe 'ammo-collected', 
									((count) =>@count+=count;@setText()),
									this
		@eventAggregator.subscribe 'ammo-used', 
									(() => @count--;@setText()),
									this
		@eventAggregator.subscribe 'restart-level',(()=>@count=0;@setText()),this
		@setText()

		

	setText: () ->
		$('.ammo-left').text @count