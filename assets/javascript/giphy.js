
//Create array
var topics = ["Lion King", "Harry Potter", "Avengers", "Titanic", "Chicken Little"];

//Set image status as static to begin with
var imageStatus = "static";

//API
var api_key = "IKTIZEDcWRe7064mFqZMwtYIumznzKbZ";
var q;

function getGiphy() {
    q = $(this).attr("data-name");
    console.log(q);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key +
        "&q=" + q + "&limit=10&offset=0&rating=PG-13&lang=en";
    console.log(queryURL);
    $("#giphySection").empty();
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var j = 0; j < response.data.length; j++) {
            var giphyOriginal = response.data[j].images.original.url;
            var giphyStill = response.data[j].images.original_still.url;
            var giphyRatingResult = response.data[j].rating;                   
            var images = $("<img>");
            var giphyRating = $("<span>"); 
            giphyRating.addClass("rating");
            images.attr("src", giphyOriginal);
            images.attr("srcset", giphyStill);
            images.attr("status", status);
            images.addClass("gifs");
            
            var gifDiv = $('<div class="gifDiv">');
        
            $("#giphySection").append(gifDiv);
            $(gifDiv).append(giphyRating.text("Rating: " + giphyRatingResult));
            $(gifDiv).append(images);
            
            
            
            
        }
    })
}

//Image clicks
$(document).on("click", ".gifs", function () {
    var originalURL = $(this).attr("src");
    var stillURL = $(this).attr("srcset");
    console.log(stillURL);
    console.log(imageStatus);

    //If image is static, change it to original 
    if (imageStatus == "static") {
        console.log("image is static");
        $(this).attr("srcset", originalURL);
        $(this).attr("src", stillURL);
    }
    //If image is animated, change it to static image
    else {
        console.log("image is not static");
        $(this).attr("srcset", stillURL);
        $(this).attr("src", originalURL);
    }    
});

//Display buttons
function displayBtns() {
    $("#btnSection").empty();

    for (i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("btnClass");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#btnSection").append(btn);
    }
}

displayBtns();

//Save user input into an array & call function to display updated buttons
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    var userInput = $("#userInput").val().trim();
    topics.push(userInput);
    console.log(topics);
    displayBtns();
    $("#userInput").val("");
});

//When button is clicked,display giphy using api
$(document).on("click", ".btnClass", getGiphy);




