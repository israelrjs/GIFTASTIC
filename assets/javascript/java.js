
$( document ).ready(function() {
    renderButtons();
    create();
    
});

var topics = ['Awkward','Drunk','Hungry','Bored','Excited','Frustrated',]
function renderButtons(){
    $("#buttons").empty();
    for (i = 0; i < topics.length; i++){
    var butt = $("<button id='emotions'>" + topics[i] + "</button>");
    $('#emotions').attr('data-emotion');
    butt.addClass("printemotions")
    $("#buttons").append(butt);
    }

}


$("#add-emotion").on("click", function(event){
    event.preventDefault();
    var emotion = $("#emotion").val().trim();
    topics.push(emotion);
    renderButtons();
    create();
    $("#emotion").val("");

});


function create(){
$(".printemotions").click(function(){
$("#gifs").empty()
   var emo = $(this).text();
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZDXQ0E5M0xhfVPljJctvqGu8cGV0L1ku&q="
     + emo + 
    "&limit=10&offset=0&rating=G&lang=en";
console.log(queryURL);

    $.ajax({
    url: queryURL,
    method: "GET"
    })
        .then(function(response){
            var results = response.data;
    
            for (var i = 0; i < results.length; i++){

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var r = $("<p>").text("Rating: " + rating);

            var clickMe = $("<p>").text("Click ME!");

            r.addClass("rating");

            var emotionImage = $("<img>");

            var imageAnimated = results[i].images.fixed_height.url

            var imageStill = results[i].images.fixed_height_still.url

            emotionImage.attr("src", imageStill );

            emotionImage.attr("data-still",imageStill);

            emotionImage.attr("data-animate",imageAnimated);

            emotionImage.attr("data-state","still");

            emotionImage.addClass("emoImages");

            gifDiv.append(r);
            gifDiv.append(clickMe);
            gifDiv.append(emotionImage);

            $("#gifs").append(gifDiv);
            
            

        
        }
        


    })

 
})

}
$(document).on("click", ".emoImages", function() {
    
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
})