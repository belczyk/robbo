window.app = window.app ? {}
app = window.app

class app.Game 
	constructor: (@gameBoard,game,planetsList,currentLevel) ->
		@disableScrolling()

		@levelManager = new app.LevelManger @gameBoard,game,planetsList,currentLevel
		@levelManager.startGame()
		@timeDelayedMethodCall = new app.TimeDelayedMethodCall()
		
		@setupMinimap()

	setupMinimap: ()->
		callback = () =>
			minimap = $('.minimap')
						.attr('width',@canvas().width()*0.2)
						.attr('height',@canvas().height()*0.2)
						.css('background-color',@canvas()
						.css('background-color'))

			minimap2D = minimap.get(0).getContext('2d')
			minimap2D.scale 0.2,0.2
			minimap2D.drawImage @canvas()[0],0,0
			@timeDelayedMethodCall.delay 1000, ()->callback()
			
		callback()

	canvas: () ->
		@gameBoard.find('canvas')


	redraw: () ->
			for x in [0..@envCtx.width-1]
				for y in [0..@envCtx.height-1]
					obj = @envCtx.getObjAt(x,y)
					if obj?
						@envCtx.objChangedState(obj)

			app.ColorTranslation.isChanged = false;
			return

	disableScrolling: () ->
		ar=[33,34,35,36,37,38,39,40]
		$(document).keydown((e) ->
			key = e.which;
			if($.inArray(key,ar) > -1) 
				e.preventDefault();
				return false;
			return true;
		)

