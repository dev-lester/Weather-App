const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser')

const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")

});

app.post('/', (req, res) => {

    const query = req.body.cityName;
    const apiKey = "Your API key here"; // register to open-weather to get your api key https://openweathermap.org/
    const unit = "metric";

    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(URL, (response) => {

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const discription = weatherData.weather[0].description
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const iconUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write("<p>Weather discription " + discription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees celcius.</h1>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        });
    });
});




app.listen(port, () => {
    console.log(`App is running on port ${port}..`)
});