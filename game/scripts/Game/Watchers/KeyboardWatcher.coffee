window.app = window.app ? {}
app = window.app

class app.KeyboardWatcher

	constructor: (@eventAggregator) ->
				$(document).keydown (e,ee) =>
					if 37<=e.keyCode<=40				
						switch e.keyCode
							when 37 then direction = 'left'
							when 38 then direction = 'up'
							when 39 then direction = 'right'
							when 40 then direction = 'down'
						@eventAggregator.publish "arrow-down", {keyCode: e.keyCode, direction: direction,ctrl: e.ctrlKey,shift: e.shiftKey}