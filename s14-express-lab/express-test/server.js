import express from 'express';
import { getWeatherFrom } from './services/meteoService.js';

//const express = require('express');

const app = express();
app.use(express.json());//middleware

const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

class WeatherError extends Error {
  constructor(message, statusCode, rootCauseClass) {
    super(message);
    this.name = name;
  }
}

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/about', (req, res) => {
  res.send(';lakskjdf;lakssdjf');
})
// /api/scientists?dept=***
app.get('/api/scientists', (req, res) => {
  const { dept } = req.query; // this is called destructuring (decomposing an object to extract certain variables)
  if(dept){
    /*const result = [];
    for (const scientist of scientist) {
      if(scientist.department === dept)
        result.push(scientist);
    }
    return result;*/
    const result = scientists.filter((scientist) => scientist.department.toLowerCase() === dept.toLowerCase()); //<- this is the same thing as the comented code above
    if(result && result.length >0){     
      return res.json({
      msg: "hello",
      deptScientists: result,
      dept,
      count: result.length,
      });
    }else {
      return res.json({
        errorMsg: `No results for department ${dept}`,
        dept,
      })
    }
  }
  res.json({deptScientists: scientists, count: scientists.length,});
});

// /api/scientists/:id
app.get('/api/scientists/:id', (req, res) => { 
  const scientistId = parseInt(req.params.id, 10);
  const scientist = scientists.find((scientist) => scientist.id === scientistId);
  if(!scientist) {
    return res.json({ success: false, errorMsg: "No scientist found.", });
  }
  res.json({
    success: true,
    data: scientist,
  })
});


app.get('/api/initiatives', (req,res) => {
  res.json({initiatives, status: "OK"});

});

app.post('/api/initiatives', (req,res) => {
  const { title, budget, department } = req.body;
  const initiative = {title, budget, department};
  initiatives.push(initiative);
  res.json({title, budget, department});

});

app.get('/greet', (req, res) => {
    const { name, city } = req.query
  res.send(`hello  ${name}, how is the weather in ${city}`);
});

app.post('/about', (req, res) => {
  res.send('bombocclatt');
});


app.all('/{*splat}' , (req,res, next) => {
  next(new Error("Endpoint not found"));
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});