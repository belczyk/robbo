window.app = window.app ? {}
app = window.app

class app.Magnet extends app.Object
	@include new app.Bombblowable()
	constructor: (@envCtx,@x,@y,@orientation) ->
		switch @orientation 
			when 'left'
				asset = 'magnet-l'
				@delta = -1
			when 'right'
				@delta = 1
				asset = 'magnet-r'
		super asset

		@eventAggregator.subscribe 'robbo-moved', 
					((x,y) => @drag(x,y)  ),
					this,
					(x,y)=> y == @y and @isInField(x,y)
	drag: (x,y) ->
			robbo = @envCtx.getObjAt(x,y)
			robbo.canMove = false
			if x isnt @x-@delta
				@envCtx.moveObjBy(x,y,@delta,0)
				@envCtx.delay app.Magnet.dragDelay,()=>@drag(x+@delta,y)
			else robbo.blowUp()


	isInField: (x,y) -> 
		for tail in @getField()			
			if tail? and (!tail.isRobbo? or !tail.isRobbo)
				return false
			if tail?.x==x and tail?.y == y
				return true
		false
			
	getField: () ->
		if @orientation is 'left'
			start = @x+1
			end = null
		else
			start = 0
			end = @x-1
		line = @envCtx.getRow(@y,start,end)
		line.reverse() if @orientation is 'right'
		line


		
