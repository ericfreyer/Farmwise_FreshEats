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
    lang: 'en-US', 
    placeholder: 'Search for ...',
    targetType: 'text-input',
    limit: 5,
    keepOpen: true
  });
  map.addControl(geocoder);
