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

router.put("/edit", (req, res, next) => {
    let { email, username, imageUrl, user } = req.body;
  
    /* User.findById(req.params.userId)
      .then((user) => { */
        console.log("la imagen que subo", imageUrl);
        console.log("la imagen actual:", user.imageUrl);
        let defaultPic = imageUrl ? imageUrl : user.imageUrl;
          console.log(req.body, "req.body", req.params);
        //const updatedUser = { email, username, imageUrl: defaultPic };
  
        User.findByIdAndUpdate(req.params.userId, { email: email, username: username, imageUrl: defaultPic }, {
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
