window.app = window.app ? {}
app = window.app

class app.Multistate 
	constructor: () ->

	changeState: (args...) ->
			if not @stateSelector? then return
			args.push @currentState
			newState = @stateSelector.apply @stateSelector, args
			@setCurrentState(newState)
