window.app = window.app ? {}
app = window.app

class app.GamesOptions
	constructor: (@gameDesigner,@games, @eventCtx) ->
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

		
	onMapUpdated: (map)->
		@updatePlanet (planet)->
			planet.map = map

	publishSelectedPlanetChanged: ()-> 
		@eventCtx.publish 'selected-planet-changed', @selectedPlanet()

	setupActions: () ->
		@$saveGame.click => @saveGame()
		$('.new-game').click => @newGame()
		$('.new-planet').click => @newPlanet()
		$('.test-planet').click => @testPlanet()
		$('.remove-planet').click => @removePlanet()
		$('.remove-game').click => @removeGame()

	saveGame: () ->
		$('.save-game').text('Saving...')
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
		@$planets.find('option:last').attr("selected","selected")

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
		@$width.change => @updatePlanet (planet)=>planet.width =@$width.val()
		@$height.change => @updatePlanet (planet)=>planet.height =@$height.val()
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

	enableSave: ()->
		@$saveGame.removeAttr('disabled')
		@$saveGame.text("Save game")
		@$saveGame.addClass('btn-primary')
		@$saveGame.removeClass('btn-warning')
