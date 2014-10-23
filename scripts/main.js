var url = 'http://api.wunderground.com/api/1e1243f5d9365714/forecast10day/q/37217.json'

function getJSONP(url, cbName){
	var $script = document.createElement('script');
	$script.src = url + '?callback=' + cbName;
	document.body.appendChild($script);
}

function cbName_myAwesomeFunction(data){
	var $target = document.querySelector("section");

// function createDivTag(data.forecast.simpleforecast.forecastday[i]){
//     var docFragment = document.createDocumentFragment();
      
//       var $div = document.createElement('div');
//       div$setAttribute('class', 'dayWidget');
//       docFragment.appendChild($div);

//       return docFragment;
// }

  var docFragment = document.createDocumentFragment();
  var $div = document.createElement('div');
  $div.setAttribute('class', 'dayWidget');
  docFragment.appendChild($div);
  $target.appendChild($div);
  
  for(var i = 0; i < 5; i++){
    var forecastDay = data.forecast.simpleforecast.forecastday[i];

    var forecastDate = data.forecast.simpleforecast.forecastday[i].date;
    var month = forecastDate.monthname_short;
    var day = forecastDate.day;
    var year = forecastDate.year;
    var high = data.forecast.simpleforecast.forecastday[i].high;
    var low = data.forecast.simpleforecast.forecastday[i].low;
    var conditions = data.forecast.simpleforecast.forecastday[i].conditions;
    var icon = data.forecast.simpleforecast.forecastday[i].icon;
    var icon_url = data.forecast.simpleforecast.forecastday[i].icon_url;

    var $forecastDayp = document.createElement('h2');    
    $forecastDayp.textContent = forecastDay.date.weekday;
    docFragment.appendChild($forecastDayp);
    $target.appendChild($forecastDayp);

    var $dateSpan = document.createElement('span');
    $dateSpan.textContent = month + ". " + day + ", " + year;
    $dateSpan.setAttribute('class', 'dateSpan');
    docFragment.appendChild($dateSpan);
    $target.appendChild($dateSpan);

    var $highDiv = document.createElement('div');    
    $highDiv.textContent = high.fahrenheit + "&deg;";
    $highDiv.setAttribute('class', 'highDiv');
    docFragment.appendChild($highDiv);
    $target.appendChild($highDiv);

    var $lowDiv = document.createElement('div');    
    $lowDiv.textContent = low.fahrenheit + "&deg;";
    $lowDiv.setAttribute('class', 'lowDiv');
    docFragment.appendChild($lowDiv);
    $target.appendChild($lowDiv);

    var $iconimg = document.createElement('img');    
    $iconimg.textContent = icon;
    $iconimg.setAttribute('class', 'conditionsImage');
    $iconimg.setAttribute('src', icon_url);
    $iconimg.setAttribute('alt', icon);
    docFragment.appendChild($iconimg);
    $target.appendChild($iconimg);    

    var $conditionsSpan = document.createElement('span');    
    $conditionsSpan.textContent = conditions;
    $conditionsSpan.setAttribute('class', 'conditionsSpan');
    docFragment.appendChild($conditionsSpan);
    $target.appendChild($conditionsSpan);

  }   
}

document.addEventListener("DOMContentLoaded", function(){
  getJSONP(url, 'cbName_myAwesomeFunction');
});

//Iterate through data.forecast.simpleforecast.forecastday array
//Collect [0-4]
//Append data to DOM
  //Create ul
  //Append with li
