const mongoose = require("mongoose");

const express = require("express");
const app = express();

const chalk = require('chalk'); // to style console.log texts
const keys = require("./keys.js");

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
const addNewUser = (data)=> {

    let newUser = new User(data);

    newUser.save()
    .then(() =>
    {                  
        console.log(chalk.magenta(`User registration:`),chalk.green(` Registration completed and database's document created!`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    })
    .catch((err)=>
    {
        console.log(chalk.magenta(`User registration:`),chalk.red(` ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    })
}

// This function is called in server.js to get all users from database
const getAllUsers = ()=> {
    let users = []

    User.find()
    .then((allUsers)=>
    {

    })
    return users
}   

module.exports = {
    initialize: initialize,
    addNewUser: addNewUser,
    getAllUsers: getAllUsers
}