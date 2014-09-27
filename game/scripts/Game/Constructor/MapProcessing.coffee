window.app = window.app ? {}
app = window.app

class app.MapProcessing
	constructor: ()->

	initTeleportNetwork: (map)->
		mapStruct = new app.MapStruct(map)
		nums = @getTeleportNums mapStruct
		for num in nums 
			mapStruct = @setTeleportSeq mapStruct,num

		mapStruct.toString()

	setTeleportSeq: (mapStruct,num)->
		seq = 0
		mapStruct.forEach (x,y,sign)->
			if sign? && sign.length==3 && sign[0]=="T" && sign[1]==num.toString()
				sign = "T#{num}#{seq}"
				mapStruct.set x,y,sign
				seq++
			return
		mapStruct

	getTeleportNums: (mapStruct) -> 
		nums = []
		mapStruct.forEach (x,y,sign)->
			if sign? and sign.length ==3 && sign[0]=="T"
				nums.push sign[1] if !nums.contains(sign[1])
		nums

	removeTeleportSeqNumbers: (map) ->
		map.replace(///T(\d).///g,'T$1.')

	removeEmptyLines: (map) ->
		lines = map.split '\n'
		resLines = []

		for line in lines
			resLines.push(line) unless line=='' || line=="\n"
		
		resLines.join '\n'



	preSaveProcessing: (map) ->
		map = @initTeleportNetwork(map)
		map = @removeEmptyLines(map)
		map