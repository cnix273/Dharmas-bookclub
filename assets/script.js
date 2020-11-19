var searchBar = $("#search-bar");
var searchBtn = $("#search-button");
var bookList = $("#list")
var bestsellerBtn = $("#bestseller-button");
var bookSearch =$("#bookSearch")


bookSearch.on("click",function() {
  $(".searchBooks").show();
  $("#list").empty();

})





searchBtn.on("click", function() {
  var queryparameter = searchBar.val().trim();
  
  // API URL for 2nd API Get using book title from 1st CALL
  var queryURL2 = "https://www.googleapis.com/books/v1/volumes?api_key=AIzaSyCvCbHEsrmpcGgxQmcSNDGpO1ghA3dcQUU&q=" + queryparameter;
  $.ajax({
    url: queryURL2,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response2) {

      console.log(response2);

      bookList.empty();

      for(currentIndex=0; currentIndex<5; currentIndex++) {
        var main = $("<div>").attr({
            "id":currentIndex,
            "class":"book-list",
        });
        var bookTitle = $("<h3>").text(response2.items[currentIndex].volumeInfo.title);
        var bookImg = $("<img>").attr("src", response2.items[currentIndex].volumeInfo.imageLinks.thumbnail).attr("class", "thumbnail");
        var bookDescription = $("<p>").text(response2.items[currentIndex].volumeInfo.description);
        var bookAuthor = $("<h5>").text(response2.items[currentIndex].volumeInfo.author);

        main.append(bookTitle, bookAuthor, bookImg, bookDescription);

        bookList.append(main);
      };
    });
  
})


bestsellerBtn.on("click", function(){

  $(".searchBooks").hide();

    // NYT API KEY
    var APIKey = "wGMnvBDtb72OdTFeoSGYfHoRggjzSSGN";
    // NYT BEST SELLER API URL
    var queryURL="https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" + APIKey; ;
    // NYT API CALL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        console.log(response);

        bookList.empty();
        for(currentIndex=0; currentIndex<5; currentIndex++) {
          var main = $("<div>").attr({
              "id":currentIndex,
              "class":"book-list",
          });
          var bookRanking = $('<h3 class="rank">').text("# " + [currentIndex+1]+ " Best Seller" );
          var bookTitle = $("<h3>").text(response.results.books[currentIndex].title);
          var bookAuthor = $("<h5>").text("by : "+response.results.books[currentIndex].author);


          var bookImg = $("<img>").attr("src", response.results.books[currentIndex].book_image).attr("class", "thumbnail");
          var bookDescription = $("<p>").text(response.results.books[currentIndex].description);
          // var bookPrice = $("<h5>").text("$"+response.results.books[currentIndex].price);
          
         
          main.append(bookRanking, bookTitle, bookAuthor, bookImg, bookDescription);

          bookList.append(main);
        };
      });
})
$("[data-menu-underline-from-center] a").addClass("underline-from-center");

