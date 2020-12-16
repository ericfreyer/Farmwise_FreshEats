//bing AJAX
 function GetMap(){
     var map = new Microsoft.Maps.Map('#myMap',{
         credentials: "AhmEVg3cDIQvEx4OvVH3WN-1ioOTBoC4176hphjoyr8OlMHoPDHNfmIq8VQLVGbO",
         center: new Microsoft.Maps.Location(40.7128, 74.0060)
     })
     
 }














//usad AJAX

var queryURL = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip)


$.ajax({
    type: "GET",
    url: queryURL
}).then(function(response) {
    console.log(response)
})