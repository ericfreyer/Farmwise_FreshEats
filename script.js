
$(document).ready(function () {

  getItem()
  $("#farmersList").hide();
  $("#moreInfo").hide();
  $("#map").hide();

  var zipsArry = []

  

  $(".waves-teal").on("click", function () {
  
    $("#storedZips").attr("style", "display:block");
    
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
          var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
              features: [
                new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat(latLong[1],latLong[0]))
                })
              ]
            })
          })
          map.addLayer(layer);
        });
      });
    });
  });
});

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

