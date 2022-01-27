const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcust')
const app = express()

//creating paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting engines and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// rejistering static assets
app.use(express.static(publicDirectoryPath))


app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        text: 'Use this site to know weather',
        creator: 'Subi'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Sending help...',
        creator: 'Subi'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me ',
        story: 'This Application is created by Subrinta Karmakar.',
        creator: 'Subi'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send ({
            error: 'location should be given'
        })
    }
    const add = req.query.address
    geocode(add, (error, {latitude, longitude, place_name}={})=>{
        if(!error){
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    res.send({
                        error
                    })
                }
                else{
                    res.send({
                        place_name,
                        forecastData
                    })
                }
            })
        }
        else{
            res.send({
                error
            })
        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('errorFile', {
        title: '404 NOT Found',
        error: 'This page has no help, go to hell',
        creator: 'Subi'
    })
})

app.get('*', (req, res)=>{
    res.render('errorFile', {
        title: '404 NOT Found',
        error: '404 ERROR',
        creator: 'Subi'
    })
})

app.listen(3000, ()=>{
    console.log('Server Started')
})