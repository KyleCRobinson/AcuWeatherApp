const url ='https://api.openweathermap.org/data/2.5/weather';
const apiKey ='f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
	weatherFn('Pune');
});

async function weatherFn(cName) {
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=imperial`;

	const temp2 =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;

	try {
		const res = await fetch(temp);
		const res2 = await fetch(temp2)
		const data = await res.json();
		const data2 = await res2.json();
		if (res.ok && res2.ok) {
			weatherShowFn(data,data2);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data,data2) {
	$('#city-name').text(data.name);
	$('#date').text(moment().
		format('MMMM Do YYYY'));
	$('#temperature').
		html(`${data.main.temp}°F | ${data2.main.temp}°C`);
	$('#description').
		text(data.weather[0].description);
	$('#wind-speed').
		html(`Wind Speed: ${data.wind.speed} m/s`);
	$('#weather-icon').
		attr('src',
			`...`);
	$('#weather-info').fadeIn();
}

'use strict';

var myMap = L.map('mapId', { zoomControl: false })
    .setView([-23.9608, -46.3331], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(myMap);

var marker = L.marker([-23.9608, -46.3331])
  .addTo(myMap)
  .bindPopup('<b>Santos - SP</b>')
  .openPopup();

L.Control.geocoder({
  defaultMarkGeocode: false,
  placeholder: "Search address...",
}).on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(myMap);
    myMap.fitBounds(poly.getBounds());
  })
  .addTo(myMap);