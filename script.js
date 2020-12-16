//bing AJAX
//  function GetMap(){
//      var map = new Microsoft.Maps.Map('#myMap',{
//          credentials: "AhmEVg3cDIQvEx4OvVH3WN-1ioOTBoC4176hphjoyr8OlMHoPDHNfmIq8VQLVGbO",
//          center: new Microsoft.Maps.Location(40.7128, 74.0060),
//          mapTypeId: Microsoft.Maps.MapTypeId.aerial,
//          zoom: 10

//      })
     
//  }














//usad AJAX

var queryURL = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=11385")


$.ajax({
    type: "GET",
    url: queryURL
}).then(function(response) {
    console.log(response)



//second AJAX to get location 

// var queryURL2 = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + (response[i].id))
// $.ajax({
//     type: "GET",
//     url: queryURL2
// }).then(function(data) {
//     console.log(data)

// })
})