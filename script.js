$(document).ready(function () {
  $("#farmersList").hide();
  $("#moreInfo").hide();
  $("#map").hide();

  $(".waves-teal").on("click", function () {
    // event.preventDefult()

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
          "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" +
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
        });
      });
    });
  });
});
