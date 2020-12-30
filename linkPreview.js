var attribution = new ol.control.Attribution({
  collapsible: true
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution: false}).extend([attribution]),
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-73.935242, 40.730610]),
      maxZoom: 20,
      zoom: 10
    })
  });
