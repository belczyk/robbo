window.app = window.app ? {}
app = window.app

class app.NNeighbour
	constructor: (@N,@E,@S,@W)->
		@directions = []
		@directions.push {delta: [0,-1],obj: @N}
		@directions.push {delta: [1,0],obj: @E}
		@directions.push {delta: [0,1],obj: @S}
		@directions.push {delta: [-1,0],obj: @W}

	asArray: () ->
		return [@N,@E,@S,@W]

	asOrderedArray: (startDelta) ->
		res = []
		start = 0
		for i in [0..3] 
			delta = @directions[i].delta
			if (delta[0]==startDelta[0] and delta[1]==startDelta[1])
				start = i
				break;
		for i in [start..start+7]
			ii = if i<8 then i else i-8
			res.push  @directions[ii].obj

		res