window.app = window.app ? {}
app = window.app

class app.Blowable
	
	constructor: () ->
	
	canBlowUp: () ->
		true
	blast: () ->
		if @onBlowUp?
			@onBlowUp()

	blowUp: () ->	
		@isActive = false
		@envCtx.sound 'destruction'
		
		smoke = new app.Smoke(@envCtx,@x,@y)
		@envCtx.putObj smoke
		smoke.init()
		@envCtx.eventAggregator.unsubscribe this
		@envCtx.unregisterRandomCalls this
		if @onBlowUp?
			@onBlowUp()
		
