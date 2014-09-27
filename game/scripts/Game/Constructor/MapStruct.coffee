window.app = window.app ? {}
app = window.app

class app.MapStruct
	constructor: (map) ->
		@mapString = @preprocessMap map
		@map = []
		@processMap()

	processMap: ()->
		lines = @mapString.split '\n'

		for line in lines 
			row = []
			for i in [0..Math.floor(line.length/3)-1]
				row.push line.substring i*3,i*3+3
			@map.push row

	set: (x,y,sign) ->
		row = @map[y]
		row[x]=sign

	get: (x,y) ->
		row = @map[y]
		row[x]

	width: ()->
		@map[0].length

	height: ()->
		@map.length

	preprocessMap: (map) -> 
		lines = map.split "\n"
		if (lines[0]=="\n")
			return lines.skip(1).join "\n"
		lines.join "\n"

	forEach: (fun)->
		for x in [0..@width()-1]
			for y in [0..@height()-1]
				fun(x,y,@map[y][x])

	toString: ()->
		res = ""
		for row in @map
			line = row.join ''
			res+=line+"\n"
		res