window.app = window.app ? {}
app = window.app

class app.QuestionMark extends app.Object
	@include new app.Blowable()
	@include new app.Moveable()

	constructor: (@envCtx,@x,@y) ->
		@objects= [
			()=>(	
					ship = new app.Ship(@envCtx,@x,@y)#0
					ship.activateShip()
					return ship
			),
			()=>(
					eyes  = new app.Eyes(@envCtx,@x,@y)#1
					eyes.init()
					return eyes
					),
			()=>(
					smoke = new app.Smoke(@envCtx,@x,@y)#2
					smoke.init()
					smoke
				)

			()=>new app.Bolt(@envCtx,@x,@y),#3
			()=>new app.Ammo(@envCtx,@x,@y),#4
			()=>new app.Bomb(@envCtx,@x,@y),#5
			()=>new app.RotatingLaser(@envCtx,@x,@y)#6
			()=>new app.Container(@envCtx,@x,@y),#7
			()=>new app.Key(@envCtx,@x,@y),#8

			()=>new app.QuestionMark(@envCtx,@x,@y),#9
			()=> new app.Live(@envCtx,@x,@y),#10
			()=> new app.MightyLive(@envCtx,@x,@y),#11
			
			
		]
		super('question')

	blowUp: () ->	
		@envCtx.sound 'destruction'
		
		smoke = new app.Smoke(@envCtx,@x,@y,1,()=>@afterBlowup())
		@envCtx.putObj smoke
		smoke.init()



	afterBlowup: () ->
		@envCtx.putObj @objects[app.Tools.getGaussRand(0,11,3)]()