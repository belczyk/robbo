window.app = window.app ? {}
app = window.app

class app.RingArray 
	constructor: (@innerArray) ->
		@innerArray?=[]
		@length=@innerArray.length

	push: (obj) -> 
		@innerArray.push obj
		@length++
		@innerArray.sort()	

	popWhere: (func) ->
		i = @getIndex(@innerArray.single(func))
		if i is null then return
		@innerArray[i]=null
		@innerArray = @innerArray.where((i)->i?)
		@length--

	getIndex: (obj) ->
		for item,i in @innerArray
			if item==obj 
				return i
		return null

	getNextTo: (obj,comparer) ->
		comparer?=(i1,i2)->i1==i2

		for item,i in @innerArray
			if comparer item,obj 
				if i==@length-1
					return @innerArray[0]
				return @innerArray[i+1]
		return null

	get: (i) -> @innerArray[i]