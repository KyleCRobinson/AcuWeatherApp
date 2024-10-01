const url ='https://api.openweathermap.org/data/2.5/weather';
const apiKey ='f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
	weatherFn('Pune');
});

async function weatherFn(cName) {
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=imperial`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

async function weatherFn2(cName){
	const temp2 =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;()
	try {
		const res2 = await fetch(temp2);
		const data2 = await res2.json();
		if (res2.ok) {
			weatherShowFn(data2);
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