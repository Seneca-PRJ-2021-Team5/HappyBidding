const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({ 
    address: {
        streetName: String,
        streetNumber: Number,
        city: String,
        postalCode: String,
        country: String
    }, 
    userType: String, 
    userName: String, 
    phoneNumber: String, 
    emailAddress: String,
    password: String
}) 

const userMODEL = mongoose.model('users', userSchema);

module.exports = userMODEL;