// import mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


// define the user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    reviews: [mongoose.Schema.Types.ObjectId],
    dob: Date
});

// see passport-local-mongoose docs for other optional fields in {}
userSchema.plugin(passportLocalMongoose, {
    selectFields: 'firstName, lastName, email',
    usernameField: 'email'
});
// export model using defined schema
module.exports = mongoose.model('User', userSchema);