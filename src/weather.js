const req = require('request')

const forecast = (obj, callback) => {
    const url_weather = 'http://api.weatherstack.com/current?access_key=1788e59bbb6a680cb98b94ce137da281&query=' + obj.latitude + ',' + obj.longitude + '&units=f'
    req({url:url_weather, json: true}, (err, {body}) => {
        if(err) {
           callback('unable to connect to weather service')
        }
        else if( body.error) {
           callback('unable to find location');
        }
        else {
            callback({name: body.location.name,
                 region: body.location.region,
                   country: body.location.country,
                     weatherSummary: body.current.weather_descriptions[0],
                      temperature: body.current.temperature,
                       apparentTemperature: body.current.feelslike});
        }
        
    })
    
}


const geocode = (place, callback) => {
    const url_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1Ijoibmlra3oiLCJhIjoiY2tpNWtzbjVmMnJyNzJ4bXBvZjkwd3lnZSJ9.kSUwbXa9gR2iAPPKgUNC7g';
    req( {url: url_mapbox, json: true}, (err, {body}) => {
        if(err) {
            callback('unable to connect to map service')
        }
        else if(body.features.length==0) {
            callback('unable to access location')
        }
        else {
            const {features} = body;
            const latitude = features[0].center[1];
            const longitude = features[0].center[0];
            callback({latitude, longitude});
        }
       
    })
}



module.exports = {geocode, forecast}