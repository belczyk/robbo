#module('Tools ')
#test "Test random" , () ->
#	console.log 'Normal rand'
#	results = {}
#	for i in [0..1000]
#		if not results[i]? and i<11 then results[i]=0
#		r = app.Tools.getRand(0,10)
#		if results[r]?
#			results[r]++
#		else 
#			results[r]=1
#	
#	for prop,val of results
#		console.log "#{prop}: #{val} times"
#
#	equal(1,1)
#
#test "Test gausian random" , () ->
#	console.log 'Gauss rnad:'
#	results = {}
#	for i in [0..100000]
#		if not results[i]? and i<11 then results[i]=0
#		r = app.Tools.getGaussRand(0,11,3)
#		if results[r]?
#			results[r]++
#		else 
#			results[r]=1
#	
#	for prop,val of results
#		console.log "#{prop}: #{Math.round(val/1000,2)}%"
#
#	equal(1,1)


window.app = window.app ? {}
app = window.app


module('Array tools')

test "skip returns proper array", () ->
	arr = [1,2,3,4,5,6,7,8]

	skiped = arr.skip 2

	equal skiped[0],3
	equal skiped.length,6
