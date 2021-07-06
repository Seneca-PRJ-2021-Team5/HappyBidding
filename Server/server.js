const express = require("express");
const cors = require("cors");
corsOptions={
    cors:{
        origins:["http://localhost:5000"]
    }
}
const chalk = require('chalk'); // to style console.log texts
const bodyParser = require("body-parser");
const clientSessions = require("client-sessions");

const dataService = require("./modules/data-service.js");


const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, corsOptions);

app.use(cors());
app.use(bodyParser.json()); 


// Setup client-sessions
app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: process.env.SECRET, // this should be a long un-guessable string. (need to replace this later)
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

io.on("connection", socket => { 
    console.log("new client connected!")

    socket.on('sendMessage', (message, callback) => {
        //io.emit('message', { text: message });

        currentDate = new Date();
        console.log(currentDate);
        io.emit('message', 
        {
            position: 'left', 
            title: 'User', 
            type: 'text', 
            text: message, 
            date: currentDate
        });
        callback();
    });

});

// Helper function to ensure that the user is logged in
function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.status(403).send('Forbidden access');
    } else {
      next();
    }
}

app.get("/",(req,res)=>{
    res.send({message: "it is alive"})
})

// API ROUTES
// POST /api/user
app.post("/api/user", (req,res)=>{

    dataService.addNewUser(req.body, res)
});

app.post("/api/auction", (req,res) => {
    dataService.addNewAuction(req.body, res)
});


// GET /api/users GET ALL USERS
app.get("/api/users", (req,res)=>{
    dataService.getAllUsers(res)
});


// GET /api/users GET A SPECIFIC USER
app.get("/api/user", (req,res)=>{
    req.session.user = {
        isLoggedOn: false
    }
    dataService.getSpecificUser(req,res)
});

//get autions
app.get("/api/auctions", (req, res) => {
    dataService.getAllAuctions(req, res)
});

// GET /api/user/profile GET A SPECIFIC USER AND DETAIL INFO FOR PROFILE
//app.get("/api/user/profile", ensureLogin, (req, res) => {
app.get("/api/user/profile", (req, res) => {
    dataService.getSpecificUserWithDetails(req, res);
});

app.post("/api/user/creditcard", (req, res) => {
    dataService.addCreditCard(req.body, res);
})

app.put("/api/user/:id",(req,res)=>
{
    dataService.updateUser(req.body, req.params.id, res);
})

//-------------------------------------------------------
// GET user auctions
app.get("/api/user/auctions", (req, res) => {
    dataService.getUserAuctions(req, res);
});

// POST user auction problem
app.post("/api/user/auctionproblem", (req, res) => {
    dataService.reportAuctionProblem(req.body, res);
})

//POST auction to user (route called once user registers to an auction)
app.post("/api/user/auction", (req, res) =>{
    dataService.auctionAddToUSerList(req, res);
})


//--------------------------------------------------------

// ------------------- CONNECTIVITY PART
//
// ************* Initialize the Service & Start the Server

const HTTP_PORT = process.env.PORT || 5000;
httpServer.listen(HTTP_PORT,()=>{
    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    console.log(chalk.yellow(`WEB SERVER:`), chalk.green(` STARTED AT PORT ${HTTP_PORT}`));
})

// ************** Initialize connection with Database
dataService.initialize();

