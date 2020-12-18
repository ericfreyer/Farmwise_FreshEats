










//usad AJAX

var queryURL = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip)


$.ajax({
    type: "GET",
    url: queryURL
}).then(function(response) {
    console.log(response)
})