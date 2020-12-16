const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// const parser = require("../config/cloudinary");
const mongoose = require("mongoose");

const User = require("../models/user");
const Experience = require("../models/experience");
const Substance = require("../models/substance");


//PROFILE
router.get("/", (req, res, next) => {
  const {_id} = req.session.currentUser

  User.findById(_id)
    .then((user) => {
      
      res.status(200).json(user);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

//PROFILE/EDIT
router.get("/edit", (req,res,next) =>{
    
})

router.post("/edit", (req, res, next) => {
    let { username, email, phoneNumber, weight, age, pathologies } = req.body;
    const {_id} = req.session.currentUser

  
        User.findByIdAndUpdate(_id, { username, email, phoneNumber, weight, age, pathologies}, {
          new: true,
        })
        
     /*  }) */
      .then(() => {
        res.json({
          message: `User with ${req.params.userId} is updated successfully.`,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.delete("/edit", (req,res,next) => {
    const {_id} = req.session.currentUser

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }
    
    User.findByIdAndRemove(_id)
        .then(() => {
        res
          .status(202) //  Accepted
          .send(`Document ${id} was removed successfully.`);
      })
      .catch((err) => {
        res.status(500).json(err);
    });
})

module.exports = router;
