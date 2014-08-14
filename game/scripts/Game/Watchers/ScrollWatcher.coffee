window.app = window.app ? {}
app = window.app

class app.ScrollWatcher
	constructor: (@envCtx,@eventAggregator,@canvas) ->
		@topY = 0	
		@leftX = 0
		@span = 16
		@step = 3
		@threshold = 2
		@tailHeight = 32
		@tailWidth = 32
		@scrollDelay = 60


		@eventAggregator.subscribe 'level-started',()=>@onLevelStarted()
		@eventAggregator.subscribe 'robbo-moved', 
									((x,y,d) => @scroll(x,y,d)),
									this
		@eventAggregator.subscribe 'robbo-teleported', 
									((x,y) => @scrollTo(x,y,{})),
									this
		@eventAggregator.subscribe 'level-restarted', 
									(()=>@onLevelStarted()),
									this
		@envCtx.eventAggregator.subscribe 'level-up',
									((x,y) => 
												@canvas.css({'margin-top': 0,'margin-left':0})
												@topY = 0	
												@leftX = 0
									),
									this
	onLevelStarted: () ->
		robbo = @envCtx.getRobbo()
		robbo.canMove=false
		@mapHeight = @canvas.height()/@tailHeight
		@mapWidth = @canvas.width()/@tailWidth
		@scrollTo(robbo.x,robbo.y,robbo)

	scrollTo: (x,y,robbo) ->
		toScrollY=0
		toScrollX=0

		if (y>@span-@threshold)
			toScrollY = Math.ceil(((y-@span)+@threshold*2)/@step)			
		if (x>@span-@threshold)
			toScrollX = Math.ceil(((x-@span)+@threshold*2)/@step)
		@leftX=toScrollX*@step
		@topY=toScrollY*@step
		dx = Math.abs(@leftX-x)
		dy = Math.abs(@topY-y)
		step=Math.ceil(Math.sqrt(dx*dx*dy*dy))/this.step
		if toScrollY>0 or toScrollX>0
			@canvas.animate {'margin-top': toScrollY*-@tailHeight*@step,'margin-left':toScrollX*-@tailWidth*@step}
							,@scrollDelay*step
							,()->robbo.canMove = true

		else robbo.canMove = true

	scroll: (x,y,d) ->
			if d.dy()>0 and y>=@topY+@span-@threshold
				@scrollDownBy(@step)
			else if y==@topY+@threshold-1
				@scrollUpBy(@step)

			if d.dx()>0 and x>=@leftX+@span-@threshold
				@scrollRightBy(@step)
			else if x==@leftX+@threshold-1
				@scrollLeftBy(@step)

	scrollDownBy: (step,delay,whenFinish) ->
		step?=@step
		delay?= @scrollDelay

		if (@topY+@span>=@mapHeight) then return
	
		if @topY+@step+@span>@mapHeight
			step-=(@topY+@span+@step)-@mapHeight
		@topY += step

		@canvas.animate({'margin-top': @topY*-@tailHeight},delay*step,()->whenFinish?())



	scrollUpBy: (step,delay,whenFinish) ->
		step?=@step
		delay?= @scrollDelay

		if (@topY==0) then return

		if (@topY-step<0)
			step+=@topY-step
		@topY -= step

		@canvas.animate({'margin-top': @topY*-@tailHeight},@scrollDelay*step)

	scrollRightBy: (step,delay,whenFinish) ->
		step?=@step
		delay?= @scrollDelay

		if (@leftX+@span>=@mapWidth) then return
	
		if @leftX+@step+@span>@mapWidth
			step-=(@leftX+@span+@step)-@mapWidth
		@leftX += step

		@canvas.animate({'margin-left': @leftX*-@tailWidth},delay*step,()->whenFinish?())


	scrollLeftBy: (step,delay,whenFinish) ->
		step?=@step
		delay?= @scrollDelay

		if (@leftX==0) then return
		
		if (@leftX-step<0)
			step+=@leftX-step
		@leftX -= step

		@canvas.animate({'margin-left': @leftX*-@tailWidth},@scrollDelay*step)