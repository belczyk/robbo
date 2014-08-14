window.app = window.app ? {}
app = window.app

class app.GameVM 
	constructor: (name,worldCount,@Id) ->
		@Name = ko.observable(name)
		@WorldCount = ko.observable(worldCount)
		@Selected = ko.observable(false)

    
	select: () ->
		@deselectAll()
		@Selected(not @Selected())


class app.SelectGameDialog
	constructor: (@element,@callback) ->
		@IsLoading = ko.observable(true)
		@Games = ko.observableArray()
		ko.applyBindings(this,@element[0])


	onDialogClose: (anySelected) ->
		@modal.dialog('close')


	show: () ->
		@IsLoading(true)
		@element.modal('show')
		@Games.removeAll()
		$.get '/api/game', (data) => @addAll data; @IsLoading(false)


	addAll: (games) ->
		for game in games 
			gameVm = new app.GameVM game.Name,game.WorldCount,game.Id
			gameVm.deselectAll = ()=>@deselectAll(gameVm)
			@Games.push (gameVm)
		return

	deselectAll: () ->
		for game in @Games()
			game.Selected(false)

	saveChanges: () ->
		@element.modal('show')
		selectedGame = @Games().single (g)->g.Selected()
		@callback ko.toJS(selectedGame)