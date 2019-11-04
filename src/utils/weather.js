const req = require('request')

const tempData = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/9bc2407c5427131df3cebdac944bd30f/" + longitude + "," + latitude
    req({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("connection error!!", undefined)
        } else if (body.error) {
            callback("location not found!!", undefined)
        } else {
            const weatherNote = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            callback(undefined, weatherNote)
        }
    })
}

module.exports = tempData