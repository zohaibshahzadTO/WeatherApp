const express = require('express')

const bodyParser = require('body-parser');

const request = require('request');

const app = express()


const apiKey = '36cf96d5b76bdafa58579914ab631a00';


// Allows connection to the CSS file
app.use(express.static('public'));

// Accesses bodyParser parser and allows us to access the name of the city the user typed
app.use(bodyParser.urlencoded({ extended: true }));

// Sets the template engine
app.set('view engine', 'ejs')



app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

// post request that logs the value of 'city' to the console
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', {weather: null, error: 'Error, please try again'});
      }
      else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
