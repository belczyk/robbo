window.app = window.app ? {}
app = window.app

class app.Enemy
	isRobboInRange: (x,y) ->
		mn = @envCtx.getNNeighbour(@x,@y).asArray().where((o)=>o?.isRobbo)
		mn.length==1

	attack: () ->
		mn = @envCtx.getNNeighbour(@x,@y).asArray().where((o)=>o?.isRobbo)
		if(mn.length==1)
			mn.first().blowUp()

