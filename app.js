// module imports
const express = require('express');
const dotenv = require('dotenv');

//env config
dotenv.config();

// app intiialization
const app = express();

// app execution
app.listen(process.env.PORT);
