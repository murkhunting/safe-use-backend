const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// const parser = require("../config/cloudinary");
const mongoose = require("mongoose");

const User = require("../models/user");
const Experience = require("../models/experience");
const Substance = require("../models/substance");
const { isLoggedIn } = require("../helpers/middlewares");


//EXPERIENCE

router.post("/", isLoggedIn, (req, res, next) => {
    const { substance, emotionStatus, moodStatus, eatStatus, intention, userexperience } = req.body;
    console.log('req.body', req.body)
    const user = req.session.currentUser._id;
    // const addedSubstances = [];
    // const duration = ""
    // const notes = [];

  Experience.create({ user, substance, emotionStatus, moodStatus, eatStatus, intention, userexperience })
    .then((createdExperience) => {
      res.status(201).json(createdExperience);
    })
    .catch((err) => {
      res
        .status(500) // Internal Server Error
        .json(err);
    });
});

router.get("/", (req, res, next) => {
    
  Substance.find()
  .then((allSubstances) => {
    res.status(200).json(allSubstances);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
  //como hacer un desplegable con todas las substancias y que al elegirla se meta la info en la array de substancias del model experiencias
  //como hacer que si escojo una substáncia me saque la cantidad de dosis
});



//EXPERIENCE/START

router.get("/start/:id", (req, res, next) => {
  const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res
        .status(400) //  Bad Request
        .json({ message: "Specified id is not valid" });
      return;
    }

  Experience.findById(id)
    .populate("substance")
    .then((experience) => {
      
      res.status(200).json(experience);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

//EXPERIENCE/TRACK
router.get("/track/:id", (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res
        .status(400) //  Bad Request
        .json({ message: "Specified id is not valid" });
      return;
    }
  
    Experience.findById(id)
      .populate("user")
      .populate("substance")
      .then((foundExperience) => {
        res.status(200).json(foundExperience); // OK
      })
      .catch((err) => {
        res.status(500).json(err); // Internal Server Error
    });
});


router.put("/track/:id", (req, res, next) => {
    const { id } = req.params;
    const { addedSubstances, duration, notes, voicenotes } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Experience.findByIdAndUpdate(id, { addedSubstances, duration, notes, voicenotes })
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        res.status(500).json(err);
      });

})


//EXPERIENCE/HISTORY
router.get("/history", (req, res, next) => {
    Experience.find()
      .populate("user")
      .populate("substance")
      .then((allExperiences) => {
        res.status(200).json(allExperiences);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

//EXPERIENCE/:ID
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res
        .status(400) //  Bad Request
        .json({ message: "Specified id is not valid" });
      return;
    }
  
    Experience.findById(id)
      .populate("user")
      .populate("substance")
      .then((foundExperience) => {
        res.status(200).json(foundExperience); // OK
      })
      .catch((err) => {
        res.status(500).json(err); // Internal Server Error
      });
  });

router.delete("/:id", (req, res, next)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Experience.findByIdAndRemove(id)
      .then(() => {
        res
          .status(202) //  Accepted
          .send(`Document ${id} was removed successfully.`);
      })
      .catch((err) => {
        res.status(500).json(err);
    });
});


module.exports = router;
