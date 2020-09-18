const jwt = require("express-jwt");

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.SECRET;


const authenticateToken = (req, res, next) => {
    const authHeader = req.header["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null){
        res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err) {
            console.error(err);
            return es.sendStatus(403);
        } 
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;