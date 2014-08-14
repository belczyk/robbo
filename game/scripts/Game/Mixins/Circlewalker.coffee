window.app = window.app ? {}
app = window.app

class app.Circlewalker
	constructor: (direction) ->
		if (direction=='clockwise')
			@moveMap = app.Circlewalker.clocwiseMap
		else 
			@moveMap = app.Circlewalker.conterClockwiseMap

	init: () ->
		@delay = app.Predef.Circlewalker.movementDelay
		mn = @envCtx.getMNeighbour(@x,@y)
		tail = mn.asOrderedArray([0,-1]).where((d)=>d?).first()
		@currentTail=[tail.x,tail.y]
		@envCtx.delay @delay,()=>@moveOneStep()


	delta: () ->
			(@currentTail[0]-@x).toString()+(@currentTail[1	]-@y).toString()

	deq: (delta,vec) ->
		delta[0]==vec[0]  and delta[1]==vec[1]

	tryMove: (delta,stacked) ->
		nm = @envCtx.getNNeighbour(@x,@y).asArray().where((d)->d?)
		if nm.length==4
			@changeState()
			return  @envCtx.delay @delay,()=>@moveOneStep()
			
		if @envCtx.getObjAt(@x+delta[0],@y+delta[1])?
			@currentTail = [@x+delta[0],@y+delta[1]]
			return @moveOneStep()
		else
			@envCtx.moveObjBy @x,@y,delta[0],delta[1]
			@envCtx.delay @delay,()=>@moveOneStep()
			@changeState()
			@attack()

	
	@conterClockwiseMap: {"1-1":[0,-1],"10":[0,-1],"0-1":[-1,0],"-1-1":[-1,0],"11":[1,0],"01":[1,0],"-11":[0,1],"-10":[0,1]}
	@clocwiseMap: {"1-1":[1,0],"10":[0,1],"0-1":[1,0],"-1-1":[0,-1],"11":[0,1],"01":[-1,0],"-11":[-1,0],"-10":[0,-1]}



	moveOneStep: () ->

		return @tryMove(@moveMap[@delta()]) if @isActive