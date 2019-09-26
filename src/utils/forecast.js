const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/edb628df8e82e5353bf45ae6550c0fcb/' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('You are not connected to the internet', undefined)
        } else if(body.error) {
            callback ('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.apparentTemperature  + ' degrees out. there is a ' + body.currently.precipProbability + ' chance of rain' )        
        }
    })
}

module.exports = forecast