window.app = window.app ? {}
app = window.app

class app.TimeDelayedMethodCall
	enabled: true

	constructor: () ->
		@randomCallers = []
		@resetToken()


	resetToken: () ->
		@currentToken = Math.uuid()
		console.log "new token: " +@currentToken

	delay: (time,fun) ->
		setTimeout((()=>@execute(fun,@currentToken)),time)

	execute: (fun,token)->
		try
			if (token==@currentToken)
				fun()
			else
				console.log 'canceled token'
		catch e
			console.log "error: token:#{token} currentToken:#{@currentToken}: #{e}"

	registerRandomCall: (obj,fun) ->
		@randomCallers.push {obj: obj, fun: fun, token: @currentToken}
		@randomTrigger obj,fun,@currentToken

	unregisterRandomCalls: (obj) ->
		for rCall,i in @randomCallers
			if rCall? and (rCall.obj==obj)
					 @randomCallers[i] = null
			 @randomCallers =  @randomCallers.where (i)->i?
		return


	randomTrigger: (obj,fun) ->
		
		rc = @randomCallers.single (c)-> c.obj==obj and c.fun==fun
		if (rc? and rc.token == @currentToken)
			time = app.Tools.getRand(1,15)*300
			callback = ()=>
								rc = @randomCallers.single (c)-> c.obj==obj and c.fun==fun
								if (rc? and rc.token == @currentToken)
									rc.fun()
									@randomTrigger(rc.obj,rc.fun)
								else
									console.log 'subscribtion token canceled'
			setTimeout((()=>callback()),time)	
		else
			console.log 'subscribtion token canceled '


		

	