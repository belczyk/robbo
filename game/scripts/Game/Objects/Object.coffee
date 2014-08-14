window.app = window.app ? {}
app = window.app

class app.Object extends app.Module
	constructor: (@currentState) ->
		@eventAggregator = @envCtx.eventAggregator
	
	setCurrentState: (currentState) ->
		@currentState=currentState
		@envCtx.objChangedState this
