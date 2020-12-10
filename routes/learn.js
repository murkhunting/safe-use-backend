const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// const parser = require("../config/cloudinary");
const mongoose = require("mongoose");

const User = require("../models/user");
const Experience = require("../models/experience");
const Substance = require("../models/substance");


//LEARN     
router.get("/", (req, res, next) => {
    Substance.find()
      .then((allSubstances) => {
        res.status(200).json(allSubstances);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

//LEARN/SUBSTANCE
router.get("/:id", (req, res, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400) //  Bad Request
          .json({ message: "Specified id is not valid" });
        return;
      }

    Substance.findbyid(id)
      .then((foundSubstance) => {
        res.status(200).json(foundSubstance);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });


module.exports = router;