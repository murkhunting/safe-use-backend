const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");

const User = require("../models/user");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

// POST '/auth/signup'
router.post('/signup', isNotLoggedIn, validationLogin, async (req, res, next) => {
  const { username, password, email, phoneNumber, weight, age, pathologies } = req.body;
  console.log('req.body', req.body)

  try {																									 // projection
    const emailExists = await User.findOne({ username }, 'email');
    
    if (emailExists) {
    return next(createError(400)).json({ errorMessage: "Email already exists!" });
    }
    else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ username, password: hashPass, email, phoneNumber, weight, age, pathologies });

      newUser.password = "*";
      req.session.currentUser = newUser;
      res
        .status(201)  //  Created
        .json(newUser);
    }
  } 
  catch (error) {
    next(createError(error));
  }
},
);

// POST '/auth/login'
router.post('/login', isNotLoggedIn, validationLogin, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }) ;
    
    if (!user) {
      next(createError(404));
    } 
    else if (bcrypt.compareSync(password, user.password)) {
      
      user.password = '*';
      req.session.currentUser = user;
      res
        .status(200)
        .json(user);
    //return;	 			TODO - remove from the notes
    } 
    else {
      next(createError(401));	// Unauthorized
    }
  } 
  catch (error) {
    next(createError(error));
  }
},
);

// POST '/auth/logout'
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy();
  res
    .status(204)  //  No Content
    .send();
});

// GET '/auth/me'
router.get('/me', isLoggedIn, (req, res, next) => {
  const currentUserSessionData = req.session.currentUser;
  currentUserSessionData.password = '*';
  
  res.status(200).json(currentUserSessionData);
});

module.exports = router;
