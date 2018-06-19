
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
    $("#buttons").append(butt);
    }

}


$("#add-emotion").on("click", function(event){
    event.preventDefault();
    var emotion = $("#emotion").val().trim();
    topics.push(emotion);
    renderButtons();
    create();

});


function create(){
$("button").click(function(){
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

            var emotionImage = $("<img>");

            emotionImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(r);
            gifDiv.append(emotionImage);

            $("#gifs").append(gifDiv);
            
            

        
        }
        


    })

 
})

}