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
    userType: {
        type: String, 
        default: 'user'
    },
    userName: {
        type: String, 
        required: true
    }, 
    phoneNumber: String, 
    emailAddress: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
}) 

const userMODEL = mongoose.model('users', userSchema);

module.exports = userMODEL;