const path = require('path');
const express = require('express'); // Express is just a single function. Not an object.
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

/**
 * Define directories
 */
const publicPath = path.join(__dirname, '../public');
// const viewPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials');

/**
 * Setup handlebars templating engine
 */
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
// app.set('views', viewPath); //Set custom views directory

/**
 * Setup static directory to use / Directory to place website assets
 */
app.use(express.static(publicPath));

/**
 * Directory routing
 */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Site',
        name: 'Mileno Valdo'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mileno Valdo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mileno Valdo'
    });
});

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Milo',
//         age: 420,
//         pp_lenght: '16km'
//     }); //Accepts object and it will be parsed as a JSON
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// });

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        });
    }

    geocode(req.query.address, (geocodeError, {longitude, latitude, place} = {}) => {
        if (geocodeError){
            return res.send({
                error: geocodeError
            });
        }
        
        forecast(longitude, latitude, (forecastError, forecastData) => {
            if (forecastError){
                return res.send({
                    error: forecastError
                });
            }

            return res.send({
                location: place,
                data: forecastData
            });
        });
    });

    // res.send({
    //     location: req.query.address,
    //     weather: 'Some weather info'
    // });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Provide a search term.' //request and response only occur onces
        });
    }

    console.log(req.query.search);
    res.send({ 
        products: []    //This will not be able to run properly because there can only be one response and request
    });
});

/**
 * 404 Page routing
 */
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: 'Error 404',
        name: 'Mileno Valdo'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 'Error 404',
        name: 'Mileno Valdo'
    });
});

//app.com
//app.com/about


app.listen(port, hostname, () => {
    console.log(`Server running on port http://${hostname}:${port}`);
});