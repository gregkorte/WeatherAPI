'use-strict';

$(document).ready(function(){

    var zipUrl = 'http://api.wunderground.com/api/1e1243f5d9365714/forecast10day/q/'
    var geoUrl = 'http://api.wunderground.com/api/1e1243f5d9365714/geolookup/q/'

    function geoLocate(){
        navigator.geolocation.getCurrentPosition(function(position){
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getLoadLocation(lat, lon)
        })
    }

    function getLoadLocation(lat, lon){
        let url = `${geoUrl}${lat},${lon}.json`;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: getTenDayForecast
        })
    }

    function getCoords(response){
        let lat = response.location.lat;
        let lon = response.location.lon;
        console.log(lat, lon)
        getLoadLocation(lat, lon)
    }


    function getZip(){
        var input = $('#zipcode').val();
        $('#weatherInfo').html('');
        $('#zipcode').val('');
        getInputData(input);
    }

    function getTenDayForecast(response){
        let city = response.location.city;
        let state = response.location.state;
        let zip = response.location.zip;
        let url = `${zipUrl}${state}/${city}.json`
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: showWeatherData
        })
    }

    function getInputData(zip){
        let url = `${geoUrl}${zip}.json`;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: getCoords
        })
    }

    function showWeatherData(jsondata){
      for(var i = 0; i < 5; i++){
        var forecastDay = jsondata.forecast.simpleforecast.forecastday[i];

        var forecastDate = forecastDay.date;
        var weekday = forecastDay.date.weekday;
        var month = forecastDate.monthname_short;
        var day = forecastDate.day;
        var year = forecastDate.year;
        var high = forecastDay.high.fahrenheit;
        var low = forecastDay.low.fahrenheit;
        var conditions = forecastDay.conditions;
        var icon = forecastDay.icon;
        var icon_url = forecastDay.icon_url;

        var output = `<div class="dayWidget"><h2>${weekday}</h2>`
        output += `<span class="dateSpan"${month}. ${day}, ${year}</span>`
        output += `<div class="highDiv">${high}\u00b0</div>`
        output += `<div class="lowDiv">${low}\u00b0</div>`
        output += `<img class="conditionsImage" src="${icon_url}" alt="${icon}">`
        output += `<span class="conditionsSpan">${conditions}</span></div>`

        $('#weatherInfo').append(output);
      }
    }

    $('.button').click(getZip);

    $('#zipcode').keyup(function(event){
        if(event.keyCode === 13){
            event.preventDefault();
            getZip();
        }
        return;
    })

    geoLocate();
})