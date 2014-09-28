window.app = window.app ? {}
app = window.app

class app.GamesOptions
	constructor: (@gameDesigner,@games, @eventCtx) ->
		$('.color').colorpicker()
		@eventCtx.subscribe 'map-updated', (map)=> @onMapUpdated(map)
		@$saveGame = $('.save-game')
		@setupGameOptions()
		@setupPlanetOptions()
		@setupActions()
		@$games = @gameDesigner.find('.games')
		@$planets = @gameDesigner.find('.planets')
		@$games.change () => @onGameChanged()
		@$planets.change () => 
			@onPlanetChanged()
			@publishSelectedPlanetChanged()

		@onGamesChanged()
		@gameDesigner.find('.toggle-rawmap').click ()=>$('.map').toggle({easing : 'blind'}) 
		@gameDesigner.find('.toggle-options').click ()=>$('.options-panel').toggle({easing : 'blind'})
		@publishSelectedPlanetChanged()
		@disableSave()
		@setupServerPing()
		$('.color').colorpicker().on('changeColor',(e)=>@onColorChange(e))
		return

	onMapUpdated: (map)->
		@updatePlanet (planet)->
			planet.map = map
		@updateCounters()
		@validateMap()


	publishSelectedPlanetChanged: ()-> 
		@eventCtx.publish 'selected-planet-changed', @selectedPlanet()

	setupActions: () ->
		@$saveGame.click => @saveGame()
		$('.new-game').click => @newGame()
		$('.new-planet').click => @newPlanet()
		$('.test-planet').click => @testPlanet()
		$('.remove-planet').click => @removePlanet()
		$('.remove-game').click => @removeGame()
		$('.clear-planet').click => @eventCtx.publish 'clear-planet'
		$('.random-maze').click => @eventCtx.publish 'random-maze-next-step'

	saveGame: () ->
		$('.save-game').text('Saving...')
		@processMaps(@games)
		@upateSizes()
		$.ajax
			url: app.ConstructorConfig.serverAddress+"/api/robbo"
			data: {games: @games}
			type: "POST"
			success: ()-> setTimeout((()->$('.save-game').text('Save game')),200)
			error: ()-> 
				alert("Error. Coudn't save game.")
				$('.save-game').text('Save game')

		return

	processMaps: ()-> 
		mapProcessing = new app.MapProcessing()
		for gameIndex in [0..@games.length-1]
			for planetIndex in [0..@games[gameIndex].planets.length-1]
				planet = @games[gameIndex].planets[planetIndex]
				@games[gameIndex].planets[planetIndex].map = mapProcessing.preSaveProcessing planet.map
		return

	upateSizes: () ->
		for game in @games
			for planet in game.planets
				planet.width = app.MapLoader.getWidth(planet.map)
				planet.height = app.MapLoader.getHeight(planet.map)
		return

	removeGame: () ->
		if @games.length ==1
			alert "Don't remove all games."
			return

		i = @games.firstIndexOf (g)=>g.index.toString()==@$games.val()
		@games.splice i,1
		@onGamesChanged()

	newGame: () ->
		maxIndex = @games.max((g)=>parseInt(g.index))
		game = 
			name: "Game "+(@games.length+1)
			startingNumberOfLives: 9
			planets: [@createPlanet(1)]
			index: maxIndex+1
		@games.push game

		@onGamesChanged()
		@$games.find('option:last').attr("selected","selected")
		@onGameChanged()

	newPlanet: () ->
		@updateGame (game) =>
			game.planets.push @createPlanet(game.planets.length+1)
		@onPlanetsChanged()

	removePlanet: () ->
		if @selectedGame().planets.length ==1
			alert "Don't remove all planets."
			return

		@updateGame (game) =>
			i = game.planets.firstIndexOf (p)=>p.index.toString() == @$planets.val()
			game.planets.splice i,1
			@onPlanetsChanged()
			return
		return

	testPlanet: () ->
		window.open("robbo.html?game=#{@selectedGame().index}&planet=#{@selectedPlanet().index}","_blank")


	setupGameOptions: () ->
		@$gameName = $('.game-name')
		@$lives = $('.lives')
		@$gameName.change => @updateGame (game)=>game.name =@$gameName.val()
		@$lives.change => @updateGame (game)=>game.startingNumberOfLives =@$lives.val()

	setupPlanetOptions: () ->
		@$width = $('.width')
		@$height = $('.height')
		@$bolts = $('.bolts')
		@$planetName = $('.planet-name')
		@$width.change => 
			@updatePlanet (planet)=>planet.width =@$width.val()
			@eventCtx.publish 'map-width-changed',parseInt(@$width.val())
		@$height.change => 
			@updatePlanet (planet)=>planet.height =@$height.val()
			@eventCtx.publish 'map-height-changed',parseInt(@$height.val())
			
		@$bolts.change => @updatePlanet (planet)=>planet.boltsToBeCollected =@$bolts.val()
		@$planetName.change => @updatePlanet (planet)=>planet.name =@$planetName.val()

	updatePlanet: (func)->
		for game in @games 
			if(game.index.toString() == @$games.val())
				for planet in game.planets
					func(planet) if (planet.index.toString() == @$planets.val())

		return

	updateGame: (func)->
		for game in @games 
			func(game) if(game.index.toString() == @$games.val())
				
		return

	onGamesChanged: () ->
		@$games.find('option').remove()
		for game in @games
			@$games.append($('<option />').attr('value',game.index).text(game.name))

		@onGameChanged()

		return

	onPlanetsChanged: () -> 
		@$planets.find('option').remove()
		for planet in @selectedGame().planets
			@$planets.append($('<option />').attr('value',planet.index).text(planet.name))

		@$planets.find('option').attr("selected",null)
		@$planets.find('option:last').attr("selected","selected")

		@onPlanetChanged()

	onGameChanged: () -> 
		game = @selectedGame()
		@$gameName.val(game.name)
		@$lives.val(game.startingNumberOfLives)
		@onPlanetsChanged()

	onPlanetChanged: () -> 
		planet = @selectedPlanet()
		@$width.val(planet.width)
		@$height.val(planet.height)
		@$bolts.val(planet.boltsToBeCollected)
		@$planetName.val(planet.name)
		@updateColors(planet)
		@publishSelectedPlanetChanged()
		@updateCounters()
		@validateMap()

		return
	updateColors: (planet)->
		@stopColorUpdates = true

		$('[data-color-for="background"]').colorpicker('setValue', planet.background.toRgbaString())
		new app.ColorManager null, planet.background,planet.transparent,planet.colors

		$('[data-color-for="transparent"]').colorpicker('setValue', planet.transparent.toRgbaString())
		for color,i in planet.colors
			$("[data-color-for=\"#{i+1}\"]").colorpicker('setValue', color.toRgbaString())

		@eventCtx.publish 'background-changed', planet.background
		new app.ColorManager null, planet.background,planet.transparent,planet.colors

		@stopColorUpdates = false

	onColorChange: (e)->
		if @stopColorUpdates? && @stopColorUpdates then return

		colorFor = $(e.target).data('color-for')
		colorVal = $(e.target).find('input').val()
		color = colorVal.rgbaToArray()
		if colorFor=="background"
			@updatePlanet (p)->
				p.background = color
			$('#constructionyard').css("background-color",colorVal)
			return
		else if (colorFor == "transparent")
			@updatePlanet (p)->
				p.transparent = color
				app.ColorTranslation[0].to = color
		else
			index = parseInt(colorFor)
			@updatePlanet (p) ->
				app.ColorTranslation[index].to = color
				p.colors[index-1] = color

		@eventCtx.publish 'colors-changed'


	selectedGame: () -> 
		@games.single (g) => g.index.toString() == @$games.val() 

	selectedPlanet: ()->
		@selectedGame().planets.single (p) => p.index.toString() == @$planets.val()

	createPlanet: (index)->
			boltsToBeCollected: 5
			name: "Planet "+index
			index: index
			width: 16
			height: 32
			map: @generateEmptyMap(32,16)
			background: [83,148,83,255]
			transparent: [255,0,0,0]
			colors: [[162,114,64,255],[28,39,129,255],[138,144,191,255],[152,152,152,255]]

	generateEmptyMap: (h,w)->
		map = ""
		for y in [0..h-1]
			for x in [0..w-1]
				map+="_.."
			map+="\n"
		map

	setupServerPing: ()->
		@pingServer()
		setInterval (()=>@pingServer()),3000

	pingServer: () ->
		try
			$.ajax 
				type: "GET",
				async: true,
				url: app.ConstructorConfig.serverAddress+'/api/robbo',
				error: () => @disableSave()
				success: () => @enableSave()
		catch
			 @$saveGame.attr('disbled','disbled')

	disableSave: ()->
		@$saveGame.attr('disabled','disabled')
		@$saveGame.text("connecting...")
		@$saveGame.removeClass('btn-primary')
		@$saveGame.addClass('btn-warning')

	enableSave: () ->
		@$saveGame.removeAttr('disabled')
		@$saveGame.text("Save game")
		@$saveGame.addClass('btn-primary')
		@$saveGame.removeClass('btn-warning')

	updateCounters: () ->
		bolts = @selectedPlanet().map.match(/b\.\./g)
		keys = @selectedPlanet().map.match(/k\.\./g)
		$('.bolts-count').text (if bolts? then bolts.length else 0 )
		$('.keys-count').text (if keys? then keys.length else 0 )

	validateMap: () ->
		map = @selectedPlanet().map
		robbo = map.match(/R\.\./g)
		ship = map.match(/s\.\./g)
		msg = ""
		msgs = $('.messages')

		if (!robbo?)
			msg+="Missing robbo. "

		if (!ship?)
			msg+="Missing ship. "

		if msg=='' then msgs.hide()  else msgs.show()

		msgs.text msg

