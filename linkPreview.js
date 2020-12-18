$(document).ready(function () {  
    console.log("linked")
    var previewLink = $("#testID").val();
    var queryUrl = "http://api.linkpreview.net/?key=c63ac61ed8771c3995965c58411aa439&q=" + previewLink

    $("#targetId").click(function(event){
    event.preventDefault()
    $.ajax({
        
        url: queryUrl,
        method:"GET",
        success: function (response) {
            console.log(response)
            var imgPrev = $("<img>")
            $("#mapDiv").append(imgPrev)
            imgPrev.attr("src", response.image)
            imgPrev.attr("id", "myMap")
        }
    });
    })
})