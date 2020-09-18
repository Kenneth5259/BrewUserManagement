// import the user model
const User = require('../models/user.js');
const dotenv = require('dotenv');
dotenv.config();
const secretKey= process.env.SECRET;

// import passport and strategies
const passport = require('passport');
const jwt = require('jsonwebtoken');


//register new user with the local strategy

const registerNewUser = (req, res, next) => {

    // password handles separately
    const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    // Register method created using passport-local-mongoose
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            res.json({
                error: err,
                message: "User Not Registered"
            })
        } else {
            res.json({
                user: user,
                message: "Register Successful"
            })
        }
    })
    
}


// login an existing user and return a jwt
const loginExistingUser = (req, res, next) => {

    // ensures that an email is provided
    if(!req.body.email){ 
        res.json({
            success: false, 
            message: "Username was not given"
        }); 
    } else {

        // ensures that a password is provided
        if(!req.body.password){ 
            res.json({
                success: false, 
                message: "Password was not given"
            }); 
        } else { 

            // passport authenticates using local strategy
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    console.error(err);
                    res.json({
                        error: err,
                        message: "There's been an error at authenticate",
                        success: false
                    })
                } else {

                    // no authenticate error, but no found user either
                    if(!user) {
                        res.json({
                            success: false,
                            message: "email or password incorrect"
                        });
                    } else {

                        // user is found, req.login is a passport injected method
                        req.login(user, (err) => {
                            if(err) {
                                res.json({
                                    success: false,
                                    error: err,
                                    message: "There's been an error at req.login",
                                });
                            } else {
                                const token = jwt.sign(
                                    {
                                        userId: user._id,
                                        email: user.email
                                    }, 
                                    secretKey, 
                                    {
                                        expiresIn: '24h'
                                    });
                                res.json({
                                    success: true,
                                    message: "Authentication Successful",
                                    token: token
                                })
                            }
                        })
                    }
                }
            })(req, res, next);
        }
        
    }
}
// export all controller actions
module.exports = {
    registerNewUser,
    loginExistingUser
};