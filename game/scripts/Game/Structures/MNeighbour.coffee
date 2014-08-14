window.app = window.app ? {}
app = window.app

class app.MNeighbour
	
	constructor: (@N,@NE,@E,@SE,@S,@SW,@W,@NW)->
		@directions = []
		@directions.push {delta: [0,-1],obj: @N}
		@directions.push {delta: [1,-1],obj: @NE}
		@directions.push {delta: [1,0],obj: @E}
		@directions.push {delta: [1,1],obj: @SE}
		@directions.push {delta: [0,1],obj: @S}
		@directions.push {delta: [-1,1],obj: @SW}
		@directions.push {delta: [-1,0],obj: @W}
		@directions.push {delta: [-1,-1],obj: @NW}

	asArray: () ->
		return [@N,@NE,@E,@SE,@S,@SW,@W,@NW]

	asOrderedArray: (startDelta) ->
		res = []
		start = 0
		for i in [0..7] 
			delta = @directions[i].delta
			if (delta[0]==startDelta[0] and delta[1]==startDelta[1])
				start = i
				break;
		for i in [start..start+7]
			ii = if i<8 then i else i-8
			res.push  @directions[ii].obj

		res