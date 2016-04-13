var url = 'http://api.wunderground.com/api/1e1243f5d9365714/forecast10day/q/'

// navigator.geolocation.getCurrentPosition(function(position) {
//   do_something(position.coords.latitude, position.coords.longitude);
// });

function getJSONP(url, request){
	var $script = document.createElement('script');
	$script.src = url + '37221.json' + '?callback=' + request;
	document.body.appendChild($script);
}

function getJSONZip(url, request){
    console.log('getJSONZip running');
    var $script = document.createElement('script');
    console.log($script);
    var zipCodeInput = document.querySelector('.zipCodeInput').value;
    console.log(zipCodeInput);
    $script.src = url + zipCodeInput + '.json' + '?callback=' + request;
    document.body.appendChild($script);
}

function showWeatherData(jsondata){
	var $target = document.querySelector('section');
    var $button = document.querySelector('.button');

  var docFragment = document.createDocumentFragment()
  for(var i = 0; i < 5; i++){
    var forecastDay = jsondata.forecast.simpleforecast.forecastday[i];

    var forecastDate = forecastDay.date;
    var month = forecastDate.monthname_short;
    var day = forecastDate.day;
    var year = forecastDate.year;
    var high = forecastDay.high;
    var low = forecastDay.low;
    var conditions = forecastDay.conditions;
    var icon = forecastDay.icon;
    var icon_url = forecastDay.icon_url;

    var $div = document.createElement('div');
    $div.setAttribute('class', 'dayWidget');
    docFragment.appendChild($div);
    $target.appendChild($div);

    var $forecastDayp = document.createElement('h2');
    $forecastDayp.textContent = forecastDay.date.weekday;
    docFragment.appendChild($forecastDayp);
    $div.appendChild($forecastDayp);

    var $dateSpan = document.createElement('span');
    $dateSpan.textContent = month + ". " + day + ", " + year;
    $dateSpan.setAttribute('class', 'dateSpan');
    docFragment.appendChild($dateSpan);
    $div.appendChild($dateSpan);

    var $highDiv = document.createElement('div');
    $highDiv.textContent = high.fahrenheit + "\u00b0";
    $highDiv.setAttribute('class', 'highDiv');
    docFragment.appendChild($highDiv);
    $div.appendChild($highDiv);

    var $lowDiv = document.createElement('div');
    $lowDiv.textContent = low.fahrenheit + "\u00b0";
    $lowDiv.setAttribute('class', 'lowDiv');
    docFragment.appendChild($lowDiv);
    $div.appendChild($lowDiv);

    var $iconimg = document.createElement('img');
    $iconimg.textContent = icon;
    $iconimg.setAttribute('class', 'conditionsImage');
    $iconimg.setAttribute('src', icon_url);
    $iconimg.setAttribute('alt', icon);
    docFragment.appendChild($iconimg);
    $div.appendChild($iconimg);

    var $conditionsSpan = document.createElement('span');
    $conditionsSpan.textContent = conditions;
    $conditionsSpan.setAttribute('class', 'conditionsSpan');
    docFragment.appendChild($conditionsSpan);
    $div.appendChild($conditionsSpan);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  getJSONP(url, 'showWeatherData');

var $button = document.querySelector('.button');
var $target = document.querySelector('section');
  $button.addEventListener('click', function(){
    $target.empty();
  getJSONZip(url, 'showWeatherData');
  $div.appendChild(docFragment);
  });
});