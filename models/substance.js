const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const substanceSchema = new Schema({
  name: {type: String},
  type: {type: String},
  description: {type: String},
  information: {type:String},
  dose: {type: String},
  desiredefect:{type: String},
  badefect:{type: String},
  maxdose: {type: String},
  img:{type:String},
  nonMixWith: [{type: String}],
});

const Substance = mongoose.model('Substance', substanceSchema);

module.exports = Substance;