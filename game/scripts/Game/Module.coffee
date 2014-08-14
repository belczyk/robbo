window.app = window.app ? {}
app = window.app

moduleKeywords = ['extended', 'included']

class app.Module
	@extend: (obj) ->
		for key, value of obj when key not in moduleKeywords
			@[key] = value

		obj.extended?.apply(@)
		this

	@include: (obj) ->
		for key, value of obj when key not in moduleKeywords
			if key isnt 'constructor'
				@::[key] = value

		obj.included?.apply(@)
		this


