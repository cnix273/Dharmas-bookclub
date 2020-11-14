var searchBar = $("#search-bar");
var searchBtn = $("#search-button");
var investorInfo = $("#investor-info");
var newInvestor = $("#new-investor");

var searchName = "";
currentIndex=0

searchBtn.on("click", function(event) {
    event.preventDefault();
    searchName = searchBar.text;
})

var hubspotURL =  + searchName

$.ajax({
    url: hubspotURL,
    method: "GET"
})
    .then(function(response) {
        var investor = $("<div>").attr("id", currentIndex);
        var name = $("<h1>").text(response.Name);
        var fund = $("<p>").response.Fund;
        var email = $("<p>").response.Email;
        var number = $("<p>").response.Number;
        var city = $("<p>").response.City;

        investor.append(name, fund, email, number, city);
        investorInfo.append(investor);

        currentIndex++;
    })

newInvestor.on("click", function() {
    
})
