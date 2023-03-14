const submitBtn = document.querySelector('#submit-btn');
const locationInput = document.querySelector('#location');
const weatherInfo = document.querySelector('#weather-info');

submitBtn.addEventListener('click', () => {
  const location = locationInput.value;
  const API_KEY = 'cb45aac906ce05ee2fb0d28a73203e90';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.main || !data.weather || !data.name) {
        throw new Error('Invalid response from API');
      }
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const cityName = data.name;
      weatherInfo.innerHTML = `<p>${cityName}: ${temperature}°C, ${description}</p>`;
    })
    .catch(error => {
      console.log(error);
      weatherInfo.innerHTML = '<p>Unable to get weather information. Please try again later.</p>';
    });
});
