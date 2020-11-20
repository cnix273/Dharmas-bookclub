// defining variables
var searchBar = $("#search-bar");
var searchBtn = $("#search-button"); 
var searchCtn = $(".searchBooks");
var bookList = $("#list");
var bestsellerBtn = $("#bestseller-button");
var bookSearch = $("#bookSearch");
var favoritesBtn = $("#favorites-button");
var arrayIndex = parseInt(localStorage.getItem("arrayIndex")) || 0;

// NYT API KEY & Path for Best Seller
var APIKey = "wGMnvBDtb72OdTFeoSGYfHoRggjzSSGN";
var queryURL="https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" + APIKey;

randomNewYorkTimes();

// Random NYT best seller display under Search Bar
function randomNewYorkTimes(){

// NYT API CALL
$.ajax({
  url: queryURL,
  method: "GET"
})
.then(function(response) {

  // Random Variable between 0 and 4 chooses from NYT top 5 to display at open of Homepage
  var randomIndex = Math.floor(Math.random() * 5);

  var openSuggestion = $("<div>").attr({
    "id":randomIndex,
    "class":"book-list"
  });

  // Pulling property values from API call object & formatting them for display
  var bookRanking = $("<h4>").text("Check out the New York Times # " + [randomIndex+1]+ " Best Seller").attr("style", "font-weight:bold");
  var additionalText = $("<p>").html("See Tab for more suggetions")
  var bookTitle = $("<h3>").text(response.results.books[randomIndex].title).attr("style", "font-weight:bold").addClass("text-center");
  var bookAuthor = $("<h5>").text("by: "+response.results.books[randomIndex].author).addClass("text-center");
  var bookDescription = $("<p>").text(response.results.books[randomIndex].description).attr("style", "font-style:italic");

  // Creates Book Image and attaches a link to buy book using API object's first URL option
  var buyBook = $("<a>").attr("href", response.results.books[randomIndex].buy_links[0].url);
  var bookImg = $("<img>").attr("src", response.results.books[randomIndex].book_image).attr("class", "thumbnail");

  // Append & Displays all elements of current object into the page.
  buyBook.append(bookImg);
  openSuggestion.append(bookRanking, additionalText, bookTitle, bookAuthor, buyBook, bookDescription);
  bookList.append(openSuggestion);
  
  // Script to remove Google Error
  document.cookie = 'cross-site-cookie=bar; SameSite=Lax';
})}


// Book search tab clears web page & populates Search form for user to search Google API via Author
bookSearch.on("click",function() {
  searchCtn.show();
  $("#list").empty();
  randomNewYorkTimes();
})


// Book Search Button searches Google Books for User Desired Author Input
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

      //testing for API call object
      console.log(response2); 

      // Empties page for new elements
      bookList.empty();

      // For Loop builds top 5 objects found related to User's Input from Google Books API
      for(currentIndex=0; currentIndex<5; currentIndex++) {
        var main = $("<div>").attr({
            "id":currentIndex,
            "class":"book-list",
        });

        // Pulling property values from API call object & formatting them for display
        var bookTitle = $("<h3>").text(response2.items[currentIndex].volumeInfo.title).attr("style", "font-weight:bold").addClass("text-center");        
        var bookDescription = $("<p>").text(response2.items[currentIndex].volumeInfo.description).attr("style", "font-style:italic");
        var bookAuthor = $("<h5>").text("by: " + response2.items[currentIndex].volumeInfo.authors).addClass("text-center");
        var favoriteBookButton = $("<button class='button favorite'>").text("Favorite this Book.").attr("id", currentIndex);
        // Creates Book Image and attaches a link to buy book using API object's first URL option
        var buyBook = $("<a>").attr("href", response2.items[currentIndex].saleInfo.buyLink);
        var bookImg = $("<img>").attr("src", response2.items[currentIndex].volumeInfo.imageLinks.thumbnail).attr("class", "thumbnail");

        // Append & Displays all elements of current object into the page.
        buyBook.append(bookImg);
        main.append(bookTitle, bookAuthor, buyBook, bookDescription, favoriteBookButton);
        bookList.append(main);

        
        // Script to remove Google Error
        document.cookie = 'cross-site-cookie=bar; SameSite=Lax';
      };

      $(".favorite").on("click", function() {
        var bookIndex = this.id;
        var selectedOption = response2.items[bookIndex].volumeInfo.title + "+" + response2.items[bookIndex].volumeInfo.authors;
        localStorage.setItem(arrayIndex, selectedOption);
        
        arrayIndex++;

        localStorage.setItem("arrayIndex", arrayIndex);

      })


    });
  
})

