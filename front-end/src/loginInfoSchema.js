const mongoose = require("mongoose");
let Schema = mongoose.Schema;
    
let  loginInfoSchema = new Schema({​​​​​​​​

LoginId :{​​​​​​​​ type: Number, unique: true, required: true}​​​​​​​​,

UserUniqueId:  {​​​​​​​​
        type: String,
        required: true
    }​​​​​​​​,//FK – User (need to be modified)
UserName: {​​​​​​​
        type: String,
        required: true
    }​​​​​​​​,
Password: {​​​​​​​​
        type: String,
        required: true
    }​​​​​​​​,
RecoveryId: {​​​​​​​​
        type: String,
        required: true
    }​​​​​​​​,
}​​​​​​​​);

module.exports = loginInfoSchema;