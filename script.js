//create variables for ajax calls
$(document).ready(function(){
    $('#search-btn').on('click', function (event) {
        //something to clear
        event.preventDefault();
        var city = $('#city-search').val().trim();
        console.log('city:', city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log('response:', response)
            var cityBody = $('#current-city-stats');
            var cityName = $('<h5>').text(city).addClass('card-title');
            var cityTemp = $('<p>').text("Temperature: " + response.main.temp).addClass('card-text');
            var cityHum = $('<p>').text("Humidity: " + response.main.humidity + "%").addClass('card-text');
            // var actorsTD = $('<td>').text(response.Actors);

            // Append the city elements to the cityBody card
            cityBody.append(cityName, cityTemp, cityHum);
            });
    });
    // function clear(){
    //     city = '';
    // }
});

// 3 ajax calls: current city data, uv index (if index > 9, background color red, etc..), and five day forecast
//enter city name (val) in search bar

//on click of search button

//pull city info from API

//consol log it, and save to local storage so user can see previous cities

//display current city data in div