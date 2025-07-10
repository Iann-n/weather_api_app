import { fetchWeatherData } from './api.js';
let isCelsius = false;
export function displayWeather(response) {

const app = document.getElementById('app');
  const currentWeather = { 
    location: response.timezone,
    temperature: 72,
    condition: response.currentConditions.conditions,
    humidity: response.currentConditions.humidity,
    windSpeed: response.currentConditions.windspeed,
    visibility: response.currentConditions.visibility,
    feelsLike: response.currentConditions.feelslike,
    date: `Today, ${new Date(response.days[0].datetime).toDateString('en-US')}`,
  };

  const iconmap = {
    "partly-cloudy-day": "cloud-sun",
    "partly-cloudy-night": "cloud-moon",
    "rain": "cloud-rain",
    "clear-day": "sun",
    "clear-night": "moon",
    "cloudy": "cloud",
    "snow": "snowflake",
    "fog": "cloud-fog",
    "wind": "wind",
  }

function converttoCelsius(farenheit) {
    return Math.round((farenheit - 32) * 5 / 9).toFixed(1);
  }


const forecast = response.days.slice(1, 5).map(day => ({
    date: new Date(response.days[1].datetime).toDateString('en-US'),
    high: isCelsius ? converttoCelsius(day.tempmax) + '°C' : day.tempmax + '°F',
    low: isCelsius ? converttoCelsius(day.tempmin) + '°C': day.tempmin + '°F',
    condition: day.conditions,
    icon: iconmap[day.icon]
  }))


const mainTemp = isCelsius ? converttoCelsius(currentWeather.temperature) + '°C': currentWeather.temperature + '°F';
const mainFeelsLike = isCelsius ? converttoCelsius(currentWeather.feelsLike) + '°C': currentWeather.feelsLike + '°F';


  function createElement(tag, classes = '', text = '') {
    const el = document.createElement(tag);
    if (classes) el.className = classes;
    if (text) el.textContent = text;
    return el;
  }

   // Build Header
  const header = createElement('div', 'text-center py-8');
  header.innerHTML = `
    <h1 class="text-4xl font-bold text-gray-800 mb-2">Weather Today</h1>
    <p class="text-gray-600">Stay updated with current conditions</p>
  `;

  // Build Search Bar
  const searchBar = createElement('div', 'max-w-md mx-auto my-6 text-center relative')
  searchBar.innerHTML = `
    <div class="p-4 relative">
      <input type="text" id="searchInput" placeholder="Search for a city here...">`
  searchBar.querySelector('#searchInput').className = "pl-10 pr-4 py-3 w-full bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-full focus:bg-[#f8f9fa] focus:shadow-2xl focus:outline-none focus:scale-105 transform transition duration-200 ease-in-out"
  searchBar.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    const place = searchInput.value.trim();
    if (place) {
      try {
        const response = await fetchWeatherData(place);
        app.innerHTML= '';
        displayWeather(response);

      }
      catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch weather data. Please try again.");
      }
    }
    else {
      alert("Please enter a valid city name.")
    }
  }
})

  // Build Main Weather Card
  const mainCard = createElement('div');
  mainCard.innerHTML = `
    <div class="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
          <div class="p-8">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2 text-gray-600">
                <i data-lucide="map-pin" class="w-5 h-5"></i>
                <span class="text-lg">${currentWeather.location}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <i data-lucide="calendar" class="w-4 h-4"></i>
                <span>${currentWeather.date}</span>
                
                <button id="toggleUnit" class="ml-4 text-sm text-gray-600 hover:text-blue-800 transition w-[30x] p-4 hover:bg-blue-50 rounded-full transition-colors hover:cursor-pointer">°F / °C</button>
              
                </div>
            </div>
              <div class="grid md:grid-cols-2 gap-8 items-center">
              <!-- Temperature Display -->
              <div class="text-center md:text-left">
                <div class="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <i data-lucide="cloud" class="h-16 w-16 text-blue-500"></i>
                  <div>
                    <div class="text-6xl font-light text-gray-800">${mainTemp}</div>
                    <div class="text-xl text-gray-600">${currentWeather.condition}</div>
                  </div>
                </div>
                <span class="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded font-bold">
                  Feels like ${mainFeelsLike}
                </span>
              </div>

              <!-- Weather Details -->
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <i data-lucide="droplets" class="h-5 w-5 text-blue-600"></i>
                  <div>
                    <div class="text-sm text-gray-600">Humidity</div>
                    <div class="font-semibold">${currentWeather.humidity}%</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                  <i data-lucide="wind" class="h-5 w-5 text-green-600"></i>
                  <div>
                    <div class="text-sm text-gray-600">Wind</div>
                    <div class="font-semibold">${currentWeather.windSpeed} mph</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <i data-lucide="eye" class="h-5 w-5 text-purple-600"></i>
                  <div>
                    <div class="text-sm text-gray-600">Visibility</div>
                    <div class="font-semibold">${currentWeather.visibility} mi</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
                  <i data-lucide="thermometer" class="h-5 w-5 text-orange-600"></i>
                  <div>
                    <div class="text-sm text-gray-600">Feels Like</div>
                    <div class="font-semibold">${currentWeather.feelsLike}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let toggleBtn = mainCard.querySelector('#toggleUnit');
  toggleBtn.addEventListener('click', () => {
    console.log(isCelsius);
    if (isCelsius) {
        isCelsius = false;
        app.innerHTML = '';
        displayWeather(response);
    }
    else {
        isCelsius = true;
        app.innerHTML = '';
        displayWeather(response);
    }
  })
  // Build Forecast Card
  const forecastCard = createElement('div', 'bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 my-8');
  forecastCard.innerHTML = `
    <h2 class="text-xl text-gray-800 mb-4">4-Day Forecast</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      ${forecast.map(day => `
        <div class="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <div class="font-medium text-gray-800 mb-2">${day.date}</div>
          <i data-lucide="${day.icon}" class="h-8 w-8 mx-auto mb-3 text-blue-600"></i>
          <div class="text-sm text-gray-600 mb-2">${day.condition}</div>
          <div class="flex justify-center gap-2">
            <span class="font-semibold text-gray-800">${day.high}</span>
            <span class="text-gray-500">${day.low}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  app.append(header,searchBar, mainCard, forecastCard);
    lucide.createIcons();
}