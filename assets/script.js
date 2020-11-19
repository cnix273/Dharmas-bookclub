$("#test").on("click", function(){
    console.log("hello world, the click worked");
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
        // get # 1 best seller's Title
        console.log(response.results.books[0].title);
        var best_1 = response.results.books[0].title
        // API URL for 2nd API Get using book title from 1st CALL
        var queryURL2 = "https://www.googleapis.com/books/v1/volumes?api_key=AIzaSyCvCbHEsrmpcGgxQmcSNDGpO1ghA3dcQUU&q="+best_1 ;
        $.ajax({
          url: queryURL2,
          method: "GET"
        })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response2) {
            // GET MATURITY RTING FOR THE BOOK
            console.log(response2.items[0].volumeInfo.maturityRating);
          });
      });
})

console.log("Congrats, your Javascript File is linked");