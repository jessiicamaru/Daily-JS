const APIKey = 'bbf9aad7e854ed238639670478926a91';
const weatherIconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water',
};

const leftSide = document.querySelector('.left-side');
const rightSide = document.querySelector('.right-side');
const search = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-location-button');
const next4Days = document.querySelector('.next-four-days');

function fetchWeatherData(location) {
    const APIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKey}&units=metric`;

    fetch(APIUrl)
        .then((response) => response.json())
        .then((data) => {
            const todayWeekDay = new Date().toLocaleString('en-US', { weekday: 'long' });
            const todayDate = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const nameLocation = data.city.name;
            const nameCountry = data.city.country;

            const todayWeatherIconCode = data.list[0].weather[0].icon;
            const todayTemperature = `${Math.round(Number(data.list[0].main.temp)).toFixed(0)}°C`;
            const todayWeather = data.list[0].weather[0].description;

            leftSide.querySelector('.header h1').innerText = todayWeekDay;
            leftSide.querySelector('.header .date').innerText = todayDate;
            leftSide.querySelector('.header .location span').innerHTML = `${nameLocation}, ${nameCountry}`;

            leftSide.querySelector('.info i').classList.add(`bx-${weatherIconMap[todayWeatherIconCode]}`);
            leftSide.querySelector('.info h1').innerText = todayTemperature;
            leftSide.querySelector('.info h3').innerText = todayWeather;

            const todayHumidity = `${data.list[0].main.humidity}%`;
            const todayPrecipitation = `${data.list[0].pop == 0 ? data.list[0].pop : `${data.list[0].pop}%`} `;
            const todayWindSpeed = `${data.list[0].wind.speed} km/h`;

            rightSide.querySelector('.weather-discribe > div:nth-child(1) .value').innerText = todayPrecipitation;
            rightSide.querySelector('.weather-discribe > div:nth-child(2) .value').innerText = todayHumidity;
            rightSide.querySelector('.weather-discribe > div:nth-child(3) .value').innerText = todayWindSpeed;

            //update next 4 days
            const today = new Date();
            const nextDaysData = data.list.slice(1);

            let uniqueDays = new Set();
            let count = 0;

            next4Days.innerHTML = '';
            let html = '';
            for (const dayData of nextDaysData) {
                const forecastDate = new Date(dayData.dt_txt);

                const dayAbbreviation = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });

                const dayTemperatures = `${Math.round(Number(dayData.main.temp)).toFixed(0)}°C`;
                const dayWeatherIcon = dayData.weather[0].icon;

                if (!uniqueDays.has(dayAbbreviation)) {
                    uniqueDays.add(dayAbbreviation);
                    html += `
                    <li class="next-day">
                        <i class="bx bx-${weatherIconMap[dayWeatherIcon]} icon"></i>
                        <span class="day">${dayAbbreviation}</span>
                        <span class="temperature"><b>${dayTemperatures}</b></span>
                    </li>
                    `;
                    count++;
                }

                if (count === 4) {
                    break;
                }
            }

            next4Days.innerHTML = html;
        });
}

window.addEventListener('load', fetchWeatherData('Danang'));

search.onchange = () => {
    fetchWeatherData(search.value);
    search.value = '';
};

searchButton.onclick = () => {
    fetchWeatherData(search.value);
    search.value = '';
};
