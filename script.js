var zipcode = 11385
var queryURL = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipcode)


$.ajax({
    type: "GET",
    url: queryURL
}).then(function(response) {
    console.log(response)

id = (response.results[0].id)

var queryURL2 = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id)

$.ajax({
    type: "GET",
    url: queryURL2
}).then(function(data) {
    console.log(data)
})
})


