window.app = window.app ? {}
app = window.app

class app.ConstructorToolbar 
	constructor: ()->
		@setupToolbar()
		$(window).keydown (event)=> 
			if event.keyCode == 9 then return @rotateTools(event)

	rotateTools: (event) ->
		editor = this
		$('.tool').each (i,e) ->
			imgs = $(this).find('img')
			if imgs.size()==1 then return

			curr =-1
			imgs.each (j,img)->
				curr = j if $(img).hasClass 'curr'
					
			curr++
			curr=imgs.size()-1 if curr<0
			curr=0 if curr==imgs.size()
				
			imgs.removeClass 'curr'
			$(imgs[curr]).addClass 'curr'

			if $(e).hasClass('selected')
				editor.selectedTool=$(imgs[curr])
				editor.selectedToolIcon = $(imgs[curr]).data('tool-icon')
				editor.selectedMapSign = $(imgs[curr]).data('map')
		event.preventDefault()
		return false

	setupToolbar: () ->
		$('.tool').click (e,item) =>
			$('.tool').removeClass('selected')
			$(e.target).parent().addClass('selected')
			@selectedTool = $(e.target)
			@selectedMapSign = $(e.target).data('map')
			@selectedToolIcon = @selectedTool.data('tool-icon')
