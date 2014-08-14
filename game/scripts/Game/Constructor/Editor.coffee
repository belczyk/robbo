﻿window.app = window.app ? {}
app = window.app

$ = jQuery

class Editor 
	constructor: () ->
		@setupMenu()
		new app.ColorManager($('#constructionyard'),()->)
		@canvas = $('#constructionyard')
		@cursorCanvas = $('#currentcell')
		@toolCanvas = $('#currenttool')
		@scrollPane = $('.scroll-panel')
		width = 16
		height = 32
		@assets = app.AssetLoader
		@setHeight 32
		@setWidth 16
		@cursorCanvas.mousemove (e) =>@onMouseMoveInCanvas(e)
		@cursorCtx = @cursorCanvas.get(0).getContext('2d')
		@toolCtx = @toolCanvas.get(0).getContext('2d')
		@mainCtx = @canvas.get(0).getContext('2d')
		@setupDocumentEvents()
		@setupMouseWheel()
		@setupToolbar()
		@setupClick()
		@selectGame = new app.SelectGameDialog($('.select-game-dialog'),(i)->alert(i.Name))
		$('.open-select-game').click =>
				@selectGame.show()

	onMouseMoveInCanvas:(e) ->
					@x = Math.floor((e.pageX-@cursorCanvas.offset().left)/32.0)
					@y = Math.floor((e.pageY-@cursorCanvas.offset().top)/32.0)

					@cursorCtx.lineWidth = 1
					@cursorCtx.strokeStyle = 'white'
					@cursorCtx.clearRect 0,0,@cursorCanvas.width(),@cursorCanvas.height()
					@cursorCtx.strokeRect(@x*32,@y*32,32,32)
					@drawToolIcon()
					@drawCurrentToolOnCanvas(@x,@y) if @isLeftDown
					@removeTail() if @isRightDown

	setupMenu: ()->



	drawCurrentToolOnCanvas: (x,y) ->
		if not @selectedTool? then return
		asset = @assets.getAsset(@selectedToolIcon)
		@mainCtx.putImageData asset,x*32,y*32

	drawToolIcon: () ->
		if not @selectedTool? then return
		
		@toolCtx.clearRect 0,0,@toolCanvas.width(),@toolCanvas.height()
		asset = @assets.getAsset(@selectedToolIcon)
		@toolCtx.putImageData asset,@x*32,@y*32

	setHeight: (val) -> 
		@height = val
		@canvas.attr('height',val*32)
		@toolCanvas.attr('height',val*32)
		@cursorCanvas.attr('height',val*32)

	setWidth: (val) ->
		@width = val
		@canvas.attr('width',val*32)
		@toolCanvas.attr('width',val*32)
		@cursorCanvas.attr('width',val*32)
		w = (val*32)+20
		w = 800 if w>800
		@scrollPane.css('width',w+'px') 

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

	setupToolbar: () ->
		$('.tool').click (e,item) =>
			$('.tool').removeClass('selected')
			$(e.target).parent().addClass('selected')
			@selectedTool = $(e.target)
			@selectedToolIcon = @selectedTool.data('tool-icon')

	setupMouseWheel: () ->
		$('.editor').mousewheel (e,delta) =>
				editor = this
				$('.tool').each (i,e) ->
					imgs = $(this).find('img')
					if imgs.size()==1 then return

					curr =-1
					imgs.each (j,img)->
						if $(img).hasClass 'curr'
							curr = j
					if delta<0
						curr++
					else
						curr--

					if curr<0
						curr=imgs.size()-1

					if curr==imgs.size()
						curr=0
					imgs.removeClass 'curr'
					$(imgs[curr]).addClass 'curr'

					if $(e).hasClass('selected')
						editor.selectedTool=$(imgs[curr])
						editor.selectedToolIcon =$(imgs[curr]).data('tool-icon')

				@drawToolIcon(@x,@y)
				return false

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

	deselectTool: () ->
		@toolCtx.clearRect 0,0,@toolCanvas.width(),@toolCanvas.height()
		$('.tool.selected').removeClass('selected')
		@selectedTool = null
		@selectedToolIcon = null

	removeTail: (x,y)->
		if not @selectedTool?
			@mainCtx.clearRect @x*32,@y*32,32,32
$ ->
	new Editor()




