const express = require('express')

const app = express()

// Sets the template engine
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
