/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=';
const apiKey = '&APPID=c40454a9e5a148e63837da187274eee9&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

/* Function called by event listener */
const generate = (event) => {

    const zip = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;

    //Get the data using the zip, url and API key
    getWeatherData(baseUrl, zip, apiKey)

    .then(function(data) {
        console.log(data);

        //Add data to POST request
        postData('/addInfo', { date: newDate, temp: data.list[0].main.temp, userFeeling: userFeelings });
        updateUI();
    })

    // .then(updateUI())
}

// Event listener to add function to existing HTML DOM element
generateButton = document.getElementById('generate');
generateButton.addEventListener('click', generate);

//To get weather data from the API
const getWeatherData = async(url, zip, apiKey) => {

    const response = await fetch(url + zip + apiKey);

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//To use the Post route
const postData = async(url, data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//Update the website with the needed information
const updateUI = async() => {
    const request = await fetch('/allInfo');

    try {
        const allData = await request.json();

        console.log(allData);

        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userFeeling;
    } catch (error) {

        console.log("error", error);
    }
}