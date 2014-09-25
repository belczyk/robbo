window.app = window.app ? {}
app = window.app

app.ColorTranslation = [{from: [0,0,0,0], to:[0,0,0,0]},
						 {from: [162,114,64,255], to:[162,114,64,255]}
						,{from: [28,39,131,255], to:[28,39,129,255]}
						,{from: [16,16,16,255], to:[16,16,16,255]}
						,{from: [152,152,152,255], to:[152,152,152,255]}
						{from: [255,255,255,255], to:[0,0,0,0]}]

class app.ColorManager
	constructor: (canvas,background, transparent, colors) ->


		app.ColorTranslation[0].to = transparent
		for color,i in colors
			app.ColorTranslation[i+1].to = color

		if canvas?
			canvas.css('background-color',"rgba(#{background[0]},#{background[1]},#{background[2]},#{background[3]})")

