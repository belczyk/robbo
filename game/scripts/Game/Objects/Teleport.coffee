window.app = window.app ? {}
app = window.app

class app.Teleport extends app.Object
	@include (new app.Animatable())
	@include new app.Bombblowable()
	constructor: (@envCtx,@x,@y,@number,@seqNum) ->
		
		super('teleport-d')
		@deltas = new app.RingArray([[0,-1],[1,0],[0,1],[-1,0]])
		@siblings = new app.RingArray()
		@eventAggregator.subscribe 'robbo-moving', 
							((x,y,delta) => @teleport(delta) ),
							this,
							(x,y)=> x == @x and y == @y
		@eventAggregator.subscribe 'teleport-receive', 
							((number,seqNum,delta,origin,robbo) => @receive(delta,origin,robbo) ),
							this,
							(number,seqNum)=> number==@number and seqNum==@seqNum
		@eventAggregator.subscribe 'teleport-destroyed', 
							((number,seqNum) => @onTeleportDestroyed(seqNum) ),
							this,
							(number)=> number==@number
		@eventAggregator.subscribe 'teleport-powered-up', 
							((number,seqNum) => @onTeleportPoweredUp(seqNum) ),
							this,
							(number,seqNum)=> number==@number

	onTeleportPoweredUp: (seqNum)->
		@siblings.push seqNum

	onTeleportDestroyed: (seqNum)->
		@siblings.popWhere (i)=>i==seqNum



	receive: (delta,origin,robbo)->
		if origin isnt @seqNum and not @canReceive()
			@eventAggregator.publish 'teleport-receive',@number,@siblings.getNextTo(@seqNum),delta,origin,robbo
			return 

		newX = delta.x(@x)
		newY = delta.y(@y)
		obj = @envCtx.getObjAt newX,newY
		if obj is null
			@materialize robbo,newX,newY
		else 
			@receive new app.Delta(@deltas.getNextTo(delta.coords,(i1,i2)->i1[0]==i2[0] and i1[1]==i2[1])),origin,robbo


	canReceive: () ->
		available = 0
		for i in [0..3]
			delta =new app.Delta(@deltas.get i)
			if (@envCtx.getObjAtD this,delta) is null
				available++

		return available>0
			
	materialize: (robbo, x,y)->
		
		robbo.x = x
		robbo.y = y
		@eventAggregator.publish 'robbo-teleported',x,y
		blink = new app.Blink @envCtx,robbo.x,robbo.y,-1, ()=>
															@envCtx.putObj robbo
															robbo.activate()
															
		blink.init()

	init: ()->
		@animations=[new app.Animation 'teleport',['teleport-a','teleport-d'],app.Predef.Teleport.animationDelay]
		@animate 'teleport'

		@eventAggregator.publish 'teleport-powered-up',@number,@seqNum

	onBlowUp: () ->
		@eventAggregator.publish 'teleport-destroyed',@number,@seqNum
		@eventAggregator.unsubscribe this

	teleport: (delta) ->
		robbo = @envCtx.getRobbo()
		robbo.deactivate()
		@dematerialize robbo,()=>@eventAggregator.publish 'teleport-receive',@number,@siblings.getNextTo(@seqNum),delta,@seqNum,robbo
		@envCtx.sound 'teleport'	
		
	dematerialize: (robbo,callback) ->
		blink = new app.Blink @envCtx,robbo.x,robbo.y,1, callback
		@envCtx.setObjAt robbo.x,robbo.y,blink
		blink.init()