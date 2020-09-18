// import the user model
const User = require('../models/user.js');

// import bcrypt for hashing
const bcrypt = require('bcrypt');

// allows configuring SALT and other encryption settings via env
const dotenv = require('dotenv');
dotenv.config();

/**
 * 
 * Post New User method
 * Receiving Request from axios 
 * 
 * body contains user information on registration
 * 
 *      firstName
 *      lastName
 *      email
 *      password (to be hashed)
 * 
 */
const postNewUser = (req, res, next) => {

    // use count method to check if there is a matching email
    User.count({email: req.body.email}, (err, count) => {

        // handle any error
        if(err) {
            console.error(err);
        } else {

            // check the count, >0 denotes existing user
            if(count > 0) {

                // duplicate resource code and message
                res.status(409).json({
                    message: "Email Already Exists, Please Try Logging In!"
                });

            } else {
                
                // hash the password for SALT rounds
                bcrypt.hash(req.body.password, parseInt(process.env.SALT), (err, hash) => {

                    // handle the error
                    if(err) {
                        console.error(err);

                      // hash was successful
                    } else {

                        // store the hashed password
                        const hashedPass = hash;

                        // create a new user object
                        const newUser = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hashedPass
                        });

                        // save the new user
                        newUser.save()

                            // send response after save 
                            .then(() => {
                                
                                // creatioin success code and json message
                                res.status(201).json({
                                    message: "Registered Successfully!"
                                })
                            });
                    }
                })  
            }
        }
    });
}

/**
 * 
 * Validate Existing User method
 * 
 * body contains user information for signing
 * 
 *      email
 *      unhashed password
 */

const postVerifyUser = (req, res, next) => {
    // check if email exists
    User.findOne({email: req.body.email}, (err, user) => {

        // db error
        if(err) {
            console.error(err);
        } else {

            // check if the unhashed password and stored hash match
            bcrypt.compare(req.body.password, user.password, (err, result) => {

                // errpr handling
                if(err) {
                    console.error(err);
                   
                 // password match   
                } else if(result) {

                    // success code, user data and message sent
                    res.status(200).json({
                        user: user,
                        message: "login successful"
                    });
                
                    // forbidden code and message sent
                } else {
                    res.status(403).json({
                        message: "Incorrect Login information"
                    })
                }
            })
        }
    });
}

// export all controller actions
module.exports = {
    postNewUser,
    postVerifyUser
};