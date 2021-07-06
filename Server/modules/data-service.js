const mongoose = require("mongoose");

const express = require("express");
const app = express();

const chalk = require('chalk'); // to style console.log texts
// const keys = require("./keys.js");
const bcrypt = require('bcryptjs');

const User = require("../Models/userSchema");
const CreditCard = require("../Models/creditCardSchema");

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
        
                    // set session key to empty string
                    newUser.currentSessionKey = "";
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
                // passwords match
                // create session id key
                const crypto = require('crypto');
                let sess_id = crypto.randomBytes(20).toString('hex');

                user.currentSessionKey = sess_id;

                user.save()
                .then(() => {

                    res.json({message:`USER LOGED IN SUCCESSFULLY !`, user: user})
                })
                .catch((err) => {
                    res.json({message: `Error: ${err}`});
                });
                //req.session.user.isLoggedOn = true
            }
            else{
                res.json({message:`ERROR: ${err} !`});
            }
        })
        .catch(err=>{ // error in case password is wrong
            res.json({message:`ERROR: ${err} !`})
        })

    })
    .catch(err=>console.log(`Error :${err}`)); //error in case user does not exists
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
    .catch(err=>console.log(`Error:Auction not found ${err}`));
}

const getSpecificUserWithDetails = (req, res) => {
    User.findOne({emailAddress: req.query.emailAddress})
    .then(user => {
        if(user.currentSessionKey != req.query.sessionId){
            res.json({message: "Your session key is invalid"});
        }
        else{
            CreditCard.findOne({userEmail: user.emailAddress})
            .then(creditCard => {
                res.json({
                    user: user,
                    creditCard: creditCard
                })
            })
            .catch(err=>console.log(`Error with credit card call: ${err}`));
        }
    })    
    .catch(err=>console.log(`Error with User call: ${err}`));
}


const addCreditCard = (data, res) => {
    let newCard = new CreditCard(data);
    newCard.save()
    .then(() => {
        console.log("Added credit card")
        res.json({message: "Success"})
    })
    .catch((err) => {
        console.log(err);
        res.json({message: "ERROR"})
    })
}


const updateUser = (data, userID, res) => {
    User.findById(userID)
    .then((user)=>
    {
        user.address.streetName = data.streetName
        user.address.streetNumber = data.streetNumber
        user.address.city = data.city
        user.address.postalCode = data.postalCode
        user.address.country = data.country
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.password = data.password
        
        User.findOne({emailAddress: data.emailAddress}) // CHECK IN DATABASE IF AN EMAIL ALREADY EXISTS
        .then(userForEmail=>
        {
            if(userForEmail == null) // if email does not exists, then go check if username exists
            {
                user.emailAddress = data.emailAddress
                user.save()
                .then(() => {
                    res.json({message:`USER UPDATED SUCCESSFULLY !`, user: user})
                })
                .catch((err) => {
                    res.json({message: `Error: ${err}`});
                });
            }

        })
        .catch((err) => {
            res.json({message: `Error: ${err}`});
        });

    })
}

//Get user auctions
const getUserAuctions = (req, res) => {
    User.findOne({emailAddress: req.query.emailAddress})
    .then(user => {
        if(user.currentSessionKey != req.query.sessionId){
            res.json({message: "Your session key is invalid"});
        }
        else{
                res.json({
                    user: user
                })
            }
    })    
    .catch(err=>console.log(`Error with User call: ${err}`));
}

//PUT auction to users auctions list
const auctionAddToUSerList = (req, res) => {
    //console.log(req.query.id, req.query.emailAddress)
   Auction.findOne({_id: req.query.id})
   .then( auction => {
       User.findOne({emailAddress: req.query.emailAddress})
       .then(user => {
           
           //add data from user to auction object 
           auction.userList.push({
               userName: user.userName, 
               emailAddress: user.emailAddress})
        
           //add data from auction to user object 
           user.manageAuction.push({
               auctionName: auction.title,
               productName: auction.product.name,
               auctionStatus: auction.status
            })

            auction.save()
            .then(()=> console.log("success"))
            .catch(err=>console.log(`ERROR: Did not succeded: ${err}`));

            user.save()
            .then(()=> console.log("success"))
            .catch(err=>console.log(`ERROR: Did not succeded: ${err}`));
           res.json({auction: auction, user: user})
       })
       .catch(err=>console.log(`ERROR: Could not find user: ${err}`));
   })
   .catch(err=>console.log(`ERROR: Could not find auction: ${err}`));
}


//POST user auction problem - reportAuctionProblem
// const reportAuctionProblem = (data, res) => {
//     let problem = new AuctionProblem(data);
//     problem.save()
//     .then(() => {
//         console.log("Problem submitted")
//         res.json({message: "Success"})
//     })
//     .catch((err) => {
//         console.log(err);
//         res.json({message: "ERROR"})
//     })
// }

module.exports = {
    initialize: initialize,
    addNewUser: addNewUser,
    getAllUsers: getAllUsers,
    getSpecificUser: getSpecificUser,
    getAllAuctions : getAllAuctions,
    addNewAuction: addNewAuction,
    addCreditCard: addCreditCard,
    updateUser: updateUser, 
    getSpecificUserWithDetails: getSpecificUserWithDetails,
    getUserAuctions : getUserAuctions,
    auctionAddToUSerList : auctionAddToUSerList
}