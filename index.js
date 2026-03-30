const btn=document.getElementById('button');
const location_value=document.getElementById('user-location');
const citytime=document.getElementById('city_time');
const citytemp=document.getElementById('city_temp');
const cityname=document.getElementById('city_name');
const weather_condition_text=document.getElementById('condition_text');
const feel_like=document.getElementById('feelslike');
const humidity=document.getElementById('humidityhtml');
const icon=document.getElementById('weather_icon');
const wind=document.getElementById('windhtml');
const pressure=document.getElementById('pressurehtml');
const uv=document.getElementById('uvhtml');
const input=document.getElementById('input_user')
const input_btn=document.getElementById('input_buttton')
btn.addEventListener('click',async ()=>{
    navigator.geolocation.getCurrentPosition(success,failure)
})

input_btn.addEventListener('click', async() => {
    const user_location=input.value;
    if (user_location==="") {
        alert("Please Enter Your Location")
        return;
    }
    else{
       const result=await weather(user_location)
       updateUI(result)
    }
})

async function success(position){
   const lat=  position.coords.latitude
   const long= position.coords.longitude
   const result=await weather(`${lat},${long}`)
   updateUI(result)}



// CREATING A FORECAST FUNCTION

function showForecast(days){
    const container = document.getElementById("forecast_container");
    container.innerHTML = ""; // clear old data.

    days.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

const card = document.createElement("div");
        card.classList.add("forecast_card");


        card.innerHTML += `
                <p>${dayName}</p>
                <img src="https:${day.day.condition.icon}" width="50"/>
                <p>${day.day.maxtemp_c}° / ${day.day.mintemp_c}°</p>
        `;
  card.addEventListener("click", () => {
            updateDayWeather(day);   // update main UI
            highlightCard(index);   // highlight clicked
        });

        container.appendChild(card);

    });
}




function updateDayWeather(day){
    citytemp.innerText = `${day.day.avgtemp_c}°C`;
    weather_condition_text.innerText = day.day.condition.text;
    icon.src = `https:${day.day.condition.icon}`;

    // forecast API daily data
    humidity.innerText = `Humidity: ${day.day.avghumidity} %`;
    wind.innerText = `Wind: ${day.day.maxwind_kph} km/h`;
}






function highlightCard(selectedIndex){
    const cards = document.querySelectorAll(".forecast_card");

    cards.forEach((card, index) => {
        if(index === selectedIndex){
            card.style.background = "#4CAF50";
            card.style.color = "white";
        } else {
            card.style.background = "white";
            card.style.color = "black";
        }
    });
}





   function updateUI(result) {
    cityname.innerText=`${result.location.name},${result.location.region}`
  citytemp.innerText=`${result.current.temp_c}°C`
  citytime.innerText=`${result.location.localtime}`
  weather_condition_text.innerText=`${result.current.condition.text}`
  feel_like.innerText=`Feels Like: ${result.current.feelslike_c} °C`
  icon.src=`https:${result.current.condition.icon}`
  humidity.innerText=`Humidity: ${result.current.humidity} %`
  wind.innerText=`Wind: ${result.current.wind_kph} km/h`
    pressure.innerText= `Pressure: ${result.current.pressure_mb} mb`
uv.innerText=`UV Index: ${result.current.uv}`
showForecast(result.forecast.forecastday)
   }




function failure(){
alert("Location permission denied")
}
async function weather(query){
        const weather_data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=edf357f32cc846d5946183041261903&q=${query}&days=7`) 
    const data=await weather_data.json()
    return data
}


