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

    for (var i=0; i<5; i++) {
      console.log(data.daily[i])
      var card = document.createElement("div")
      card.textContent = data.daily[i].humidity
      document.querySelector(".columns").appendChild(card)
    }
      for (var i=0; i<5; i++) {
        console.log(data.daily[i])
        var card = document.createElement("div")
        card.textContent = data.daily[i].temp.day
        document.querySelector(".columns").appendChild(card)

    }
    for (var i=0; i<5; i++) {
      console.log(data.daily[i])
      var card = document.createElement("div")
      card.textContent = data.daily[i].wind_speed
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

        var searchHistory = JSON.parse(localStorage.getItem("History")) || []
        searchHistory.push(cityName)

        localStorage.setItem("History", JSON.stringify(searchHistory))

        console.log(data);
        getApi (lon, lat, cityName)
      });
  }
submitButton.addEventListener('click', getCoordinates);
