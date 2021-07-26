const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const key = '5fd107075e478de72da692d7eb36f96b'

    //const url = 'http://api.weatherstack.com/current?access_key='+key+'&query=Bovenkarspel&units=m'
    const url = 'http://api.weatherstack.com/current?access_key='+key+'&query=Bovenkarspel&units=m&' + 'query=' + latitude + ',' + longitude


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(response.body)
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out.")
        }
    })
}

module.exports = forecast