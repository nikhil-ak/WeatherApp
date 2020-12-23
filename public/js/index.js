
const details = document.getElementById('weatherDetails')
const getWeather = (obj)=> {
    if(!obj) {
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
    else {
        fetch(`/weather?latitude=${obj.latitude}&&longitude=${obj.longitude}`)
        .then(res => res.json())
        .then(data =>  {if(data.name) {
            details.textContent = data.name + data.region + data.country + data.temperature  + data.weatherSummary + data.apparentTemperature}
        else {
            details.textContent = data.error;
        }})
        .catch(err => details.textContent = err);
    }
    
}


const form = document.getElementById('weatherForm');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather()
})

const sendLocationBtn = document.querySelector('#send-location')

sendLocationBtn.addEventListener("click", () => {
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by browser")
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        getWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        // return {
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.latitude
        // }
    })
   
})


