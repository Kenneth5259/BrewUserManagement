// module imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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


// app execution
app.listen(process.env.PORT);
