// import express
const express = require('express');

// imoport user controller
const userController = require('../controllers/user-controller');

// define a router
const router = express.Router();

// router get methods
router.get('/register', (req, res, next) => {
    const path = require('path');
    
    res.sendFile(path.resolve('test_forms/register.html'),);
});

router.get('/signin', (req, res, next) => {
    const path = require('path');

    res.sendFile(path.resolve('test_forms/signin.html'));
})

// router post methods
router.post('/register', userController.registerNewUser);
router.post('/signin/local', userController.loginExistingUser);

// export the router
module.exports = router;