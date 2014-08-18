window.app = window.app ? {}
app = window.app
app.Const =
	speed1: 200


app.Predef =
		Const:
			speed1: 100
		Game: 
			lives: 1
		Ammo:
			numOfCharges: 9
		Robbo:
			movementDelay: 80
			changeStateDelay: 50
		Bat:
			movementDelay: app.Const.speed1
		Circlewalker:#ant and coala
			movementDelay: app.Const.speed1
		Blast:
			movementDelay: app.Const.speed1
		Blink:
			animationDelay: 100

		ContainerWithWheels:
			movementDelay: app.Const.speed1

		DisappearingAnimation:
			defaultAnimationDelay: 150

		Eyes:
			movementDelay: 370
		FiringBat:
			movementDelay: app.Const.speed1
		LaserBeam:
			movementDelay: app.Const.speed1
		Magnet:
			dragDelay: 100
		MovingLaser:
			movementDelay: 400
		Ship:
			animationDelay: 500
		Smoke:
			animationDelay: 150
		StableBeam:
			movementDelay: 200
		Teleport:
			animationDelay: 500
		IonStorm:
			movementDelay: app.Const.speed1
