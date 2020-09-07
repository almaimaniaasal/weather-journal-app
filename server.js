// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, () => console.log(`running on localhost: ${port}`));

//Routes

//Get Data
app.get('/allInfo', (req, res) => {

    res.send(projectData);
});

//Post Data
app.post('/addInfo', (req, res) => {

    let data = {
            date: req.body.date,
            temp: req.body.temp,
            userFeeling: req.body.userFeeling
        }

    projectData = data;
    console.log(projectData);
    res.send(projectData);
});