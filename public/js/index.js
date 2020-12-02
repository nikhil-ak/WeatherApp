
const details = document.getElementById('weatherDetails')
const getWeather = ()=> {
    const searchTxt = document.getElementById('search').value;
    fetch(`/weather?address=${searchTxt}`)
    .then(res => res.json())
    .then(data =>  {if(data.name) {
        details.textContent = data.name + data.region + data.country + data.temperature  + data.weatherSummary + data.apparentTemperature}
    else {
        details.textContent = data.error;
    }})
    .catch(err => details.textContent = err);
}


const form = document.getElementById('weatherForm');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather()
})


