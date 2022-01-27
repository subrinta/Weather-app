const request = require("request");

const forcust = (lati, longi, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=841c12045c7f9b365e88fed3c79e1772&query='+lati +',' + longi

    request({url: url, json: true}, (error, {body})=>{
        if(error){
            callback('Check your internet connection')
        }
        else if(body.error){
            callback(body.error.info)
        }
        else
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0] ,
                current_temperature: body.current.temperature,
                humidity: body.current.humidity,
                weather_code: body.current.weather_code,
                icon: body.current.weather_icons[0]
            })
    })
}

module.exports = forcust