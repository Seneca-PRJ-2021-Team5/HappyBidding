const express = require("express");
const cors = require("cors");
const chalk = require('chalk'); // to style console.log texts
const bodyParser = require("body-parser");
const clientSession = require("client-sessions");

const dataService = require("./modules/data-service.js");


const app = express();
app.use(cors());
app.use(bodyParser.json()); 


// Setup client-sessions
app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "alongunguessablestring", // this should be a long un-guessable string. (need to replace this later)
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));


app.get("/",(req,res)=>{
    res.send({message: "it is alive"})
})

// API ROUTES
// POST /api/user
app.post("/api/user", (req,res)=>{

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

// GET /api/user/profile GET A SPECIFIC USER AND DETAIL INFO FOR PROFILE
app.get("/api/user/profile", (req, res) => {
    dataService.getSpecificUserWithDetails(req, res);
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

