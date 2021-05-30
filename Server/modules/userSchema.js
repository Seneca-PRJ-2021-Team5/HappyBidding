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
    emailAddress: String 
}) 

module.exports = userSchema;