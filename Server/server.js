const express = require("express");
const cors = require("cors");
const chalk = require('chalk'); // to style console.log texts
const bodyParser = require("body-parser");

const dataService = require("./modules/data-service.js");


const app = express();
app.use(cors());
app.use(bodyParser.json()); 

app.get("/",(req,res)=>{
    res.send({message: "it is alive"})
})

// API ROUTES
// POST /api/users
app.post("/api/users", (req,res)=>{

    dataService.addNewUser(req.body, res)
});


// GET /api/users GET ALL USERS
app.get("/api/users", (req,res)=>{
    dataService.getAllUsers(res)
});


// GET /api/users GET A SPECIFIC USER
app.get("/api/user", (req,res)=>{
    dataService.getSpecificUser(req,res)
});


// ------------------- CONNECTIVITY PART
//
// ************* Initialize the Service & Start the Server

const HTTP_PORT = process.env.PORT || 8080;
app.listen(HTTP_PORT,()=>{
    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    console.log(chalk.yellow(`WEB SERVER:`), chalk.green(` STARTED AT PORT ${HTTP_PORT}`));
})

// ************** Initialize connection with Database
dataService.initialize();

