const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const weatherIcon = document.getElementById('weather-icon');
const apiKey = '6c1c6aaa8b7a443cb07132910252704&q';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const city = cityInput.value.trim();
  if (!city) return;

  // Reset UI
  weatherInfo.classList.add('hidden');
  errorMessage.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}=${city}`);
    
    if (!response.ok) {
      throw new Error('❌ City not found. Try again!');
    }

    const data = await response.json();

    document.getElementById('city-name').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent = data.current.temp_c;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('last-updated').textContent = `Last Updated: ${data.current.last_updated}`;

    // Set Weather Icon
    weatherIcon.src = `https:${data.current.condition.icon}`;
    weatherIcon.alt = data.current.condition.text;

    loading.classList.add('hidden');
    weatherInfo.classList.remove('hidden');
  } catch (error) {
    loading.classList.add('hidden');
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
});
