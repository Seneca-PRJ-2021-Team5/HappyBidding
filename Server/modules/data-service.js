const mongoose = require("mongoose");

const express = require("express");
const app = express();

const chalk = require('chalk'); // to style console.log texts
// const keys = require("./keys.js");
const bcrypt = require('bcryptjs');

const User = require("../Models/userSchema");

const Auction = require("../Models/auctionSchema");

require("dotenv").config({path:'./modules/keys.env'});


// function initialize creates the connection between server and MongoDB database
const initialize = ()=>{

    //mongoose.connect(keys.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USRNAME}:${process.env.MONGODB_PASSWD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?${process.env.MONGODB_ENDLINK}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(chalk.yellow(`Happy Bidding database: `) + chalk.green(`SCCESSFULLY connected to the database !`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    })
    .catch((err)=>{
        console.log(chalk.yellow(`Happy Bidding database:`) + chalk.red(`ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    });

}


// This function is called in server.js to post a new user document into users collection
const addNewUser = (data, res)=> {
    User.findOne({emailAddress: data.emailAddress}) // CHECK IN DATABASE IF AN EMAIL ALREADY EXISTS
    .then(userForEmail=>
    {
        if(userForEmail == null) // if email does not exists, then go check if username exists
        { 
            User.findOne({userName: data.userName}) // CHECK IN DATABASE IF A USERNAME ALREADY EXISTS
            .then(user=>
            {
                if(user == null) // if userName does not exists yet, then persist data to database
                { 
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(data.password, salt);
                    data.password = hash
        
                    let newUser = new User(data);
        
                    newUser.save()
                    .then(() =>
                    {                  
                        console.log(chalk.magenta(`User registration:`),chalk.green(` Registration completed and database's document created!`));
                        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                        res.json({message:`USER REGISTERED SUCCESSFULLY !`})
                    })
                    .catch((err)=>
                    {
                        console.log(chalk.magenta(`User registration:`),chalk.red(` ERROR ${err}`));
                        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                        res.json({message:`ERROR: ${err} !`});
                    })
                }
                else {
                    res.json({message:`USERNAME ALREADY REGISTERED`})
                }
            })

        }
        else {
            res.json({message:`EMAIL ALREADY REGISTERED`})
        }
    })

    

   
    
    

    
}

// This function is called in server.js to get all users from database
const getAllUsers = (res)=> {
    
    User.find()
    .then((allUsers)=>
    {
        res.json(allUsers)
    })
} 

const getSpecificUser =(req, res)=> 
{
    User.findOne({emailAddress: req.query.emailAddress})
    .then(user=>
    {
        bcrypt.compare(req.query.password,user.password)
        .then(isMatched=>
        {
            if(isMatched == true)
            {
                res.json({message:`USER LOGED IN SUCCESSFULLY !`})
            }
            else{
                res.json({message:`ERROR: ${err} !`});
            }
            
        })

    })
    .catch(err=>console.log(`Error :${err}`)); 
}
//MARK: retrieve auction data
const getAllAuctions = (req, res) => {
    Auction.find()
    .then((auctions) => {
        res.json(auctions)
    })

}

const addNewAuction = (data,res) => {
    Auction.findOne({title: data.title})
    .then(auctionByTitle => 
    {
        console.log(auctionByTitle);
        console.log(data.title);

        if(auctionByTitle == null)
        {
            let newAcution = new Auction(data);
            newAcution.save()
            .then(() => 
            {
                console.log(chalk.magenta(`Auction added:`),chalk.green(` Adding completed and database's document created!`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                res.json({message:`AUCTION ADDED SUCCESSFULLY !`})
            })
            .catch((e) =>
            {
                console.log(chalk.magenta(`Auction added:`),chalk.red(` ERROR ${err}`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                res.json({message:`ERROR: ${err} !`}); 
            })
        }
        else
        {
            res.json({message:`AUCTION ALREADY ADDED `});
        }
    })
}

module.exports = {
    initialize: initialize,
    addNewUser: addNewUser,
    getAllUsers: getAllUsers,
    getSpecificUser: getSpecificUser,
    getAllAuctions : getAllAuctions,
    addNewAuction: addNewAuction
}