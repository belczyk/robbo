window.app = window.app ? {}
app = window.app

class app.AssetLoader
	@width = 32
	@height = 32
	@assetCanvas = null
	@getAsset: (name) ->
		if !@assetCanvas?
			@assetCanvas =  $('.assetLoad')[0].getContext("2d")
		asset = app.Assets[name]
		imgData = @assetCanvas.createImageData(32,32)
		for y in [0..31]
			for x in [0..31]
				color = app.ColorTranslation[asset[y][x]].to
				i = y*32+x
				imgData.data[i+0]=color[0]
				imgData.data[i+1]=color[1]
				imgData.data[i+2]=color[2]
				imgData.data[i+3]=color[3]
		return imgData


	@getPixel: (data,n) ->
					[data.data[n*4],data.data[n*4+1],data.data[n*4+2],data.data[n*4+3]]

	@compareColor: (col1,col2) ->
						return col1[0]==col2[0] and col1[1]==col2[1] and col1[2]==col2[2] and col1[3]==col2[3]

	@setPixel: (data,n,color) ->
					for i in [0..3]
						data.data[n*4+i]=color[i]