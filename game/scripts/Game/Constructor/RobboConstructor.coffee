window.app = window.app ? {}
app = window.app

class app.RobboConstructor
	constructor: (universe,@gameDesigner) ->
		@assets = app.AssetLoader
		@canvas = $('#constructionyard')
		@cursorCanvas = $('#currentcell')
		@toolCanvas = $('#currenttool')
		@cursorCtx = @cursorCanvas.get(0).getContext('2d')
		@toolCtx = @toolCanvas.get(0).getContext('2d')
		@mainCtx = @canvas.get(0).getContext('2d')
		

		@$map = $('.map')
		@eventCtx = new app.EventAggregator()
		@toolbar = new app.ConstructorToolbar(@eventCtx)
		@eventCtx.subscribe 'selected-planet-changed', (p)=> @changeMap(p)
		@games = app.Universe.games
		@gamesOptions = new app.GamesOptions(@gameDesigner,@games,@eventCtx)

	changeMap: (planet) ->
		@mapWidth = planet.width
		@mapHeight = planet.height
		@map = planet.map
		@$map.val(planet.map)
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

	setHeight: (val) -> 
		@canvas.attr('height',@mapHeight*32)
		@toolCanvas.attr('height',@mapHeight*32)
		@cursorCanvas.attr('height',@mapHeight*32)