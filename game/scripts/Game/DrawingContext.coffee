window.app = window.app ? {}
app = window.app


class app.DrawingContext extends app.Module
	@extend (app.AssetLoader)


	constructor: (@ctx) ->

	width:() -> app.DrawingContext.width
	height:() ->  app.DrawingContext.height
	getAsset: (asset) -> app.DrawingContext.getAsset(asset)

	draw: (obj) ->
		try
			if obj? and obj.currentState?
				@ctx.putImageData(@getAsset(obj.currentState),obj.x*@width(),obj.y*@height())
		catch err
			console.log err+" for asset "+ obj.currentState

	clear: (x,y) ->
			@ctx.clearRect x*@width(),y*@height(),@width(),@height()
