window.app = window.app ? {}
app = window.app


class app.AssetLoader
	@assets = {}
	@width = 32
	@height = 32
	@getAsset: (name) ->
		if app.ColorTranslation?.isChanged
			@assets = {} 
			app.ColorTranslation.isChanged =false
		asset = @assets[name]

		if  not asset?
			@assets[name] = @loadAsset(name)


		return @assets[name]

	@loadAsset: (name) -> 
			ctx = $('.assetLoad').get(0).getContext('2d')

			imageData = ctx.createImageData @width,@height
			asset = app.Assets[name]
			for y in [0..31]
				for x in [0..31]
					colorNum = asset[y][x]
					color = app.ColorTranslation[colorNum]
					i = y*32+x
					@setPixel(imageData,i,color.to)

			return imageData

	@getPixel: (data,n) ->
		[data.data[n*4],data.data[n*4+1],data.data[n*4+2],data.data[n*4+3]]
	
	@compareColor: (col1,col2) ->
		return col1[0]==col2[0] and col1[1]==col2[1] and col1[2]==col2[2] and col1[3]==col2[3]

	@setPixel: (data,n,color) ->
		for i in [0..3]
			data.data[n*4+i]=color[i]