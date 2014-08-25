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
		@games = app.Universe.games
		@gamesOptions = new app.GamesOptions(@gameDesigner,@games,@eventCtx)

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
		@mapWidth = planet.width
		@mapHeight = planet.height
		@map = planet.map
		@map = @map.replace(///[\ ]///g,'.')
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
					#@removeTail() if @isRightDown
	drawToolIcon: () ->
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
		if (sign[0]=="_") then return;

		@mainCtx.clearRect x*32,y*32,32,32
		tool = $('[data-map="'+sign+'"]')
		try
			assetName = tool.data('tool-icon')
			asset = app.AssetLoader.getAsset(assetName)
			@mainCtx.putImageData(asset,x*32,y*32)
		catch e
			console.log "Coudn't load asst for '#{sign}'. Found asset name #{assetName}. [#{x},#{y}]"
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
				if @selectedTool?
					@deselectTool()
				else
					@removeTail(@x,@y)

		@cursorCanvas.mouseout (e) ->
			leftDown = false
			rightDown = false

		return


