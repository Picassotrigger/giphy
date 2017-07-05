// ===================   MAIN ARRAY   ===================//
var mainArray = ["picasso", "michelangelo", "van gogh", "monet", "da vinci", "rembrandt", "warhol", "degas", "renoir", "dali", "matisse", "cezanne", "kandinsky", "pollock", "gauguin", "manet", "basquiat", "munch"];




// ===================   HTML ELEMENTS   ===================//
var gifDisplay = $("<div>");
gifDisplay = gifDisplay.attr("id", "gifDisplay");
$("body").prepend(gifDisplay);

var buttonDisplay = $("<div>");
buttonDisplay = buttonDisplay.attr("id", "buttonDisplay");
$("body").prepend(buttonDisplay);

var searchButton = $("<button>");
searchButton = searchButton.attr("id", "searchButton").attr("type", "submit").text("Submit");
$("body").prepend(searchButton);

var searchInput = $("<input>");
searchInput = searchInput.attr("id", "searchBox").attr("placeholder", "Add another search button here.");
$("body").prepend(searchInput);

var searchTerm;



// ===================   FUNCTIONS   ===================//
function loopArray(array) {
  mainArray.sort();

  $.each(array, function(index, value) {
    var button = $("<button>");
    button = button.attr("id", value).attr("value", value).text(value).addClass("targetButton");
    $("div#buttonDisplay").append(button);
  });
}

function addNewButton() {
  var button = $("<button>");
  var newName = $("input#searchBox").val().trim();
  button = button.text(newName);
  mainArray.push(newName);
  $("div#buttonDisplay").empty();
  loopArray(mainArray);
  $("input#searchBox").val("");
}

function ajaxCall() {
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=38158f17043d417fb1dad926a1879ac6&limit=5"

  $.ajax({
    url: queryURL,
    type: "GET",
    dataType: "JSON",
    // data: {param1: 'value1'}
  })
  .done(function(response) {
    console.log("success");
    console.log(queryURL);
    console.log(response);

    var results = response.data;
    console.log(results);

    for(var i= 0; i < results.length; i++) {

      var resultsDiv = $("<div>");
      resultsDiv.addClass("gifBox");

      var resultsRating = $("<p>").text("Rating: " + results[i].rating);

      var resultsImage = $("<img>");
      resultsImage.attr("src", results[i].images.fixed_height.url);

      resultsDiv.append(resultsRating);
      resultsDiv.append(resultsImage);

      $("div#gifDisplay").prepend(resultsDiv);
    }

  })
  .fail(function(response) {
    console.log("error");
  })
  .always(function(response) {
    console.log("complete");
  });
}


// ===================   MAIN   ===================//
loopArray(mainArray);

$("button#searchButton").on("click", addNewButton);

$(document).on("click", ".targetButton", function() {
  console.log(this.value);
  searchTerm = this.value;
  ajaxCall();
});
