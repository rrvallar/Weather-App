// alert("Hello");

// a57c94743b5cc43f935e2bb5185e19d7
// Austin
// Chicago
// New York
// Orlando
// San Francisco
// Seattle
// Denver
// Atlanta

$(document).ready(function () {
  function getWeatherInfo(pos, cityName) {
    // call API request

    console.log("hi");
    apikey = "b2e24dab707e582bdf1f20a5720ab74e";
    // lat = pos[0]
    // lon = pos[1]
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${pos[0]}&lon=${pos[1]}&exclude=hourly,minutely,current,alerts&appid=${apikey}`;

    // REST API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data["daily"][0]);
        dailyInfos = data["daily"];
        // console.log(dailyInfos[])
        temperature = Math.floor(
          1.8 * (dailyInfos[0]["temp"]["day"] - 273) + 32
        );
        wind = dailyInfos[0]["wind_speed"];
        humidity = dailyInfos[0]["humidity"];
        uv = dailyInfos[0]["uvi"];

        // current weather
        var now = moment().format("MM/DD/YYYY");
        $("#city-name").text(`${cityName} (${now})`);
        $("#temperature").text(`${temperature}`);
        $("#wind").text(`${wind}`);
        $("#humidity").text(`${humidity}`);
        $("#uv").text(`${uv}`);

        // forecast weather
        for (var i = 1; i < 7; i++) {
          let tomorrow = moment().add(i, "days").format("MM/DD/YY");
          temperature = Math.floor(
            1.8 * (dailyInfos[i]["temp"]["day"] - 273) + 32
          );
          wind = dailyInfos[i]["wind_speed"];
          humidity = dailyInfos[i]["humidity"];
          // uv = dailyInfos[i]["uvi"]
          $(`#forecast-date-${i}`).text(tomorrow);
          $(`#forecast-temperature-${i}`).text(temperature);
          $(`#forecast-wind-${i}`).text(wind);
          $(`#forecast-humidity-${i}`).text(humidity);
        }
      })
      .catch((msg) => {
        msg.textContent = "Please search for a valid city 😩";
      });
  }

  cityCoordinates = new Array();
  cityCoordinates.push({ name: "Austin", lat: 30.304797, lon: -97.736922 });
  cityCoordinates.push({ name: "Chicago", lat: 41.838508, lon: -87.685306 });
  cityCoordinates.push({ name: "New York", lat: 40.800147, lon: -73.953623 });
  cityCoordinates.push({ name: "Orlando", lat: 30.304797, lon: -97.736922 });
  cityCoordinates.push({
    name: "San Francisco",
    lat: 30.304797,
    lon: -97.736922,
  });
  cityCoordinates.push({ name: "Seattle", lat: 30.304797, lon: -97.736922 });
  cityCoordinates.push({ name: "Denver", lat: 30.304797, lon: -97.736922 });
  cityCoordinates.push({ name: "Atlanta", lat: 30.304797, lon: -97.736922 });
  // console.log(cityCoordinates)

  function searchRequest() {
    $("#search-bt").on("click", function () {
      var cityName = $("#search-word").val();
      // for (var i = 0; i < cityCoordinates.length; i++)
      // {

      // }
      var pos = [];
      cityCoordinates.forEach((element) => {
        if (cityName == element["name"]) {
          pos = [element["lat"], element["lon"]];
        }
      });
      $("#cities").append(`<li> ${cityName} </li>`);

      getWeatherInfo(pos, cityName);
    });
  }

  searchRequest();
});
