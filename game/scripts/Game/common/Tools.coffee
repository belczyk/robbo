window.app = window.app ? {}
app = window.app

Array.prototype.where = (predicat) ->
	item for item in this when predicat(item)		

Array.prototype.single = (predicat) ->
	items = []
	items.push item for item in this when predicat(item)

	return items[0] unless items.length isnt 1

	return null if items.length is 0

	throw "Many items for given predicat"

Array.prototype.top = (n)-> this.slice(0,n)

Array.prototype.skip = (n) -> 
	this.slice n,this.length

Array.prototype.firstIndexOf = (predicat)->
	for e,i in this
		if predicat(e)
			return i
	-1

Array.prototype.any = (predicat) ->
	if predicat?
		items = []
		items.push item for item in this when predicat(item)

		return items.length>0

	return this.length>0

Array.prototype.contains = (obj)->
	for item in this
		if item == obj
			return true
	false
Array.prototype.first = () ->
	this[0]

Array.prototype.select = (selector) ->
	ret = []
	for item in this
		ret.push selector(item)
	ret
	
Array.prototype.last = () ->
	this[this.length-1]

Array.prototype.max = (predicat) ->
	if this.length == 0 then return 

	val = predicat(this[0])

	if this.length == 1 then return val
	
	for i in [1..this.length-1]
		val = predicat(this[i]) if predicat(this[i])>val



app.Tools ={}
app.Tools.getRand=(x,y) ->		
		for i in [0..113]
			Math.random()
		Math.floor((Math.random()*(y+1))+x)

app.Tools.getGaussRand = (a,b, stdev)->
	res = Math.round(app.Tools.rnd_snd()*stdev+((a+b)/2))
	if res>b then res = b
	if res<a then res = a
	res

app.Tools.rnd_snd = () ->
	return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);

String.prototype.rgbaToArray = () ->
	val = this.toString()
	val = val.replace("rgba","")
	val = val.replace(")","")
	val = val.replace("(","")
	vals = val.split(',')
	nums = []
	for num in vals
		nums.push parseFloat(num)
	nums[3] = 255*nums[3]
	nums
Array.prototype.toRgbaString = ()->
	return "rgba(#{this[0]},#{this[1]},#{this[2]},#{this[3]})"