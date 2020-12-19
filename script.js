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
        


        

        for (let i = 0; i < response.results.length; i++) {
           var newBtn = $("<button>").attr("class", "farm-list").attr("id", "list" + i).text(response.results[i].marketname)
            $("#div").append(newBtn) 


         }

        $("#div").attr("style", "display:inline-block")



         $("#list").on("click", function(){

         
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
})