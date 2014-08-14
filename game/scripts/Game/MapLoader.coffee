window.app = window.app ? {}
app = window.app

class app.MapLoader
	constructor: (@envCtx,@canvas)->
		@envCtx.eventAggregator.subscribe 'load-level',((levelStr)=>@load(levelStr)),this
		@envCtx.eventAggregator.subscribe 'restart-level',((mapStr)=>@restart(mapStr)),this

	restart: (mapStr) ->
		@load(mapStr)
		@envCtx.eventAggregator.publish 'level-restarted'

	cleanMap: () ->
		if not @envCtx.map? then return
		for row in @envCtx.map
			for obj in row
				if obj?
					@envCtx.eventAggregator.unsubscribe obj
					@envCtx.unregisterRandomCalls obj
					@envCtx.map[obj.y][obj.x] = null
					`delete	obj`
	load : (mapStr)->
		@cleanMap()
		bolts = 0
		lines = mapStr.split '\n'
		maxWidth =0 
		for line,y in lines
			if (line.length-1)/3>maxWidth
				maxWidth=line.length/3
		
		@envCtx.initMap maxWidth,lines.length
		toInit = []


		@canvas.attr('width',maxWidth*32)
		@canvas.attr('height',lines.length*32)
		for line,y in lines

			for i in [0..line.length/3]
				x = i
				char = line[i*3]
				char2 = line[i*3+1]
				char3 = line[i*3+2]
				obj = null
				switch char
					when 'w'
						obj = new app.Wall @envCtx,x,y
					when 'R'
						obj = new app.Robbo @envCtx,x,y
					when 'b'
						obj = new app.Bolt @envCtx,x,y
						bolts++
					when '#'
						if char2 is 'o'
							obj = new app.ContainerWithWheels @envCtx,x,y
						else
							obj = new app.Container @envCtx,x,y
					when 's'
						obj = new app.Ship @envCtx,x,y
					when 'X'
						obj = new app.Bomb @envCtx,x,y
					when 'k'
						obj = new app.Key @envCtx,x,y
					when '+'
						obj = new app.Rubble @envCtx,x,y
					when 'd'
						obj = new app.Door @envCtx,x,y
					when 'a'
						obj = new app.Ammo @envCtx,x,y
					when '|'
						obj = new app.LaserBeam @envCtx,x,y,[0,1]
						toInit.push obj
					when '-'
						obj = new app.LaserBeam @envCtx,x,y,[1,0]
						toInit.push obj
					when 'L'
						if char3 is ' ' or char3 is '.'
							obj = new app.Laser @envCtx,x,y,@getDirection(char2)
						else if char3 is 'r'
							obj = new app.RotatingLaser @envCtx,x,y
						else if char3 is 's'
							obj = new app.StableBeamLaser @envCtx,x,y,@getDirection(char2)

					when 'B'
						if char3 is ' ' or char3 is '.'
							obj = new app.Bat @envCtx,x,y,@getOrientation(char2)
						else 
							obj = new app.FiringBat @envCtx,x,y,@getOrientation(char2),@getDirection(char3)
					when 'E'
						if char2=='a' then obj = new app.Ant @envCtx,x,y 
						else if char2=='c' then obj = new app.Coala @envCtx,x,y
						else if char2=='e' then obj = new app.Eyes @envCtx,x,y
						toInit.push obj
					when 'p'
						obj = 
						toInit.push obj
					when 'M'
						obj = new app.Magnet @envCtx,x,y, @getDirection(char2)
					when 'l'
						obj = new app.MovingLaser @envCtx,x,y,@getOrientation(char2),@getDirection(char3)
					when '@'
						obj = new app.Blaster @envCtx,x,y, @getDirection(char2)
					when '0'
						obj = new app.Nothing @envCtx,x,y
					when '*'
						obj = new app.Blink @envCtx,x,y
						toInit.push obj
					when 'T'
						obj = new app.Teleport @envCtx,x,y,parseInt(char2),parseInt(char3)
						toInit.push obj
					when '?'
						obj = new app.QuestionMark @envCtx,x,y
					when '&'
						if char2 is '&'
							obj = new app.MightyLive @envCtx,x,y 
						else
							obj = new app.Live @envCtx,x,y 
					when '%'
						obj = new app.IonStorm @envCtx,x,y ,@getOrientation(char2)
						toInit.push obj
				@envCtx.setObjAt(x,y, obj)
		@envCtx.eventAggregator.publish 'starting-number-of-bolts', bolts
		for o in toInit
			o.init()
		@envCtx.eventAggregator.publish 'level-loaded', bolts
		return
	getDirection: (char) ->
		switch char
			when '>'
				return 'right'
			when 'v'
				return 'down'
			when '<'
				return 'left'
			when '^'
				return 'up'

	getOrientation: (char) ->
		switch char
			when '|'
				return 'vertical'
			when '-'
				return 'horizontal'

