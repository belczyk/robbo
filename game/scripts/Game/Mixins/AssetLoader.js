var app, _ref;

window.app = (_ref = window.app) != null ? _ref : {};

app = window.app;

app.AssetLoader = (function() {

  function AssetLoader() {}

  AssetLoader.assets = {};

  AssetLoader.width = 32;

  AssetLoader.height = 32;

  AssetLoader.getAsset = function(name) {
    var asset, _ref1;
    if ((_ref1 = app.ColorTranslation) != null ? _ref1.isChanged : void 0) {
      this.assets = {};
      app.ColorTranslation.isChanged = false;
    }
    asset = this.assets[name];
    if (!(asset != null)) {
      this.assets[name] = this.loadAsset(name);
    }
    return this.assets[name];
  };

  AssetLoader.loadAsset = function(name) {
    var color, ctx, image, imageData, x, y, _i, _j;
    ctx = $('.assetLoad').get(0).getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    imageData = ctx.getImageData(0, 0, this.width, this.height);
    image = app.Assets[name];
    for (x = _i = 0; _i <= 31; x = ++_i) {
      for (y = _j = 0; _j <= 31; y = ++_j) {
        color = [0, 0, 0, 0];
        if (image[x][y] > 0) {
          color = app.ColorTranslation[image[x][y] - 1].to;
        }
        this.setPixel(imageData, x * 32 + y, color);
      }
    }
    return imageData;
  };

  AssetLoader.getPixel = function(data, n) {
    return [data.data[n * 4], data.data[n * 4 + 1], data.data[n * 4 + 2], data.data[n * 4 + 3]];
  };

  AssetLoader.compareColor = function(col1, col2) {
    return col1[0] === col2[0] && col1[1] === col2[1] && col1[2] === col2[2] && col1[3] === col2[3];
  };

  AssetLoader.setPixel = function(data, n, color) {
    var i, _i, _results;
    _results = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      _results.push(data.data[n * 4 + i] = color[i]);
    }
    return _results;
  };

  return AssetLoader;

})();
