console.log('Client Side JS loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;

    const testWeatherURL = `/weather?address=${location}`;

    fetch(testWeatherURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
                return;
            }
    
            const location = data.location;
            const weatherForecast = data.data.weather[0].description;
            const tempForecast = data.data.temp;
            const feelsLikeForecast = data.data.feels_like;
            const humidityForecast = data.data.humidity;
            const dewPointForecast = data.data.dew_point;
    
            messageOne.textContent = location;
            messageTwo.textContent = 
            `Forecasts
            Weather: ${weatherForecast}
            Temperature: ${tempForecast} C
            Feels Like: ${feelsLikeForecast} C
            Humidity: ${humidityForecast}%
            Dew Point: ${dewPointForecast}`;
        });
    });
});