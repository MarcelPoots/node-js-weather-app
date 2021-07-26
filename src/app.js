const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'Marchello'

    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({error:'The address query is required.'})
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
        if (error) {
            return  res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return  res.send({error})
            }

            //console.log(location)
            //console.log(forecastData)

            res.send({forcast :forecastData,
                      location,
                      address: req.query.address})
        })
    })




  
})

app.get('/help/*', (req, res) =>{
    res.render('404', {errorMessage:'The help topic could not be found'})
})

app.get('*', (req, res) =>{
    res.render('404', {errorMessage:'The page could not be found'})
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})