const url ='https://api.openweathermap.org/data/2.5/weather';
//const url2 = 'https://openweathermap.org/img/wn/10d@2x.png';
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
		html(`${data.weather[3].icon}`);
	$('#weather-info').fadeIn();
}