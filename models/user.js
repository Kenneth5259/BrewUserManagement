// import mongoose
const mongoose = require('mongoose');


// define the user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

// export model using defined schema
module.exports = mongoose.model('User', userSchema);