// Best Seller Tab Clears & Populates Webpage with Top 5 NYT Best Sellers List
bestsellerBtn.on("click", function(){

  searchCtn.hide();
    // NYT API CALL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        //testing for API call object
        console.log(response);

        // Empties page for new elements
        bookList.empty();

        // For loop builds first / top five object's from NYTime's Best Sellers List
        for(currentIndex=0; currentIndex<5; currentIndex++) {
          var main = $("<div>").attr({
              
              "class":"book-list",
          });
          
          // Pulling property values from API call object & formatting them for display
          var bookRanking = $('<h3 class="rank">').text("# " + [currentIndex+1]+ " Best Seller" );
          var bookTitle = $("<h3>").text(response.results.books[currentIndex].title).attr("style", "font-weight:bold").addClass("text-center");
          var bookAuthor = $("<h5>").text("by: "+response.results.books[currentIndex].author).addClass("text-center");
          var bookDescription = $("<p>").text(response.results.books[currentIndex].description).attr("style", "font-style:italic");
          var favoriteBookButton = $("<button class='button favorite'>").text("Favorite this Book.").attr("id", currentIndex);
          // Creates Book Image and attaches a link to buy book using API object's first URL option
          var buyBook = $("<a>").attr("href", response.results.books[currentIndex].buy_links[0].url);
          var bookImg = $("<img>").attr("src", response.results.books[currentIndex].book_image).attr("class", "thumbnail");
         
          // Append & Displays all elements of current object into the page.
          buyBook.append(bookImg);
          main.append(bookRanking, bookTitle, bookAuthor, buyBook, bookDescription, favoriteBookButton);
          bookList.append(main);

          
          
        // Script to remove Google Error
          document.cookie = 'cross-site-cookie=bar; SameSite=Lax';
        };

        $(".favorite").on("click", function() {
          var bookIndex = this.id;
          var selectedOption = response.results.books[bookIndex].title + "+" + response.results.books[bookIndex].author;
          localStorage.setItem(arrayIndex, selectedOption);
        
          arrayIndex++;
          
          localStorage.setItem("arrayIndex", arrayIndex);

        })

      });
})



// Book Search Button searches Google Books for User Desired Author Input
favoritesBtn.on("click", function() {
  

  bookList.empty();

  for (currentIndex = 0; currentIndex < arrayIndex; currentIndex++) {

  var queryparameter = localStorage.getItem(currentIndex);

  console.log(queryparameter);
  
  // API URL for 2nd API Get using book title from 1st CALL
  var queryURL2 = "https://www.googleapis.com/books/v1/volumes?api_key=AIzaSyCvCbHEsrmpcGgxQmcSNDGpO1ghA3dcQUU&q=" + queryparameter;
  $.ajax({
    url: queryURL2,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response2) {



      // Empties page for new elements
      


      // For Loop builds top 5 objects found related to User's Input from Google Books API
        var main = $("<div>").attr("class","book-list");


        // Pulling property values from API call object & formatting them for display
        var bookTitle = $("<h3>").text(response2.items[currentIndex].volumeInfo.title).attr("style", "font-weight:bold").addClass("text-center");        
        var bookDescription = $("<p>").text(response2.items[currentIndex].volumeInfo.description).attr("style", "font-style:italic");
        var bookAuthor = $("<h5>").text("by: " + response2.items[currentIndex].volumeInfo.authors).addClass("text-center");

        // Creates Book Image and attaches a link to buy book using API object's first URL option
        var buyBook = $("<a>").attr("href", response2.items[currentIndex].saleInfo.buyLink);
        var bookImg = $("<img>").attr("src", response2.items[currentIndex].volumeInfo.imageLinks.thumbnail).attr("class", "thumbnail");

        // Append & Displays all elements of current object into the page.
        buyBook.append(bookImg);
        main.append(bookTitle, bookAuthor, buyBook, bookDescription);
        bookList.append(main);

        // Script to remove Google Error
        document.cookie = 'cross-site-cookie=bar; SameSite=Lax';

    });
  }

})


$("[data-menu-underline-from-center] a").addClass("underline-from-center");

