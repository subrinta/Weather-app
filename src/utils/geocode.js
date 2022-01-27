const request = require('request')
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicGlwcmEiLCJhIjoiY2t5czV3YXZnMTBlbjJubzE1NzZkZHE1aiJ9.QsvaQr2uFQ80uQMDbvTWOg'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('check your internet connection')
        }
        else if(body.features.length==0){
            callback('No place found with given name')
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode