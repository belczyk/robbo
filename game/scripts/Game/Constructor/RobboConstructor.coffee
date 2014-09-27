window.app = window.app ? {}
app = window.app


class app.RobboConstructor
	constructor: (universe,@gameDesigner) ->
		app.AssetLoader.constructorMode = true
		@assets = app.AssetLoader
		@canvas = $('#constructionyard')
		@cursorCanvas = $('#currentcell')
		@toolCanvas = $('#currenttool')
		@cursorCtx = @cursorCanvas.get(0).getContext('2d')
		@toolCtx = @toolCanvas.get(0).getContext('2d')
		@mainCtx = @canvas.get(0).getContext('2d')
		@cursorCanvas.mousemove (e) =>@onMouseMoveInCanvas(e)
		@setupDocumentEvents()
		@setupClick()
		@$map = $('.map')
		@eventCtx = new app.EventAggregator()
		@toolbar = new app.ConstructorToolbar(@eventCtx)
		@eventCtx.subscribe 'selected-planet-changed', (p)=> @changeMap(p)
		@eventCtx.subscribe 'current-tool-changed', () => @drawToolIcon()
		@eventCtx.subscribe 'map-height-changed', (h) => @updateMapHeight(h)
		@eventCtx.subscribe 'map-width-changed', (w) => @updateMapWidth(w)
		@eventCtx.subscribe 'colors-changed', ()=> @redrawMap()
		@eventCtx.subscribe 'background-changed', (color)=>@backgroundChanged(color)
		@eventCtx.subscribe 'clear-planet', ()=>@clearPlanet()
		@eventCtx.subscribe 'random-maze-next-step', ()=>@radomMazeStep()
		@games = app.Universe.games
		@gamesOptions = new app.GamesOptions(@gameDesigner,@games,@eventCtx)
		@setupMinimap()
		cutMap = new app.MapStruct """
		T10_.._.._.._.._.._..
		_.._.._.._.._.._.._..
		_.._.._.._.._.._.._..
		_.._.._..T21_.._.._..
		_..T38_.._.._.._.._..
		"""
	clearPlanet: () ->
		map = ""
		for y in [0..@mapHeight-1]
			for x in [0..@mapWidth-1]
				@updateMap x,y,"_.."
		@chambers = null
		@redrawMap()

	updateMapHeight: (h)->
		if h>@mapHeight
			@addLines(h-@mapHeight)
		else
			@removeLines(h)
		@mapHeight=h
		@setHeight(h)
		@redrawMap()
		@eventCtx.publish 'map-updated',@map

	addLines: (n) ->
		for i in [0..n-1]
			line = "\n"
			for x in [0..@mapWidth-1]
				line+="_.."
			@map+=line

		@map = @map.replace(///[\ ]///g,'.')
		@$map.val(@map)

	removeLines: (n)->
		lines = @map.split '\n'
		lines = lines.splice 0,n
		@map = lines.join '\n'
		@$map.val(@map)

	updateMapWidth: (w)->
		if w>@mapWidth
			@addColumns(w-@mapWidth)
		else
			@removeColumns(w)

		@mapWidth=w
		@setWidth(w)
		@redrawMap()
		@eventCtx.publish 'map-updated',@map

	addColumns: (n)->
		lines = @map.split '\n'
		for i in [0..lines.length-1]
			cols = ""
			cols+="_.." for x in [0..n-1]
			lines[i] = lines[i]+cols
		@map = lines.join '\n'
		@$map.val(@map)


	removeColumns: (w) ->
		lines = @map.split '\n'
		for i in [0..lines.length-1]
			lines[i] = lines[i].substring(0,w*3)
		@map = lines.join '\n'
		@$map.val(@map)

	changeMap: (planet) ->
		mapProcessing = new app.MapProcessing()
		@mapWidth = planet.width
		@mapHeight = planet.height
		@map = planet.map
		@map = @map.replace(///[\ ]///g,'.')
		@map = mapProcessing.removeTeleportSeqNumbers(@map)

		@$map.val(@map)
		@$map.attr("cols",planet.width*3)
		@$map.attr("rows",planet.height)
		@setWidth()
		@setHeight()
		@redrawMap()


	redrawMap: ()->
		lines = @map.split '\n'

		for y in [0..@mapHeight-1]
			line = lines[y]
			line = line.replace(///[\ ]///g,'.')
			for x in [0..@mapWidth-1]
				@draw(x,y,line.substring(x*3,(x*3+3)))
		return

	onMouseMoveInCanvas:(e) ->
					@x = Math.floor((e.pageX-@cursorCanvas.offset().left)/32.0)
					@y = Math.floor((e.pageY-@cursorCanvas.offset().top)/32.0)

					@cursorCtx.lineWidth = 1
					@cursorCtx.strokeStyle = 'white'
					@cursorCtx.clearRect 0,0,@cursorCanvas.width(),@cursorCanvas.height()
					@cursorCtx.strokeRect(@x*32,@y*32,32,32)
					@drawToolIcon()
					@drawCurrentToolOnCanvas(@x,@y) if @isLeftDown 
					@removeTail(@x, @y) if @isRightDown


	drawToolIcon: () ->
		@toolCtx.clearRect 0,0,@toolCanvas.width(),@toolCanvas.height()

		if not @toolbar.selectedTool? then return
		
		@toolCtx.clearRect 0,0,@toolCanvas.width(),@toolCanvas.height()
		asset = @assets.getAsset(@toolbar.selectedToolIcon)
		@toolCtx.putImageData asset,@x*32,@y*32


	drawCurrentToolOnCanvas: (x,y) ->
		if not @toolbar.selectedTool? then return
		asset = @assets.getAsset(@toolbar.selectedToolIcon)
		@mainCtx.putImageData asset,x*32,y*32
		@updateMap(x,y,@toolbar.selectedMapSign)

	draw: (x,y,sign) ->
		@mainCtx.clearRect x*32,y*32,32,32

		if (sign == '' || sign[0]=="_") then return

		@mainCtx.clearRect x*32,y*32,32,32
		tool = $('[data-map="'+sign+'"]')
		try
			assetName = tool.data('tool-icon')
			asset = app.AssetLoader.getAsset(assetName)
			@mainCtx.putImageData(asset,x*32,y*32)
		catch e
			console.log "Coudn't load asset for '#{sign}'. Found asset name #{assetName}. [#{x},#{y}]"
			console.log e

	setWidth: (val) ->
		@canvas.attr('width',@mapWidth*32)
		@toolCanvas.attr('width',@mapWidth*32)
		@cursorCanvas.attr('width',@mapWidth*32)
		@$map.attr("cols",@mapWidth*3)
		@$map.attr("rows",@mapHeight)

	setHeight: (val) -> 
		@canvas.attr('height',@mapHeight*32)
		@toolCanvas.attr('height',@mapHeight*32)
		@cursorCanvas.attr('height',@mapHeight*32)

	updateMap: (x,y,sign) -> 
		try
			lines = @map.split "\n"
			line = lines[y]
			begin = line.substring(0,x*3)
			end = line.substring((x+1)*3)
			line = begin + sign+end
			lines[y] = line
			@map = lines.join "\n"



			@$map.val(@map)
			@eventCtx.publish 'map-updated', @map
		catch e
			console.log x+" "+y+" "+e

	setupDocumentEvents: ()->
		@isLeftDown = no
		@isRightDown = no
		$('body').attr('onContextMenu','return false')
		$(document).mousedown (e) =>
			@isLeftDown = true if event.which ==1
			@isRightDown = true if event.which == 3

		$(document).mouseup (e) =>
			@isLeftDown = false if event.which ==1
			@isRightDown = false if event.which == 3

	setupClick: ()->
		@cursorCanvas.mousedown (e) =>
			if event.which==1
				@drawCurrentToolOnCanvas(@x,@y)
			else if event.which ==3 
				if @toolbar.selectedTool?
					@deselectTool()
				else
					@removeTail(@y,@x)

		@cursorCanvas.mouseout (e) ->
			leftDown = false
			rightDown = false

	removeTail: (x,y)->
		@updateMap(x,y,"_..")
		@mainCtx.clearRect x*32,y*32,32,32
		return
	backgroundChanged: (color)->
		@canvas.css('background-color',color.toRgbaString())

	deselectTool: ()->
		@eventCtx.publish 'tool-deselected'
		@drawToolIcon()


	setupMinimap: ()->
		callback = () =>
			scale = 0.5
			minimap = $('.minimap')
						.attr('width',@canvas.width()*scale)
						.attr('height',@canvas.height()*scale)
						.css('background-color',@canvas
						.css('background-color'))

			minimap2D = minimap.get(0).getContext('2d')
			minimap2D.scale scale,scale
			minimap2D.drawImage @canvas[0],0,0
			setTimeout (()->callback()),200
		callback()

	radomMazeStep: ()=>
		if !@chambers? 
			@chambers = []
			@chambers.push @newChamber(0,@mapWidth-1,0,@mapHeight-1)

		if @chambers.length>0
			@splitLastChamber()
			@radomMazeStep()
		else
			for x in [0..@width-1]
				@draw(x,0,"w1..")
				@updateMap(x,0,"w1.")

	newChamber: (xs,xe,ys,ye) ->
		x:
			start: xs
			end: xe
		y:
			start: ys
			end: ye

	minChamberDim: 4
	minChamberArea: 70
	splitLastChamber: () -> 
		chamber = @chambers.pop()
		split = @randomSplit(chamber)
		minChamberSize = 7
		if (chamber.y.end-chamber.y.start)>(chamber.x.end- chamber.x.start)
			if (chamber.y.end-chamber.y.start< minChamberSize) then return

			wall = split.y
			door = split.ydoor
			c1 = @newChamber(chamber.x.start, chamber.x.end, chamber.y.start, wall)
			c2 = @newChamber(chamber.x.start,chamber.x.end,wall,chamber.y.end)

			for x in [chamber.x.start..chamber.x.end]
				unless x==door
					@draw(x,wall,"w1.") 
					@updateMap(x,wall,"w1.")

		else
			if (chamber.x.end-chamber.x.start< minChamberSize) then return

			wall = split.x
			door = split.xdoor
			c1 = @newChamber(chamber.x.start, wall, chamber.y.start, chamber.y.end)
			c2 = @newChamber(wall,chamber.x.end,chamber.y.start,chamber.y.end)

			for y in [chamber.y.start..chamber.y.end]
				unless y==door
					@draw(wall,y,"w1.") 
					@updateMap(wall,y,"w1.")

		if (c1.x.end-c1.x.start)*(c1.y.end-c1.y.start)>@minChamberArea
			@chambers.push c1
		if (c2.x.end-c2.x.start)*(c2.y.end-c2.y.start)>@minChamberArea
			@chambers.push c2


	randomSplit: (chamber) ->

		console.log 'chamber to be split: '+JSON.stringify chamber
		xmin = chamber.x.start
		xmax = chamber.x.end

		ymin = chamber.y.start
		ymax = chamber.y.end

		res =
			x : @rand(xmin+@minChamberDim+1,xmax-@minChamberDim-1)
			y :  @rand(ymin+@minChamberDim+1,ymax-@minChamberDim-1)
			xdoor :  @rand(ymin+@minChamberDim+1,ymax-@minChamberDim-1)
			ydoor :  @rand(xmin+@minChamberDim+1,xmax-@minChamberDim-1)

		res

	rand: (min,max) ->
		 Math.floor(Math.random() * (max - min+1) + min)



