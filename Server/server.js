const express = require("express");
//const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const cors = require("cors");
const chalk = require('chalk'); // to style console.log texts
const bodyParser = require("body-parser");
require("dotenv").config({path:'./modules/keys.env'});

const dataService = require("./modules/data-service.js");


const app = express();
app.use(cors());
app.use(bodyParser.json()); 


// API ROUTES
// POST /api/users
app.post("/api/users", (req,res)=>{
    myData.addNewUser(req.body)
    .then(()=>{
        res.json({message:`USER ADDED SUCCESSFULLY !`});
        
    })
    .catch((err)=>{
        res.json({message:`ERROR: ${err} !`});
        
    });
});





// ************* Initialize the Service & Start the Server
// ************** Initialize connection with Database
dataService.initialize();

