$(document).ready(function () {
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
  

  getItem()
  $("#farmersList").hide();
  $("#moreInfo").hide();
  $("#map").hide();

  var zipsArry = []

  
  $(".waves-teal").on("click", function () {
  $("#div").empty()
  $(".header").attr("style", "display: none;")
  $("#newTitle").text("Farmwise Fresh Eats.")

  var searchZips = $(".search-form").val().trim()
  zipsArry.push(searchZips)
  $("#storedZips").append($("<button>").attr("class", "re-zip").text(searchZips))
  
    function storeItem(){
    localStorage.setItem("zips", JSON.stringify(zipsArry))
    var savedZips = JSON.parse(localStorage.getItem("zips"))
    if (searchZips !== null){
      searchZips = savedZips
    } 
  }


    var zipcode = $(".search-form").val().trim();
    // var zipcode = 11385
    var queryURL =
      "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" +
      zipcode;

    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      console.log(response);
      $("#farmersList").show();
      $("#map").show();
      var div = $("<div>").attr("id", "div");
      
      $("#farmersList").append(div);

        
      for (let i = 0; i < response.results.length; i++) {
        if(i==10) break;
        var marketName = (response.results[i].marketname).replace(/\d/g,'').replace(/\./g, "")
        var newBtn = $("<button>")
          .attr("class", "farm-list")
          .attr("id", i)
          .text(marketName)
          .attr("value", i)
          
        $("#div").append(newBtn);
      }

      $(".farm-list").on("click", function () {
        var i = $(this).attr("value");
        var id = response.results[i].id;
        var queryURL2 =
          "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" +
          id;

        $.ajax({
          type: "GET",
          url: queryURL2,
        }).then(function (data) {
            $("#moreInfo").show();
          console.log(data);
          
          $("#list").on("click", function () {});
          console.log(data.marketdetails.Address);
          //address

          $("#address").text(data.marketdetails.Address);
          //google map link
          var googleLink = data.marketdetails.GoogleLink;
          $("<a>", {
            text: "Map Link",
            title: "Google Map",
            href: googleLink,
            click: function () {
              BlahFunc(options.rowId);
              return false;
            },
          }).appendTo("#address");
          //products

          $("#products").text(
            "What is available at this market: " + data.marketdetails.Products
          );
          //Schedule
          var Schedule = data.marketdetails.Schedule;
          var string = Schedule.split(";")[0];
          $("#schedule").text("Hours of Operation: " + string);
          var geoReg = /[-]?[\d]+[.][\d]*/g;
          var coordArray = googleLink;
          var latLong = coordArray.match(geoReg);
          console.log(latLong);
          var pinDrop = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([latLong[1], latLong[0]]))
                    })
                ]
            })
        });
        map.addLayer(pinDrop);
        // var tileLayer = new TileLayer({
        //   source: new OSM({
        //     wrapX: false,
        //   }),
        // });
        // function ping (pinDrop) {
        //   var execute = new Date().getTime();
        //   var listen = tileLayer.on("postrender", firePing);
        //   function firePing(event) {
        //     var vectorContext = getVectorContext(event);
        //     var frameState = event.frameState; 
        //     var flashGeom = feature.getGeometry().clone();
        //     var elapsed = frameState.time - execute;
        //     var elapsedRatio = elapsed / duration;
        //     var radius = easeOut(elapsedRatio) * 15 + 5;
        //     var opacity = easeOut(1 - elapsedRatio);
        //     var style = new Style({
        //       image: new CircleStyle({
        //         radius: radius,
        //         stroke: new Stroke({
        //           color: 'rgba(255, 0, 0, ' + opacity + ')',
        //           width: 0.25 + opacity,
        //         }),
        //       }),
        //     });
        //     vectorContext.setStyle(style);
        //     vectorContext.drawGeometry(flashGeom);
        //     if (elapsed > duration) {
        //       unByKey(listen);
        //       return;
        //     }
        //     map.render()
        //   }
        // }
        // pinDrop.on('addLayer', ping())
        });
      });
    });storeItem() 
  });


//click stored zip buttons
$(".re-zip").on("click", function () {
  $("#div").empty()
  var zipcode = $(".re-zip").text().trim();

  var queryURL =
    "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" +
    zipcode;

  $.ajax({
    type: "GET",
    url: queryURL,
  }).then(function (response) {
    console.log(response);
    $("#farmersList").show();
    $("#map").show();
    var div = $("<div>").attr("id", "div");
    
    $("#farmersList").append(div);

    for (let i = 0; i < response.results.length; i++) {
      if(i==10) break;
      var marketName = (response.results[i].marketname).replace(/\d/g,'').replace(/\./g, "")
      var newBtn = $("<button>")
        .attr("class", "farm-list")
        .attr("id", i)
        .text(marketName)
        .attr("value", i)
        
      $("#div").append(newBtn);
    }

$(".farm-list").on("click", function () {
  console.log("working!")

  var i = $(this).attr("value");
  var id = response.results[i].id;
  var queryURL2 =
    "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" +
    id;

  $.ajax({
    type: "GET",
    url: queryURL2,
  }).then(function (data) {
      $("#moreInfo").show();
    console.log(data);
    
    $("#list").on("click", function (){});
    console.log(data.marketdetails.Address);
    //address

    $("#address").text(data.marketdetails.Address);
    //google map link
    var googleLink = data.marketdetails.GoogleLink;
    $("<a>", {
      text: "Map Link",
      title: "Google Map",
      href: googleLink,
      click: function () {
        BlahFunc(options.rowId);
        return false;
      },
    }).appendTo("#address");
    //products

    $("#products").text(
      "What is available at this market: " + data.marketdetails.Products
    );
    //Schedule
    var Schedule = data.marketdetails.Schedule;
    var string = Schedule.split(";")[0];
    $("#schedule").text("Hours of Operation: " + string);
    var geoReg = /[-]?[\d]+[.][\d]*/g;
    var coordArray = googleLink;
    var latLong = coordArray.match(geoReg);
    console.log(latLong);
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([latLong[1], latLong[0]]))
              })
          ]
      })
  });
  map.addLayer(layer);
  });
});
});
})

//get stored item
  function getItem(){
    var getItem = JSON.parse(localStorage.getItem("zips"))
     var arrayOfValues = [];
     function newButton(){
         for(var i in getItem){
         if(getItem.hasOwnProperty(i)){
             arrayOfValues.push(getItem[i]);
         }}
         for (let i = 0; i < arrayOfValues.length; i++) {
             var button = $("<button>").attr("class", "re-zip").text(arrayOfValues[i])
         $("#storedZips").append(button)
         };     
     } 
     newButton()
  }



})
