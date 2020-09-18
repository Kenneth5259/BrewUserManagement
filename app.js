// node_module imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');

// user model
const User = require('./models/user');

// user modules import
const userRouter = require('./routes/user-routes');

//env config
dotenv.config();

// app intiialization
const app = express();

// database connection
mongoose.connect(`mongodb://${process.env.DB_ADDR}:${process.env.DB_PORT}/brew`)
    .then(() => {
        
        // handle successful connection
        console.log("Connection Successful");
    })
    .catch((err) => {

        // catch unsuccessful connection
        console.log(err);
    })

// Handle HTML URL encoding
app.use(express.urlencoded({useNewUrlParser: true}));

// Handle json from API
app.use(express.json());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(User.createStrategy());

// add router middleware
app.use('/', userRouter);

// app execution
app.listen(process.env.PORT);
