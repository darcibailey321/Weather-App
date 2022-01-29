// Render weather data to the page.

// From the <form> element, listen to the "submit"
// From the <button> element, listen to the "click" 

    // Select <input>, get its value, and provide it to the geo API

// From the <button> container element, listen to the <button> "click"

    // Get the city from the button's data attribute

// Fetch geo data (lat, long)

    // q = name of the city (query)

    // limit 5 (option)

    // appid = my custom API key for my weather dashboard

// Fetch onecall weather data
    //lat
    //lon
    //appid
    //units = imperial
    //exclude = minutely,hourly

//Print/Render the weather data to the page. (then)

var weatherContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

function getApi(lon, lat, name) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=4f43908e31ab9aa24eef3fb241a0b6c6`;


  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      
      var temp = data.current.temp;
      var windSpeed = data.current.wind_speed;
      var humidity = data.current.humidity;
      var uv = data.current.uvi;


    document.getElementById("temp").textContent = temp;
    document.getElementById("wind").textContent = windSpeed;
    document.getElementById("humidity").textContent = humidity;
    document.getElementById("uvIndex"). textContent = uv;
    document.getElementById("city"). textContent = name;
    
// debugger
    for (var i=0; i<5; i++) {
      console.log(data.daily[i])
      var card = document.createElement("div")
      card.textContent = data.daily[i].humidity
      document.querySelector(".columns").appendChild(card)
    }
    
    });
}

function getCoordinates() {

    var cityName = document.getElementById("cityname").value;
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=4f43908e31ab9aa24eef3fb241a0b6c6`;
     
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
    
      .then(function (data) {
        var lon = data[0].lon
        var lat = data[0].lat
        debugger
        var searchHistory = JSON.parse(localStorage.getItem("History")) || []
        searchHistory.push(cityName)

        localStorage.setItem("History", JSON.stringify(searchHistory))

        console.log(data);
        getApi (lon, lat, cityName)
      });
  }
submitButton.addEventListener('click', getCoordinates);
