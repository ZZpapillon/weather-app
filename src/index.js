import "./style.css";
import { format } from "date-fns";

const content = document.querySelector('.content')
let temperatureC, temperatureF,  feelsLike, feelsLikeF;
let avgTemperatureC = [];
let avgTemperatureF = [];
const button = document.createElement('div');

const submitButton = document.querySelector('.form-submit')
const location = document.getElementById('location-input')
submitButton.addEventListener('click', async () => {
  try {
    event.preventDefault();
    const city = location.value;
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7f43201f0f354b8e8ae152120232605&q=${city}&days=7&aqi=no&alerts=no`, { mode: 'cors' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const weatherData = await response.json();

    removeExistingContent();
    location.value = '';
    getWeatherData(weatherData);
  } catch (error) {
    alert('Error: We dont have this city!', error.message);
    // Handle the error here (e.g., display an error message to the user)
  }
});

function removeExistingContent() {
  while (content.firstChild) {
    content.firstChild.remove();
  }
}

    
      

      
   
     async function getWeather() {
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=7f43201f0f354b8e8ae152120232605&q=Zagreb&days=7&aqi=no&alerts=no', {mode: 'cors'})
    const weatherData = await response.json();
    // content.style.backgroundImage = `url(${weatherData.current.condition.icon})`;
    //   content.style.backgroundSize = 'cover'
      console.log(weatherData);
  console.log(weatherData.forecast);
  console.log(weatherData.forecast.forecastday);

      getWeatherData(weatherData)
  }
  getWeather();

  function getWeatherData(weatherData)  {

    

    const time = weatherData.current.last_updated;
    const date = new Date(time);
    

    const country = weatherData.location.country;
    const city = weatherData.location.name;
     temperatureC = weatherData.current.temp_c;
     temperatureF = weatherData.current.temp_f;
    const humidity = weatherData.current.humidity;
    const chanceOfRain = weatherData.current.precip_mm;
    const conditionText = weatherData.current.condition.text;
    const conditionIcon = weatherData.current.condition.icon;
    const windKmph = weatherData.current.wind_kph;
     feelsLike = weatherData.current.feelslike_c;
     feelsLikeF = weatherData.current.feelslike_f
    displayCurrent(date, country, city, temperatureC, temperatureF, humidity, chanceOfRain, conditionText, conditionIcon, windKmph, feelsLike, feelsLikeF)

     avgTemperatureC = weatherData.forecast.forecastday.slice(1).map((forecast) => forecast.day.avgtemp_c);
     avgTemperatureF = weatherData.forecast.forecastday.slice(1).map((forecast) => forecast.day.avgtemp_f);


   weatherData.forecast.forecastday.slice(1).forEach((forecast) => {
  const avgTemperatureC = forecast.day.avgtemp_c;
  const  avgTemperatureF = forecast.day.avgtemp_f;

  const conditionText = forecast.day.condition.text;
  const conditionIcon = forecast.day.condition.icon;

  const dateText = forecast.date;
  console.log(conditionIcon)

  displayInfo(avgTemperatureC, avgTemperatureF, conditionText, conditionIcon, dateText)

 
});
updateTextContents();
  }

  function displayInfo(avgTemperatureC, avgTemperatureF, conditionText, conditionIcon, dateText) {
    const dayDiv = document.createElement('div')
    dayDiv.classList.add('dayDiv')
    content.appendChild(dayDiv)

    const weekday = document.createElement('div')
    weekday.classList.add('weekdayDiv')
    const date = new Date(dateText);
    weekday.textContent = format(date, 'EEEE');
    
    const TemperatureC = document.createElement('div')
    TemperatureC.classList.add('avgTemperature')
    TemperatureC.textContent =`${avgTemperatureC} °C`
    

    const conditionTextDiv = document.createElement('div')
    conditionTextDiv.classList.add('conditionText')
    conditionTextDiv.textContent = conditionText

     const conditionIconDiv = document.createElement('div')
    conditionIconDiv.classList.add('conditionIcon')
    conditionIconDiv.style.backgroundImage = `url(${conditionIcon})`;


    dayDiv.appendChild(weekday)
    dayDiv.appendChild(TemperatureC)
    dayDiv.appendChild(conditionTextDiv)
    dayDiv.appendChild(conditionIconDiv)

   



  }

  function displayCurrent(date, country, city, temperatureC, temperatureF, humidity, chanceOfRain, conditionText, conditionIcon, windKmph, feelsLike) {
    const currentDiv = document.createElement('div')
    currentDiv.classList.add('currentDiv')
    content.appendChild(currentDiv)
    
    const currentDivPart1 = document.createElement('div')
    currentDivPart1.classList.add('currentDivPart1')
    currentDiv.appendChild(currentDivPart1)


    // Create elements and set their class and text content
  const countryElement = document.createElement('div');
  countryElement.classList.add('country');
  countryElement.textContent = country;

  const cityElement = document.createElement('div');
  cityElement.classList.add('city');
  cityElement.textContent = city;

  const timeElement = document.createElement('div');
  timeElement.classList.add('time');
  timeElement.textContent = format(date, 'EEEE, dd MMMM yyyy');;

  const avgTemperatureElement = document.createElement('div');
  avgTemperatureElement.classList.add('avg-temperature');
  avgTemperatureElement.textContent =  temperatureC + '°C  ';

  const conditionIconElement = document.createElement('img');
  conditionIconElement.classList.add('condition-icon');
  conditionIconElement.src = conditionIcon;

  const conditionTextElement = document.createElement('div');
  conditionTextElement.classList.add('condition-text');
  conditionTextElement.textContent = conditionText;

  
  button.classList.add('buttonToggle')
  button.textContent = 'Display in °F'
  button.addEventListener('click',toggleTemperatureUnit)
  
  

  

  // Append the elements to the currentDivPart1 element
  currentDivPart1.appendChild(cityElement);
  currentDivPart1.appendChild(countryElement)
  currentDivPart1.appendChild(timeElement);
  currentDivPart1.appendChild(conditionTextElement);
  currentDivPart1.appendChild(avgTemperatureElement);
  currentDivPart1.appendChild(conditionIconElement);
  currentDivPart1.appendChild(button)
  


  const currentDivPart2 = document.createElement('div')
    currentDivPart2.classList.add('currentDivPart2')
    currentDiv.appendChild(currentDivPart2)

  const humidityDiv = document.createElement('div');
  humidityDiv.classList.add('humidity');
  humidityDiv.textContent = `Humidity     ${humidity}%`;

  // Create feelslike div
  const feelslikeDiv = document.createElement('div');
  feelslikeDiv.classList.add('feelslike');
  feelslikeDiv.textContent = `Feels Like ${feelsLike}°C`;

  // Create chanceofRain div
  const chanceofRainDiv = document.createElement('div');
  chanceofRainDiv.classList.add('chanceofRain');
  chanceofRainDiv.textContent = `Chance of Rain ${chanceOfRain}%`;

  // Create windKmph div
  const windKmphDiv = document.createElement('div');
  windKmphDiv.classList.add('windKmph');
  windKmphDiv.textContent = `Wind Speed ${windKmph} km/h`;

  // Append the divs to a parent container
 
  currentDivPart2.appendChild(humidityDiv);
  currentDivPart2.appendChild(feelslikeDiv);
  currentDivPart2.appendChild(chanceofRainDiv);
  currentDivPart2.appendChild(windKmphDiv);




  }
  let temperatureUnit = 'C';

  function updateTextContents() {
  const avgTemperatureElements = document.querySelectorAll('.avg-temperature');
  avgTemperatureElements.forEach((element) => {
    const temperature = element.textContent.split(' ')[0];
    element.textContent = temperatureUnit === 'C' ? `${temperatureC}°C` : `${temperatureF}°F`;
  });

  const TemperatureCElements = document.querySelectorAll('.avgTemperature');
  TemperatureCElements.forEach((element, index) => {
    const temperature = element.textContent.split(' ')[0];
    element.textContent = temperatureUnit === 'C' ? `${avgTemperatureC[index]} °C` : `${avgTemperatureF[index]} °F`;
  });
  const feelslikeDiv = document.querySelector('.feelslike');
  feelslikeDiv.textContent = `Feels Like ${temperatureUnit === 'C' ? feelsLike + '°C' : feelsLikeF + '°F'}`;
}

// Function to toggle temperature unit
function toggleTemperatureUnit() {
  if (temperatureUnit === 'C') {
    temperatureUnit = 'F';
    button.textContent = 'Display in °C '
  } else if (temperatureUnit ==='F') {
    temperatureUnit = 'C';
    button.textContent = 'Display in °F '
  }
  updateTextContents()
}



console.log(temperatureUnit)