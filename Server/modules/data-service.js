// const mongoose = require("mongoose");
const express = require("express");
const app = express();

const {MongoClient} = require('mongodb');
const chalk = require('chalk'); // to style console.log texts
const keys = require("./keys.js");

const userSchema = require("./userSchema.js");

const HTTP_PORT = process.env.PORT || 8080;

module.exports = function(connectionString)
{
    let User;

    return {
        addNewUser: function(data){
            return new Promise((resolve,reject)=>{

                let newUser = new User(data);

                newUser.save((err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(`New User SUCCESSFULLY ADDED !`);
                    }
                });
            });
        }

    }
}

const initialize = ()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        console.log(chalk.yellow(`WEB SERVER:`), chalk.green(` STARTED AT PORT ${HTTP_PORT}`));
    })

    async function main() 
    {
        const client = new MongoClient(keys.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            console.log(chalk.yellow(`Happy Bidding database: `) + chalk.green(`SCCESSFULLY connected to the database !`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));

        } catch (e) {
            console.log(chalk.yellow(`Happy Bidding database:`) + chalk.red(`ERROR ${err}`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            console.error(e);

        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

}

module.exports = {
    initialize: initialize
}