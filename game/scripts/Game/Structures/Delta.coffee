window.app = window.app ? {}
app = window.app


class app.Delta 
	equals: (d) ->
		return this.dx()==d.dx() and this.dy()==d.dy()

	coords: []
	constructor: (@coords) ->
	 @coords?=[]

	@fromDirection: (direction) ->
		switch direction
			when 'left'
				delta = [-1,0]
			when 'right'
				delta = [1,0]
			when 'up'
				delta = [0,-1]
			when 'down'
				delta = [0,1]
		ret = new app.Delta()
		ret.coords = delta
		ret
	@fromOrientation: (orientation) ->		
		if orientation == 'vertical'
			return new app.Delta([0,-1])
		else
			return new app.Delta([-1,0])

	reversed: () ->
		return new app.Delta([@coords[0]*-1,@coords[1]*-1])
		
	x: (x)->
		x+@coords[0]

	y: (y)->
		y+@coords[1]

	dx: (x)->
		@coords[0]

	dy: (y)->
		@coords[1]

	orientationChar: ()->
		if this.equals(new app.Delta([-1,0])) or 
			this.equals(new app.Delta([1,0]))
				return 'h'
		else
				return 'v'




		
