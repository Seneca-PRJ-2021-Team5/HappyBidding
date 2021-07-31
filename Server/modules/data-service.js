const mongoose = require("mongoose");

const express = require("express");
const app = express();

const chalk = require('chalk'); // to style console.log texts
// const keys = require("./keys.js");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require("nodemailer");

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

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(data.password, salt);
            data.password = hash

            let newUser = new User(data);

            // set session key to empty string
            newUser.currentSessionKey = "";
            newUser.save()
            .then(() =>
            {                  
                
                let newCard = new CreditCard({
                    userEmail: data.emailAddress
                });
                newCard.save()
                .then(() => {
                    console.log(chalk.magenta(`CREDIT CARD ADDED:`),chalk.green(` New Credit Card was added in database!`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                })
                .catch((err) => {
                    console.log(chalk.magenta(`New Credit Card:`),chalk.red(` ERROR ${err}`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                    res.json({message:`ERROR: ${err} !`}); 
                })

                // Send an Email confirmation
                const send = require('gmail-send')(
                {
                    user: process.env.MAIL_FROM,
                    pass: process.env.MAIL_PASSWORD,
                    to:   data.emailAddress,
                    subject: `HappyBidding - Sign Up Confirmation`,
                    text:    `Hello ${data.emailAddress}\nThis is a friendly confirmation that you have successfully signed up!\n\nRegards from HappyBidding Team!`
                });
        
                send()
                .then(()=>
                {
                    console.log(chalk.magenta(`Email Confirmation:`),chalk.green(`Email Sent to recovery!`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                })
                .catch((err)=>{
                    console.log(chalk.magenta(`Email Confirmation:`),chalk.red(` ERROR: ${err}`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                });
                // -------------

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
    .catch((e) =>
    {
        console.log(chalk.magenta(`No Auctions Found:`),chalk.red(` ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        res.json({message:`ERROR: ${err} !`}); 
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
            console.log(chalk.magenta(`Auction:`),chalk.red(` ALREADY ADDED!`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            res.json({message:`AUCTION ALREADY ADDED `});
        }
    })
    .catch(err=>{
        console.log(chalk.magenta(`Auction Not Found:`),chalk.red(` ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        res.json({message:`ERROR: ${err} !`});    
    });
}

const getSpecificUserWithDetails = (req, res) => {
    User.findOne({emailAddress: req.query.emailAddress})
    .then(user => {
        if(user.currentSessionKey != req.query.sessionId){
            console.log(chalk.magenta(`Session Key:`),chalk.red(` INVALID`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
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
            .catch(err=>{
                console.log(chalk.magenta(`Credit Card Not Found:`),chalk.red(` ERROR ${err}`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                res.json({message:`ERROR: ${err} !`});    
            });
        }
    })    
    .catch(err=>{
        console.log(chalk.magenta(`User Not Found:`),chalk.red(` ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        res.json({message:`ERROR: ${err} !`});    
    });
}


const addCreditCard = (data, res) => {
    let newCard = new CreditCard(data);
    newCard.save()
    .then(() => {
        console.log(chalk.magenta(`CREDIT CARD ADDED:`),chalk.green(` New Credit Card was added in database!`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        res.json({message:`USER UPDATED SUCCESSFULLY !`})
    })
    .catch((err) => {
        console.log(chalk.magenta(`New Credit Card:`),chalk.red(` ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        res.json({message:`ERROR: ${err} !`}); 
    })
}


const updateUser = (req, res) => {
    console.log(req.body)
    User.findById(req.body.id)
    .then((user)=>
    {
        user.address.streetName = req.body.streetName
        user.address.streetNumber = req.body.streetNumber
        user.address.city = req.body.city
        user.address.postalCode = req.body.postalCode
        user.address.country = req.body.country
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName

        if(req.body.password != user.password)
        {
            console.log("NOT EQUAL PASSWORDS!!!")
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password, salt);
    
            user.password = hash
        }

        if(user.emailAddress != req.body.emailAddress)
        {
            User.findOne({emailAddress: req.body.emailAddress}) // CHECK IN DATABASE IF AN EMAIL ALREADY EXISTS
            .then(userForEmail=>
            {
                if(userForEmail == null) // if email does not exists, then go check if username exists
                {
                    user.emailAddress = req.body.emailAddress
                }

            })
            .catch((err) => {
                console.log(chalk.magenta(`User Update:`),chalk.red(` ERROR ${err}`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                //res.json({message:`ERROR: ${err} !`}); 
            });
        }

        user.save()
        .then(() => {
            console.log(chalk.magenta(`User Updated:`),chalk.green(` User was updated in database!`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            res.json({message:`USER UPDATED SUCCESSFULLY !`})
        })
        .catch((err) => {
            console.log(chalk.magenta(`User Update:`),chalk.red(` ERROR ${err}`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            res.json({message:`ERROR: ${err} !`}); 
        });
        

    })
}


//Get user auctions
const getUserAuctions = (req, res) => {
    User.findOne({emailAddress: req.query.emailAddress})
    .then(user => {
        if(user.currentSessionKey != req.query.sessionId){
            console.log(chalk.magenta(`Session Key:`),chalk.red(` INVALID`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            res.json({message: "Your session key is invalid"});
        }
        else{
                res.json({
                    user: user
                })
            }
    })    
    .catch(err=>{
        console.log(chalk.magenta(`User Not Found:`),chalk.red(` ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        res.json({message:`ERROR: ${err} !`});    
    });
}

//PUT auction to users auctions list
const auctionAddToUSerList = (req, res) => {
    //console.log(req.query.id, req.query.emailAddress)
   Auction.findOne({_id: req.query.id})
   .then( auction => {
       User.findOne({emailAddress: req.query.emailAddress})
       .then(user => 
        {
           let hasUser = false
           let hasAuction = false

           //add data from user to auction object 
           for(let i = 0; i < auction.userList.length && !hasUser; i++)
           {
                if(auction.userList[i].emailAddress == user.emailAddress){
                    hasUser = true
                }
           }

           for(let i = 0; i < user.manageAuction.length && !hasAuction; i++)
           {
                if(user.manageAuction[i].auctionId == auction._id){
                    hasAuction = true
                }
           }

           if(!hasUser)
           {
               auction.userList.push({
                  userName: user.userName, 
                  emailAddress: user.emailAddress
               })
               user.save()
                .then(()=> {
                    console.log(chalk.magenta(`Auction Details Updated:`),chalk.green(` Auction was updated in database!`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                })
                .catch(err=>{
                    console.log(chalk.magenta(`Auction Not Saved:`),chalk.red(` ERROR ${err}`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                    res.json({message:`ERROR: ${err} !`}); 
                });
            }
            else {
                console.log(chalk.magenta(`Auction Not Updated:`),chalk.red(` AUCTION ALREADY EXISTS IN THE USER LIST !`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            }

        
           if(!hasAuction)
           {
                //add data from auction to user object 
                user.manageAuction.push({
                    auctionId: auction._id,
                    auctionName: auction.title,
                    productName: auction.product.name,
                    auctionStatus: auction.status
                })

                auction.save()
                .then(()=> {
                    console.log(chalk.magenta(`User Updated:`),chalk.green(` User was updated in database!`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                   })
                   .catch(err=>{
                    console.log(chalk.magenta(`User Not Saved:`),chalk.red(` ERROR ${err}`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                    res.json({message:`ERROR: ${err} !`});    
                    });
            }
            else {
                    console.log(chalk.magenta(`User Not Updated:`),chalk.red(` USER ALREADY EXISTS IN THE AUCTION !`));
                    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            }

           res.json({auction: auction, user: user})
       })
       .catch(err=>console.log(`ERROR: Could not find user: ${err}`));
   })
   .catch(err=>console.log(`ERROR: Could not find auction: ${err}`));
}

// POST Recover account req.params
const accountRecover = (req,res) =>{
    console.log(req.params.email)
    User.findOne({emailAddress: req.params.email})
    .then((user)=>{

        let new_password = crypto.randomBytes(8).toString('hex');

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(new_password, salt);
        user.password = hash

        user.save()
        .then(()=>
        {
            console.log(chalk.magenta(`Password Change:`),chalk.green(`Password changed and persisted to database!`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));

            const send = require('gmail-send')(
            {
                user: process.env.MAIL_FROM,
                pass: process.env.MAIL_PASSWORD,
                to:   req.params.email,
                subject: `HappyBidding - Password Change`,
                text:    `Hello ${user.firstName} ${user.lastName}\nHere is your new password: ${new_password}\nPlease, login with it and change it in your profile overview page!\n\nRegards from HappyBidding Team!`
            });
    
            send()
            .then(()=>
            {
                console.log(chalk.magenta(`Email Confirmation:`),chalk.green(`Email Sent to recovery!`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            })
            .catch((err)=>{
                console.log(chalk.magenta(`Email Confirmation:`),chalk.red(` ERROR: ${err}`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            });

            // DO RES.JSON ------------------------------------------

        })
        .catch((err)=>{
            console.log(chalk.magenta(`Password Change:`),chalk.red(` ERROR: ${err}`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        });

    })
    .catch(()=>{
        res.json({message:"ERROR: USER NOT FOUND"})
        console.log(chalk.magenta(`User Not Found:`),chalk.red(` USER DOES NOT EXISTS IN THE DATABASE !`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    })
}

const reportProblem=(data, auctionId,res)=>
{   
    Auction.findOne({_id: auctionId})
   .then( auction => {
        if(auction != null)
        {
            auction.problemList.push({
                userFirstName: data.userInfo.firstName,
                userLastName: data.userInfo.lastName,
                userEmailAddress: data.userInfo.emailAddress,
                problemDescription: data.problemDescription,
                reportDate: Date()
            })
            
            auction.save()
        }
   })
   .then(()=>
   {
       console.log(chalk.magenta(`Problem Report Confirmation:`),chalk.green(`Problem Reported SUCCESSFULLY`));
       console.log(chalk.blue(`------------------------------------------------------------------------------------`));
   })
}


const replyProblem=(data, auctionId,res)=>
{ 
    Auction.findOne({_id: auctionId})
   .then( auction => {
        if(auction != null)
        {
            const send = require('gmail-send')(
            {
                user: process.env.MAIL_FROM,
                pass: process.env.MAIL_PASSWORD,
                to:   data.userEmailAddress,
                subject: `Reply Regarding Auction ${data.auctionTitle}`,
                text:    
                `You Sent The Following:
                \n${data.problemDescription}
                \n---------------\n
                \nOur Team Response:
                \n${data.replyDescription}
                \n\n-------------------------------
                \nRegards from HappyBidding Team!`
            });

            send()
            .then(()=>
            {
                console.log(chalk.magenta(`Reply Confirmation:`),chalk.green(`The Problem was Replied SUCCESSFULLY`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            })
            .catch((err)=>{
                console.log(chalk.magenta(`Reply ERROR:`),chalk.red(` ${err}`));
                console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            });

            // Remove the desired element from the array
            auction.problemList.splice(auction.problemList.findIndex(problem => problem._id == data.problemId), 1)
            auction.save()
        }
   })
}

const deleteAuction=(auctionId,res)=>
{
    // find the auction to read all users and remove the
    // auction from their registered auction's list
    Auction.findOne({_id: auctionId}) 
    .then((auction)=>
    {
        // check if the auction has any user registered to it
        if(auction.userList.length > 0) 
        {
            // access each user email addres to fetch the information for each user
            auction.userList.map((userInList)=>
            {
                // fetch each user's information in database 
                User.findOne({emailAddress: userInList.emailAddress})
                .then((user)=>
                {
                    // Remove the auction that will be deleted
                    // from the users manage auction list
                    user.manageAuction.splice(user.manageAuction.findIndex(auction => auction.auctionId == auctionId), 1)
                    user.save()
                })
            })
        }
    })

    // DRemove auction from Database
    Auction.deleteOne({_id: auctionId})
    .then(()=>
    {
        console.log(chalk.magenta(`Deletion Confirmation:`),chalk.green(`The Auction was Deleted SUCCESSFULLY`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    })
    .catch((err)=>{
        console.log(chalk.magenta(`Deletion ERROR:`),chalk.red(` ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    });
    
}

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
    auctionAddToUSerList : auctionAddToUSerList,
    accountRecover: accountRecover,
    reportProblem: reportProblem,
    replyProblem: replyProblem,
    deleteAuction: deleteAuction
}