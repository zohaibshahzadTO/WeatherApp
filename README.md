# Weather Application

In this project, we'll be creating a fully functioning website that'll display the temperature of any city throughout the world in real-time using the OpenWeatherMap.org API, Node.js + Express.js.

# Project Setup

<li>OpenWeatherMap.org account. It’s a quick 20 second signup. After creating an account, acquire the free API by creating a key on "Current Weather API".</li>
<li>Node.js: Visit the official Node.js website to download and install Node if you haven’t already. Moreover, install the npm</li>

1.) Create an empty directory named *weather-app*

2.) Open up your console, navigate to initialize the project.

3.) Fill out the required information to init the project when creating a package.json file.

4.) Within the *weather-app* directory, create a file name *server.js* - this file will house the code for our application.

Now we can start building.

# Creating our Server (with Express.js)

First we need to get our server up and running. We'll use Express.js to do this. Express is a minimalist web framework for Node.js and it makes it quite simple to create and run a web server with Node.js

To use express, install it in the console:

  *npm install --save express*

Once installed, copy the boilerplate Express starter app from the Express documentation:

  *const express = require('express')
   const app = express()

   app.get('/', function (req, res) {
     res.send('Hello World!')
   })

   app.listen(3000, function () {
     console.log('Example app listening on port 3000!')
   })*

Above is an example of the simplest application that we can create with Express.js. First we require the express package that was just installed. Then, we create an instance named *app* by invoking Express.

The *app.get('/'...* means we are specifically fousing on the root URL (/). If we visit the root URL, Express will respond with "Hello World!".

The *app.listen(...* shows we are creating a server that is listening on port 3000 for connections.

We can now test the server by running the following in the console:

  *node server.js*

If you type the *localhost:3000* into your web browser, you'll see the "Hello World!" message displayed.

We've just created a server with Node.js and Express!

# Setting up the index view

Instead of responding with text when someone visits our root route, we would like to respond with an HTML file. For this, we'll be using EJS (Embedded Javascript). EJS is a templating language.

In order to use EJS in Express, we need to set up our template engine.

*A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.*

The short version is that EJS allows us to interact with variables and then dynamically create our HTML based on those variables.

First, we'll install EJS in the terminal/console:

  *npm install ejs --save*

We can then set up our template engine with this line of code in our server.js file:

  *app.set('view engine', 'ejs')*

EJS is accessed by default in the *views* directory. So create a new folder named *views* in your directory. Within that *views* folder, add a file named *index.ejs*. Think of this *index.ejs* file as an HTML file for now.

Currently, this is what our file structure should look like:

*|-- weather-app
  |-- views
    |-- index.ejs
  |-- package.json
  |-- server.js*

The following is a boilerplate for the *index.ejs* file. The HTML is just a form with one input for a city, and one submit button:

  *See index.ejs*

Now that we've built upon our *index.ejs* file, we want to replace our *app.get* code:

  *See index.ejs file commit*

Instead of using *res.send*, we use *res.render* when working with a templating language. *res.render* will render our view, then send the equivalent HTML to the client.

At this point, we can test again by running:

  *node server.js*
  // Example app listening on port 3000.

# Implemented CSS

  *See github repo for styling*

Express wont allow access to the css file by default, so we need to expose it with the following line of code:

  *app.use(express.static('public'));*

# setting up our POST Route

We have one get route, and then we create our server. However, for our application to work, we need a post route as well. If you look at our *index.ejs* file, you can see that our form is submitting a post request to the / route:

  *<form action="/" method="post">*

Now that we know where our form is posting, we can setup the route. A post request looks just like the get request, with one minor change:

  *app.post('/', function (req, res) {
    res.render('index');
   })*

But instead of just responding with the same html template, lets access the name of the city the user typed in as well. For this we need to use an Express Middleware.

Express is a minimalist framework. However, we can make use of Middleware (functions that have access to the *req* and *res* bodies) in order to preform more advanced tasks.

We’re going to make use of the *body-parser* middleware. *body-parser* allows us to make use of the key-value pairs stored on the *req-body* object. In this case, we’ll be able to access the city name the user typed in on the client side.

To use body-parser, we must install it first:

  *npm install body-parser --save*

Once installed, we can require it, and then make use of our middleware with the following line of code in our *server.js*:

  *const bodyParser = require('body-parser');
   // ...
   // ...
   app.use(bodyParser.urlencoded({ extended: true }));*

For the scope of this project, it’s not necessary you understand exactly how that line of code works. Just know that by using *body-parser* we can make use of the *req.body* object.

Finally, we can now update our post request to log the value of ‘city’ to the console.

 *app.post('/', function (req, res) {
    res.render('index');
    console.log(req.body.city);
  })*

Now test it! ...localhost:3000

Now open your browser and visit: localhost:3000, type a city name into the field and hit enter!

If you go back to your command prompt, you should see the city name displayed in the prompt! Awesome, you’ve now successfully passed data from the client to the server!

# Finishing Up

What were going to do is make a request to the OpenWeatherMap API in our app.post request. Here’s what the code looks like:

# 1.) Setting up our URL:

The first thing we do when we receive the post request is grab the city off of req.body. Then we create a url string that we’ll use to access the OpenWeatherMap API with:

  *app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`*

# 2.) Make our API Call

Now that we have our URL, we can make our API call. When we receive our callback, the first thing we’re going to do is check for an error. If we have an error, we’re going to render our index page. But notice that I’ve also added in a second argument. res.render has an optional second argument — an object where we can specify properties to be handled by our view ( index.ejs ).

In this instance, I’ve added an error string:

  *request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});*

# 3.) Display the Weather

Now that we know we have no API error, we can parse our JSON into a usable JavaScript object.

The first thing we’ll do is check to see if weather.main == undefined . The only reason why this would be undefined, is if our user inputs a string that isn’t a city (‘3’, ‘afefaefefe’, etc.). In this instance, we’ll render the index view, and we’ll also pass back an error.

If weather.main != undefined, then we can finally send back the weather to the client! We’ll create a string that clarifies what the weather is, and send that back with the index view.

    *} else {
        let weather = JSON.parse(body)

        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }*

# Using EJS

There's only one thing left to do at this point. We need to make use of all those variables we sent back with our *res.render* call. These variables aren't available on the client, this is where we finally get to use EJS. There are three possible scenarios that we have in our code.

1.) {weather: null, error: null}
2.) {weather: null, error: ‘Error, please try again’}
3.) {weather: weatherText, error: null}

We need to make two simple changes to our *index.ejs* to handle these three scenarios. Lets break it down:

    *<% if(weather !== null){ %>
      <p><%= weather %></p>
     <% } %>

     <% if(error !== null){ %>
       <p><%= error %></p>
     <% } %>*

It helps to remember that EJS stands for Embedded Javascript. With that in mind, EJS has opening and closing brackets: *<% CODE HERE %>* Anything between the brackets is executed. If the opening bracket also includes an equal sign: *<%= CODE HERE ADDS HTML %>*, then that code will add HTML to the result.

If we look at our EJS that we've added. we're testing to see if either of our *weather*, or *error* variables are null. If they're both *null*, nothing happens. However, if one isnt null (i.e. it has a value), then we will add a paragraph to the screen with the value of the respective variable.
