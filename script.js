$(document).ready(function () {  

    // $("#search-this").on("click", function(event){
    // event.preventDefult()

    // var zipcode = $(".search-form").val().trim()
    var zipcode = 11385
    var queryURL = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipcode)


    $.ajax({
        type: "GET",
        url: queryURL
    }).then(function(response) {
        console.log(response)
        //create UL
        for (let i = 0; i < response.results.length; i++) {
            $("<button>").val(response.results[i]).attr("class", "farm-list")
            $("#farmerslist").append(".farm-list")
            
        }



    id = (response.results[0].id)

    var queryURL2 = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id)

    $.ajax({
        type: "GET",
        url: queryURL2
    }).then(function(data) {
        console.log(data)
    })
    })

}) 
//  })