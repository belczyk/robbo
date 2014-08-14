window.app = window.app ? {}
app = window.app


class app.EnvironmentContext
	constructor: (@eventAggregator,@drawingCtx,@timer)->
		@keys = 0
		
		@eventAggregator.subscribe 'key-collected', 
									(() => @keys++),
									this

		@eventAggregator.subscribe 'key-used', 
									(() => @keys--),
									this
		@eventAggregator.subscribe 'restart-level',(()=>@keys=0),this
	delay: (time, fun) ->
		@timer.delay time, fun
	hide: (x,y) ->
		@drawingCtx.clear x,y

	initMap : (width,height) ->
		@width = width
		@height = height
		@map = []
		for i in [0..height-1]
			@map.push []
			for j in [0..width-1]
				@map[i].push null

	getNNeighbour: (x,y)->
		new app.NNeighbour( @getObjAt(x,y-1), @getObjAt(x,y+1),@getObjAt(x+1,y),@getObjAt(x-1,y))

	getMNeighbour: (x,y)->
		n = @getNNeighbour(x,y)
		new app.MNeighbour(n.N, @getObjAt(x+1,y-1),n.E, @getObjAt(x+1,y+1),n.S,@getObjAt(x-1,y+1),n.W,@getObjAt(x-1,y-1))		
		
	getKeysNumber: ->
			return @keys
	getRow: (lineNumber,startingColumn,endingColumn) ->
		startingColumn ?= 0
		endingColumn ?= @width-1
		ret = [] 
		for i in [startingColumn..endingColumn]
			ret.push @getObjAt(i,lineNumber)
		ret
	getObjAt: (x,y) ->
		if (x>@width-1 or y>@height-1 or x<0 or y<0)
			return {message: "Outside the map",outsideMap: true,canStepOn: (()->false),canBlowUp: ()->false}
		@map[y][x]

	getObjAtD: (obj,delta) ->
		x = delta.x(obj.x)
		y= delta.y(obj.y)
		if (x>@width-1 or y>@height-1 or x<0 or y<0)
			return {message: "Outside the map",outsideMap: true,canStepOn: (()->false),canBlowUp: ()->false}
		@map[y][x]

	setObjAtD: (objr,delta,obj) ->
		x = delta.x(objr.x)
		y= delta.y(objr.y)
		@map[y][x]=obj
		if obj?
			obj.x = x
			obj.y = y
			@drawingCtx.draw obj
		else
			@drawingCtx.clear x,y

	setObjAt: (x,y,obj) ->
		@map[y][x]=obj
		if obj?
			obj.x = x
			obj.y = y
			@drawingCtx.draw obj
		else
			@drawingCtx.clear x,y

	putObj: (obj) ->
		@setObjAt(obj.x,obj.y,obj) if obj?

	moveObjByD: (x,y,delta) ->
		obj = @getObjAt(x,y)
		@setObjAt x,y,null
		@setObjAt delta.x(x),delta.y(y),obj

	moveObjBy: (x,y,dx,dy) ->
		obj = @getObjAt(x,y)
		@setObjAt x,y,null
		@setObjAt x+dx,y+dy,obj
		
	stepOnD: (x,y,delta) ->
		obj = @getObjAt(x,y)
		if obj? and obj.isMoveable? and obj.isMoveable
			obj.onPush?()
			@moveObjByD(x,y,delta)

	stepOn: (x,y,dx,dy) ->
		obj = @getObjAt(x,y)
		if obj? and obj.isMoveable? and obj.isMoveable
			obj.onPush?()
			@moveObjBy(x,y,dx,dy)

	getRobbo: ()->
		for row in @map
			for cell in row
				if cell?.isRobbo?
					return cell

	objChangedState: (obj) ->
		@drawingCtx.draw obj

	rmObj: (obj) ->
		@setObjAt obj.x,obj.y,null

	getObjName:	(obj)->
			funcNameRegex = ///function (.{1,})\(///
			results = (funcNameRegex).exec((obj).constructor.toString());
			return if (results && results.length > 1) then results[1].trim() else "";

	registerRandomCall: (obj,fun) ->
		@timer.registerRandomCall obj,fun

	unregisterRandomCalls: (obj) ->
		@timer.unregisterRandomCalls obj

	sound: (name) ->
		sound = $("#audio-#{name}").clone()[0]
		$("#audio-#{name}").clone()[0]?.play()