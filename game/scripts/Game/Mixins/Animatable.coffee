window.app = window.app ? {}
app = window.app

class app.Animation
	
	constructor: (@name,@states,@interval) ->
		@currentState = 0

	animate: (obj) ->
		if not obj.isActive then return
		obj.setCurrentState( @states[@currentState])

		@currentState++
		if (@currentState>=	 @states.length)
			@currentState = 0
		setTimeout((() => @animate(obj)),@interval)
		
class app.Animatable
	isActive: true

	constructor: () ->

	animate: (name) ->
			anim = @animations.single (a) -> a.name == name
			anim.animate(this)
