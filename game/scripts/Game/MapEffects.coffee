window.app = window.app ? {}
app = window.app

class app.MapEffects
	constructor: (@canvas,@envCtx) ->
		@envCtx.eventAggregator.subscribe 'thunder',(()=>@onThunder()) 
	
	
	
	onThunder: ()->
		bacground = @canvas.css 'background-color'
		
		@canvas.css 'background-color', 'white'
		setTimeout (()=> @canvas.css 'background-color', bacground),80
		@envCtx.sound 'thunder'
		