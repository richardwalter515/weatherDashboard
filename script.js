//create variables for ajax calls
$(document).ready(function(){
    $('#search-btn').on('click', function (event) {
        //something to clear
        event.preventDefault();
        //display current city data
        var city = $('#city-search').val().trim();
        console.log('city:', city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log('response:', response)
            var cityBody = $('#current-city-stats');
            var cityName = $('<h5>').text(city + response.weather[0].id).addClass('card-title');
            var tempF = (response.main.temp - 273.15) * 1.8 + 32;
            var cityTemp = $('<p>').text("Temperature: " + tempF.toFixed(1) + " °F").addClass('card-text');
            var cityHum = $('<p>').text("Humidity: " + response.main.humidity + "%").addClass('card-text');
            var cityWind = $('<p>').text("Wind Speed: " + response.wind.speed + " MPH").addClass('card-text');
            var long = response.coord.lon;
            var lat = response.coord.lat;

            var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
            $.ajax({
                url: queryUV,
                method: "GET"
            }).then(function(response) {
                console.log('UV', response)
                var cityUv = $('<p>').text("UV Index: " + response.value).addClass('card-text');
    
                // Append the city elements to the cityBody card
                cityBody.append(cityName, cityTemp, cityHum, cityWind, cityUv);
            });
        });
        //display UV index

        //display five day forecast
        var queryFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
        $.ajax({
            url: queryFiveDay,
            method: "GET"
        }).then(function(response) {
            console.log('five day:', response)
            // var cityBody = $('#current-city-stats');
            // var cityName = $('<h5>').text(city + response.weather[0].id).addClass('card-title');
            // var tempF = (response.main.temp - 273.15) * 1.8 + 32;
            // var cityTemp = $('<p>').text("Temperature: " + tempF.toFixed(1) + " °F").addClass('card-text');
            // var cityHum = $('<p>').text("Humidity: " + response.main.humidity + "%").addClass('card-text');
            // var cityWind = $('<p>').text("Wind Speed: " + response.wind.speed + " MPH").addClass('card-text');

            // Append the city elements to the cityBody card
            // cityBody.append(cityName, cityTemp, cityHum, cityWind);
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