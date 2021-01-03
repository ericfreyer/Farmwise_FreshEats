$(document).ready(function () {
  var attribution = new ol.control.Attribution({
    collapsible: true,
  });
  var zoomSlider = new ol.control.ZoomSlider();
  
  
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
        maxZoom: 19,
        zoom: 10
      })
    });
    map.addControl(zoomSlider);

  getItem()
  $("#farmersList").hide();
  $("#moreInfo").hide();
  $("#map").hide();
  $("#newTitle").hide();
  $(".images-arrow").hide();

  var zipsArry = []

  
  $(".waves-teal").on("click", function () {
  $("#div").empty()
  $(".images-arrow").show()
  $(".header").attr("style", "display: none;")
  $("#newTitle").show();
  $(".brand-logo").append("<p>").attr("id", "betterFresh");
  $("#betterFresh").text("It's always better local!")

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
          var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 46],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: "Images/icon.png"
            })
          })
          var pinDrop = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([latLong[1], latLong[0]]))
                    })
                ]
            })
        });
        pinDrop.setStyle(iconStyle)
        var pinExtent = pinDrop.getSource().getExtent();
        map.addLayer(pinDrop);
        if (pinDrop) {
          map.getView().fit(pinExtent)
        }
        });
      });
    });storeItem() 
  });


//click stored zip buttons
$(".re-zip").on("click", function () {
  $("#div").empty()
  $("#newTitle").show();
  $(".images-arrow").show()
  $(".header").attr("style", "display: none;")

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
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "Images/icon.png"
      })
    })
    var pinDrop = new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([latLong[1], latLong[0]]))
              })
          ]
      })
  });
  var pinExtent = pinDrop.getSource().getExtent();
  pinDrop.setStyle(iconStyle)
  map.addLayer(pinDrop);
  if (pinDrop) {
    map.getView().fit(pinExtent)
  }

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
