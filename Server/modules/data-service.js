const mongoose = require("mongoose");

const express = require("express");
const app = express();

const chalk = require('chalk'); // to style console.log texts
const keys = require("./keys.js");
const bcrypt = require('bcryptjs');

const User = require("../Models/userSchema");


// function initialize creates the connection between server and MongoDB database
const initialize = ()=>{

    mongoose.connect(keys.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
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

module.exports = {
    initialize: initialize,
    addNewUser: addNewUser,
    getAllUsers: getAllUsers,
    getSpecificUser: getSpecificUser
}