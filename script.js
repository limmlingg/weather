var width = window.innerWidth;
var height = window.innerHeight;
var lat, lon; // Latitude and longitude of location
var weatherType; // Used to generate animation

// Find location based on given address
function findLocation() {
	var search = $("#location").val();
	search = search.replace(/\s+/g, '+');
	//console.log("Search for " + search);
	$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyAAr7n_meQxdm_sC6wta1hFIm8gaYEkz_Y", function(data) {
		//console.log(data);
		lat = data.results[0].geometry.location.lat;
		lon = data.results[0].geometry.location.lng;
		getWeather();
		getMap();
	});
}

// Get location
function getLocation(callbackWeather, callbackMap) {
	navigator.geolocation.getCurrentPosition(function(p) {
		lat = p.coords.latitude;
		lon = p.coords.longitude;
		//console.log(lat + "," + lon);
		callbackWeather();
		callbackMap();
	}, function() {
		console.log("Unable to get location");
	});
}

// Call openweather api
function getWeather() {
	$.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=f0226db01036e625782a08842bf20938", function(data) {
		//console.log(data);
		weatherType = data.weather[0].main;
		$("#forecastText").html(data.weather[0].description); // Update weather
	});
}

// Call Google Maps api
function getMap() {
	// Check if there are any Streetview images at that location
	$.getJSON("https://maps.googleapis.com/maps/api/streetview/metadata?size=" + height + "x" + width + "&location=" + lat + "," + lon + "&key=AIzaSyAAr7n_meQxdm_sC6wta1hFIm8gaYEkz_Y", function(data) {
		//console.log(d.status);
		if (data.status=="OK") { // Update background image if Streetview image is found
			var imgURL = "https://maps.googleapis.com/maps/api/streetview?size=" + height + "x" + width + "&location=" + lat + "," + lon + "&key=AIzaSyAAr7n_meQxdm_sC6wta1hFIm8gaYEkz_Y";
		} else {
			var imgURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=18&size=" + width + "x" + height+ "&maptype=satellite&key=AIzaSyDL5jkHCL3Jhe409CEeG83oW2DU3XqqTu4";
		}
		//console.log(imgURL);
		$("body").css('background-image', 'url(' + imgURL + ')');
	})
}

// Overlay the screen with rain
function rain() {
	console.log("It is raining!");
}

// Overlay the screen with snow
function snow() {
	console.log("It is snowing!");
}

// Overlay the screen with clouds
function cloud() {
	console.log("It is cloudy!");
}

// Overlay the screen with fog
function fog() {
	console.log("It is foggy!");
}

getLocation(getWeather, getMap); // Get location before checking weather and map

// Make responsive
window.onresize = function(event) {
	width = window.innerWidth;
	height = window.innerHeight;
}