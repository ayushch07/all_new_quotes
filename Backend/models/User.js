const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({//username apne aap jud jaata hai
    email:{
        type:String,
        trim:true,
        required:true
    }
})


userSchema.plugin(passportLocalMongoose);
let User = mongoose.model('User' , userSchema);
module.exports = User;