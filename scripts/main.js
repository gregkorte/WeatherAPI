var url = 'http://api.wunderground.com/api/1e1243f5d9365714/forecast10day/q/37217.json'

function getJSONP(url, cbName){
	var $script = document.createElement('script');
	$script.src = url + '?callback=' + cbName;
	document.body.appendChild($script);
}

function cbName_myAwesomeFunction(data){
	console.log(data.forecast.simpleforecast.forecastday);
}

getJSONP(url, 'cbName_myAwesomeFunction');

document.addEventListener("DOMContentLoaded", function(forecastDay){
  var $target = document.querySelector("section");
  
  for(var i = 0; i < forecastDay.length; i++){
  	var forecastDay = data.forecast.simpleforecast.forecastday[i];

    var docFragment = document.createDocumentFragment();
    var $forecastdayp = document.createElement('p');

    $forecastdayp.textContent = forecastDay.date.weekday;
    docFragment.appendChild($forecastdayp);
    $target.appendChild($forecastdayp);
  }   
});

//Iterate through data.forecast.simpleforecast.forecastday array
//Collect [0-4]
//Append data to DOM
  //Create ul
  //Append with li
