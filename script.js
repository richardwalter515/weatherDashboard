$(document).ready(function(){
    
    $('#search-btn').on('click', function (event) {
        //clear city currently displayed
        $('#current-city-stats').empty();
        $('#five-day-forecast').empty();
        event.preventDefault();
        
        //display current city data
        var city = $('#city-search').val().trim();
        localStorage.setItem("previous city", city);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a34bf7af6120a0c5529fd1e8e51ee64b";
        createCityBtn();
        fillCity();
        function fillCity() {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log('response:', response)
                var cityBody = $('#current-city-stats');
                var currentDate = moment().format('LL');
                var iconID = (response.weather[0].icon);
                var cityImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                var cityName = $('<h5>').text(city + " - " + currentDate).addClass('card-title');
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
                    var dayOne = $('<div>').addClass('five-day');
                        var dayDate = $('<p>').text(moment(response.list[0].dt_txt).format('ddd, MMM Do YYYY')).addClass('h5');
                        var iconID = (response.list[0].weather[0].icon);
                        var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                        var dayTempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
                        var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                        var dayHum = $('<p>').text("Humidity: " + response.list[0].main.humidity + "%").addClass('card-text');
                    
                    //append day items to day
                    dayOne.append(dayDate, dayImg, dayTemp, dayHum);
    
                    var dayTwo = $('<div>').addClass('five-day');
                        var dayDate = $('<p>').text(moment(response.list[8].dt_txt).format('ddd, MMM Do YYYY')).addClass('h5');
                        var iconID = (response.list[8].weather[0].icon);
                        var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                        var dayTempF = (response.list[8].main.temp - 273.15) * 1.8 + 32;
                        var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                        var dayHum = $('<p>').text("Humidity: " + response.list[8].main.humidity + "%").addClass('card-text');
                    
                    //append day items to day
                    dayTwo.append(dayDate, dayImg, dayTemp, dayHum);
    
                    var dayThree = $('<div>').addClass('five-day');
                        var dayDate = $('<p>').text(moment(response.list[16].dt_txt).format('ddd, MMM Do YYYY')).addClass('h5');
                        var iconID = (response.list[16].weather[0].icon);
                        var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                        var dayTempF = (response.list[16].main.temp - 273.15) * 1.8 + 32;
                        var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                        var dayHum = $('<p>').text("Humidity: " + response.list[16].main.humidity + "%").addClass('card-text');
                    
                    //append day items to day
                    dayThree.append(dayDate, dayImg, dayTemp, dayHum);
    
                    var dayFour = $('<div>').addClass('five-day');
                        var dayDate = $('<p>').text(moment(response.list[24].dt_txt).format('ddd, MMM Do YYYY')).addClass('h5');
                        var iconID = (response.list[24].weather[0].icon);
                        var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                        var dayTempF = (response.list[24].main.temp - 273.15) * 1.8 + 32;
                        var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                        var dayHum = $('<p>').text("Humidity: " + response.list[24].main.humidity + "%").addClass('card-text');
                    
                    //append day items to day
                    dayFour.append(dayDate, dayImg, dayTemp, dayHum);
    
                    var dayFive = $('<div>').addClass('five-day');
                        var dayDate = $('<p>').text(moment(response.list[32].dt_txt).format('ddd, MMM Do YYYY')).addClass('h5');
                        var iconID = (response.list[32].weather[0].icon);
                        var dayImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                        var dayTempF = (response.list[32].main.temp - 273.15) * 1.8 + 32;
                        var dayTemp = $('<p>').text("Temperature: " + dayTempF.toFixed(1) + " °F").addClass('card-text');
                        var dayHum = $('<p>').text("Humidity: " + response.list[32].main.humidity + "%").addClass('card-text');
                    
                    //append day items to day
                    dayFive.append(dayDate, dayImg, dayTemp, dayHum);
                // Append the days to the fiveDayForecast card
                fiveDayBody.append(dayOne, dayTwo, dayThree, dayFour, dayFive);
            });

        }
        //save City name to local storage, then append as a button to the "searched cities" div so user can see previously searched cities
        //when clicked, change city variable to text of button and repeat the functions above 
        function createCityBtn() {
            var prevCity = localStorage.getItem("previous city");
            var newCityBtn = $('<button>').text(prevCity);
            $('.searchedCities').append(newCityBtn);
            $(newCityBtn).on('click', function (event) {
                $('#current-city-stats').empty();
                $('#five-day-forecast').empty();
                city = prevCity;
                fillCity();
            });
        }
    });
});

