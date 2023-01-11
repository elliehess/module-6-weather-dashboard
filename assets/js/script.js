//store my unique API Key
var APIKey = "368d2fd4c6fc223c2740b129e6a0e0ca";
//collect user input for the city 
var city; 
//OpenWeather Current Weather Data URL
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
//You'll need to adjust your application to accept user input, to store in the city variable that you've created.
.then(function (response) {
    return response.json();
});

fetch('api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=',{APIKey})
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log (data); 
});