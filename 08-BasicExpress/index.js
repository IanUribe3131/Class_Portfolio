import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
})

app.post("/calculate-bmi", (req, res) => {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    
    const bmi = weight / (height * height);
    
    console.log("BMI: ", bmi);
    
    res.send(`Your BMI is ${bmi}`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});