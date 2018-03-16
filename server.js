const express = require('express')

const bodyParser = require('body-parser');

const app = express()

// Sets the template engine
app.set('view engine', 'ejs')

// Allows connection to the CSS file
app.use(express.static('public'));

// Accesses bodyParser parser and allows us to access the name of the city the user typed
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index');
})

// post request that logs the value of 'city' to the console
app.post('/', function (req, res) {
  res.render('index');
  console.log(req.body.city);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
