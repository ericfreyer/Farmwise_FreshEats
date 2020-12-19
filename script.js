$(document).ready(function () {  

  
// $("<button>").attr("id", "button").text("YPPPPPPP")
// $(".container").append("#button")





    $("#search-this").on("click", function(){
    // event.preventDefult()

    var zipcode = $(".search-form").val().trim()
    // var zipcode = 11385
    var queryURL = ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipcode)

    $.ajax({
        type: "GET",
        url: queryURL
    }).then(function(response) {
        console.log(response)
        var div = $("<div>").attr("id", "div")
        $("#farmersList").append(div)
        div.attr("style", "display:inline-block")
        var newBtn = $("<button>")
        for (let i = 0; i < response.results.length; i++) {
            
            (newBtn).attr("class", "farm-list")
            $(".farm-list").text(response.results[i])
            $("#div").append(newBtn)   
            
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
   })