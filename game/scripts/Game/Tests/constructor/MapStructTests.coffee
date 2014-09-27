window.app = window.app ? {}
app = window.app

module("MapStruct")
test "properly parse map to structure",()->
	mapStruct = new app.MapStruct """
	T10_.._.._.._.._.._..
	_.._.._.._.._.._.._..
	_.._.._.._.._.._.._..
	_.._.._..T21_.._.._..
	_..T38_.._.._.._.._..
	"""

	equal 7,mapStruct.width(),'correct width'
	equal 5,mapStruct.height(),'correct height'

test "properly parse map to structure when width and height even",()->
	mapStruct = new app.MapStruct """
	T10_.._.._.._.._..
	_.._.._.._.._.._..
	_.._.._.._.._.._..
	_.._.._..T21_.._..
	"""

	equal 6,mapStruct.width(),'correct width'
	equal 4,mapStruct.height(),'correct height'
	
test "properly parse map without empty line at the begining",()->
	mapStruct = new app.MapStruct """T10_.._.._.._.._..
	_.._.._.._.._.._..
	_.._.._.._.._.._..
	_.._.._..T21_.._..
	"""

	equal 6,mapStruct.width(),'correct width'
	equal 4,mapStruct.height(),'correct height'
