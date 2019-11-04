const req = require('request')

const location = ((place, callback) => {
    const url_gl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(place) + ".json?access_token=pk.eyJ1IjoiYW5hbmRsb2syMCIsImEiOiJjazJlbnR2bmIwYmRiM2hxdzVuYTFsd2hxIn0.hGE1yoNmk7wW8ZQnTfkXIA&limit=1"
    req({ url: url_gl, json: true }, (error, { body }) => {
        if (error) {
            callback("Error in connection!!", undefined)
        } else if (body.features.length === 0) {
            callback("Place not found!!", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                placeName: body.features[0].place_name
            })
        }
    })
})

module.exports = location