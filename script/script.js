
  let descriptionElement = document.getElementById("description");
  let timeElement = document.getElementById("time");

function getWeather() {

  date = new Date();
  
  let year = date.getFullYear();
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let month = months[date.getMonth()];
  let dayofMonth = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
    }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
    }

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "ae7a846b3048f734526a71e1a47e2b4b";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let temp = Math.round(data.main.temp);
        let condition = data.weather[0].description;

        descriptionElement.innerHTML =`It's ${month} ${dayofMonth}, ${year}. It is currently ${condition} outside, ${temp}°C. A good weather to sit tight and browse through this portfolio`;
       
      });

     

      if (hours < 12) {
        timeElement.innerHTML =`Halo! It's ${hours} : ${minutes}, <br/> Good Morning!`;
      } 
      if (hours > 18) {
        timeElement.innerHTML =`Hi! It's ${hours} : ${minutes}, <br/> what was the best part of your day?`;
      } 
      if (hours > 12 && hours < 18) {
        timeElement.innerHTML =`Hello! It's ${hours} : ${minutes}. <br/> Good Day!`;
      } 
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();
