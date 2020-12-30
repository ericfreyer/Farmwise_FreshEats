var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-73.935242, 40.730610]),
      zoom: 10
    })
  });

  var geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    targetType: 'text-input',
    lang: 'en',
    placeholder: 'Search for ...',
    limit: 5,
    keepOpen: false,
  });
  map.addControl(geocoder);
  
  geocoder.on('addresschosen', function(response) {
    console.log(response)
    var feature = response.feature,
      coord = response.coordinate,
      address = response.address;
  geocoder.getSource().clear();
  geocoder.getSource().addFeature(feature);
  });