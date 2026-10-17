const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const axios = require("axios");
const FormData = require("form-data");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true }));

// https get
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// https post
app.post("/", (req, res) => {
    const city = req.body.cityName;
    const apiKey = process.env.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const weatherData = JSON.parse(data);

            if (response.statusCode !== 200) {
                return res.send(`
                    <h1>Error</h1>
                    <p>${weatherData.message}</p>
                    <a href="/">Try again</a>
                `);
            }

            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const cityName = weatherData.name;

            res.send(`
                <h1>Weather in ${cityName}</h1>
                <h2>${temperature} °C</h2>
                <p>${description}</p>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                <br>
                <a href="/">Check another city</a>
            `);
        });

    }).on("error", (error) => {
        console.error(error);
        res.status(500).send("Could not connect to the weather API.");
    });
});

// axios post

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
