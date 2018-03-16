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
