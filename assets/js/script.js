//store my unique API Key
const APIKey = "368d2fd4c6fc223c2740b129e6a0e0ca";
//OpenWeather Current Weather Data URL
const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${caseFix}&appid=${APIKey}&units=imperial`;
var latitude = res.coord.lat;
var longitude = res.coord.lon;

$(document).ready(function () { //we want the document to load only once
    function onLoad(){
    }

    //Use local storage for the search history
    const history = JSON.parse(localStorage.getItem('search-history')) || [];
    const historyLastValue = history[history.length - 1];
    console.log(historyLastValue);
    renderBtns();
    function renderBtns() {
        $(".history").empty();
        history.forEach(function (x) {
            const recentCityButton = $("<li><button>" + x + "</button></li>");
            $(".history").append(recentCityButton);
        })
    }
    
//On click function. The searched weather data will be gathered and then rendered
    $("#search-button").on('click', function () {
        const searchVal = $('#search-value').val();
        searchClickHandler(searchVal);
    })
 
    $('.history').on('click', 'button', function () {
        searchClickHandler($(event.target).text());
    })
 
    const searchClickHandler = function (inputVal) {
 
        // We need to make sure the input from user is in string format 
        let caseFix = inputVal.split(' ').map(letterArr => {
            let newWord = letterArr[0].toUpperCase() + letterArr.substring(1, letterArr.length).toLowerCase();
            return newWord;
        }).join(' ');
    } // might not need 

//Call API Key. Current weather first using Ajax
$.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log("Successful! AJax1:")
        console.log(res)
        
        const currentWeather =
            `
                <h3 class="card-title">${res.name} ${new Date().toLocaleDateString()}</h3>
                <div class="card">
                    <div class="card-body" id="currentWeather">
                        <h3 class="card-title">${res.name} (${new Date().toLocaleDateString()})
                            <img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png"/>
                        </h3>
                        <p class="card-text">Temperature: ${res.main.temp} °F</p>
                        <p class="card-text">Humidity: ${res.main.humidity}%</p>
                        <p id="endajax1" class="card-text">Wind Speed: ${res.wind.speed} MPH</p>
                    </div>
                </div>
            `;
            //Append the city name to search history
            history.includes(caseFix) ? '' : history.push(caseFix);
            renderBtns();
            localStorage.setItem('search-history', JSON.stringify(history));
            $("#today").html(currentWeather);

            


            
           
