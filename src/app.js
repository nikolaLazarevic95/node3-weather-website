const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()     //!express je fja,ne obj mora da se call

//Define paths for Exress config
const publicDirectoryPath = path.join(__dirname, '../public') 
//! da pristupis public folderu u ovoj app
//! da bi mogoa da koristis html/ strane iz njega
const viewsPath = path.join(__dirname, '../templates/views') //! posle __dirname
//!(vraca path gde je app.js(src folder) otvoren pa moras dalje sam)
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directionary to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Nikola Lazarevic'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About me', 
        name: 'Nikola Lazarevic'
    }) 
})

app.get('/help', (rew, res) => {
    res.render('help', {
        title: 'Help', 
        helpText:'This page is about...',
        name: 'Nikola Lazarevic'
    
    })
})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({ //! nabode app ako ne stavis return, stavljas ga da bi prestalo da ucitava kod posle njega
            //! ili ce da ucita console.log posle i izacice error neki, 
            //! mogao si i da stavis else pa ovo console.log ali ovako svi rade u expressu
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address) { 
        return res.send({
            error: 'You must provide an address'
        })
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } ={})=> { 
        if(error) {
            return res.send ({error})
        }

        forecast (latitude, longitude, (error, forecastData) =>{
            if(error) {
            return res.send ({ error })
            }

            res.send({
            forecast: forecastData, 
            location, 
            address: req.query.address
            })
        })
    }) 
})

app.get('/help/*',(req,res) =>{
    res.render('404.hbs', {
        title: '404', 
        name:'Nikola Lazarevic',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 404, 
        name:'Nikola Lazarevic', 
        errorMessage:'Page not found.'
    })
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000.')
})














































































