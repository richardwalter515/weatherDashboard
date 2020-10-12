$(document).ready(function(){
    $('#search-btn').on('click', function (event) {
        
        //clear city currently displayed
        $('#current-city-stats').empty();
        event.preventDefault();
        
        //display current city data
        var city = $('#city-search').val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log('response:', response)
            var cityBody = $('#current-city-stats');
            var iconID = (response.weather[0].icon);
            var cityImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
            var cityName = $('<h5>').text(city).addClass('card-title');
            var tempF = (response.main.temp - 273.15) * 1.8 + 32;
            var cityTemp = $('<p>').text("Temperature: " + tempF.toFixed(1) + " °F").addClass('card-text');
            var cityHum = $('<p>').text("Humidity: " + response.main.humidity + "%").addClass('card-text');
            var cityWind = $('<p>').text("Wind Speed: " + response.wind.speed + " MPH").addClass('card-text');
            var long = response.coord.lon;
            var lat = response.coord.lat;

            //query and display UV index
            var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
            $.ajax({
                url: queryUV,
                method: "GET"
            }).then(function(response) {
                var cityUv = $('<button>').text("UV Index: " + response.value).addClass('card-text');
                if (response.value > "7") {
                    cityUv.addClass('danger');
                } else if (response.value > "4" && response.value < "7") {
                    cityUv.addClass('average');
                } else {
                    cityUv.addClass('good');
                }
    
                // Append the city elements to the cityBody card
                cityBody.append(cityName, cityImg, cityTemp, cityHum, cityWind, cityUv);
            });
        });

        //display five day forecast
        var queryFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
        $.ajax({
            url: queryFiveDay,
            method: "GET"
        }).then(function(response) {
            console.log('five day:', response)
            var fiveDayBody = $('#five-day-forecast');
            //create the days
            //can this be done in for loop?
                var dayOne = $('<div>').addClass('five-day');
                    var dayDate = $('<p>').text(response.list[0].dt_txt).addClass('h5');
                    var iconID = (response.list[0].weather[0].icon);
                    var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                    var dayTempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
                    var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                    var dayHum = $('<p>').text("Humidity: " + response.list[0].main.humidity + "%").addClass('card-text');
                
                //append day items to day
                dayOne.append(dayDate, dayImg, dayTemp, dayHum);

                var dayTwo = $('<div>').addClass('five-day');
                    var dayDate = $('<p>').text(response.list[8].dt_txt).addClass('h5');
                    var iconID = (response.list[8].weather[0].icon);
                    var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                    var dayTempF = (response.list[8].main.temp - 273.15) * 1.8 + 32;
                    var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                    var dayHum = $('<p>').text("Humidity: " + response.list[8].main.humidity + "%").addClass('card-text');
                
                //append day items to day
                dayTwo.append(dayDate, dayImg, dayTemp, dayHum);

                var dayThree = $('<div>').addClass('five-day');
                    var dayDate = $('<p>').text(response.list[16].dt_txt).addClass('h5');
                    var iconID = (response.list[16].weather[0].icon);
                    var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                    var dayTempF = (response.list[16].main.temp - 273.15) * 1.8 + 32;
                    var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                    var dayHum = $('<p>').text("Humidity: " + response.list[16].main.humidity + "%").addClass('card-text');
                
                //append day items to day
                dayThree.append(dayDate, dayImg, dayTemp, dayHum);
            // Append the days to the fiveDayForecast card
            fiveDayBody.append(dayOne, dayTwo, dayThree);
        });
        //save City name to local storage, then append as a button to the "searched cities" div so user can see previously searched cities
        //when clicked, change city variable to text of button and repeat the functions above
    });
});

