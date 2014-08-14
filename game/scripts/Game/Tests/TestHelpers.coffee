
window.app = window.app ? {}
app = window.app

app.TestHelper = 
	getEnvCtx: (width,height) -> 
		env = new app.EnvironmentContext new app.EventAggregator(),{ draw: (()->), clear: (()->) },{delay: (time,fun) ->fun()}

		if (width? and height?)
			env.initMap width,height
		env.registerRandomCall = ()->
		env.unregisterRandomCalls = () ->
		env.sound = () ->
		env
		
	callNTimes : (n,action) ->
		n ?= 1
		for i in [0..n-1]
			action()
		return

	publishArrowDown: (envCtx,direction,count) ->
		switch direction
			when 'left'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 37, direction: 'left'}
			when 'up'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 38, direction: 'up'}
			when 'right'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 39, direction: 'right'}
			when 'down'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 40, direction: 'down'}

	publishArrowDownCtrl: (envCtx,direction,count) ->
		switch direction
			when 'left'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 37, direction: 'left',ctrl:true}
			when 'up'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 38, direction: 'up',ctrl:true}
			when 'right'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 39, direction: 'right',ctrl:true}
			when 'down'
				@callNTimes count,()->  envCtx.eventAggregator.publish "arrow-down", {keyCode: 40, direction: 'down',ctrl:true}