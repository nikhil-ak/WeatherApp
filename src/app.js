const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const weather = require('./weather')

const port = process.env.PORT || 3000
// dir for static file, dynamic files  and partials
const htmlDirectory = path.join(__dirname, '../public');
const dynamicDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Static loading of files in 'public' folder
app.use(express.static(htmlDirectory))

// Setting hbs engine and changing folder name 
app.set('view engine', 'hbs') 
app.set('views', dynamicDir)

hbs.registerPartials(partialsDir)

// Dynamic loading of files from folder 'view' containing hbs file whci is rendered using 'res.render'
app.get('',(req,res) => {
    res.render('index', {
        title:  'home page',
        content: 'home sweet home',
        owner: 'nikhil'
    });
})

app.get('/about',(req,res) => {
    res.render('about', {
        title:  'about page',
        content: 'about this page',
        owner: 'nikhil'
    });
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:  'help page',
        content: 'help me',
        owner: 'nikhil'
    });
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide the address"
        })
    }
    const address = req.query.address;
    weather.geocode(address, (locationRes)=> {
        if(typeof(locationRes) === 'object') {
            weather.forecast(locationRes, (forecastRes) => {
                res.send(forecastRes);
                })
        }
        else{
            res.send({
                error: locationRes
            })
        }
        
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        content: 'Help article not found'
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        content: 'Page not found'
    });
})

app.listen(port, () => {
    console.log("server running");
})