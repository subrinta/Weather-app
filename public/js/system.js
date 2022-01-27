const formPage = document.querySelector('form')
const input = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const body = document.getElementsByTagName('body')[0];
let post = document.getElementById('postbox')

formPage.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = input.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then(({error, place_name, forecastData}={})=>{
            if(error){
                post.style.visibility = 'visible'
                msg1.textContent = error
                msg2.textContent = ''
                body.style.backgroundImage = 'url()';
            }
            else{
                post.style.visibility = 'visible'
                msg1.textContent = 'Location is ' + place_name
                msg2.textContent = 'Weather is ' + forecastData.weather_descriptions +'. Current Temperature is ' + forecastData.current_temperature + ' ℃. Humidity is ' + forecastData.humidity + '.'
                document.getElementById('imgDiv').innerHTML = '<img src =' + forecastData.icon + '>'
                let path = '/img/'+forecastData.weather_code+'.jpg'
                body.style.backgroundImage = 'url(' + path + ')';
                console.log(forecastData.weather_code)
            }
        })
    })
})