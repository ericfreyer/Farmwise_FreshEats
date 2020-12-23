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
  // var popup = new ol.Overlay.Popup();

  map.addControl(geocoder);
  // map.addOverlay(popup);

  geocoder.on('addresschosen', (evt) => {
    var feature = evt.feature,
      coord = evt.coordinate,
      address = evt.address;
  geocoder.getSource().clear();
  geocoder.getSource().addFeature(feature);
  });