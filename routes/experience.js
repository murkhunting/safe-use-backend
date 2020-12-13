const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// const parser = require("../config/cloudinary");
const mongoose = require("mongoose");

const User = require("../models/user");
const Experience = require("../models/experience");
const Substance = require("../models/substance");


//EXPERIENCE
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

router.get("/", (req, res, next) => {
    
  Substance.find 
  .then((allSubstances) => {
    res.status(200).json(allSubstances);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
  //como hacer un desplegable con todas las substancias y que al elegirla se meta la info en la array de substancias del model experiencias
  //como hacer que si escojo una substáncia me saque la cantidad de dosis
});

router.post("/", (req, res, next) => {
    const { substance, emotionStatus, moodStatus, eatStatus, intention } = req.body;
    const user = req.session.currentUser;

  Experience.create({ user, substance, emotionStatus, moodStatus, eatStatus, intention, date, duration, })
    .then((createdExperience) => {
      res.status(201).json(createdExperience);
    })
    .catch((err) => {
      res
        .status(500) // Internal Server Error
        .json(err);
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
      .populate("substances")
      .then((foundExperience) => {
        res.status(200).json(foundExperience); // OK
      })
      .catch((err) => {
        res.status(500).json(err); // Internal Server Error
    });
});

router.get("/track/:id", (req, res, next) => {
    
  Substance.find 
  .then((allSubstances) => {
    res.status(200).json(allSubstances);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
  //como hacer un desplegable con todas las substancias y que al elegirla se meta la info en la array de substancias del model experiencias
});

router.put("/track/:id", (req, res, next) => {
    const { id } = req.params;
    const { substance, duration, notes, voicenotes } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  //como añadir una substancia más ya que es una array? pero significa añadir un objeto más 
  //como añadir una nota y que se publique directamente
    Experience.findByIdAndUpdate(id, { substance, duration, notes, voicenotes })
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
  
    Project.findByIdAndRemove(id)
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
