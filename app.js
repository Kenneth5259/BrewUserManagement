// node_module imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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

// add router middleware
app.use('/', userRouter);

// app execution
app.listen(process.env.PORT);
