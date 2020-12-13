const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const substanceSchema = new Schema({
  name: {type: String},
  type: {type: String},
  description: {type: String},
  information: {type:String},
  dose1: {type: String},
  dose2: {type: String},
  dose3: {type: String},
  maxdose: {type: String},
  nonMixWith: [{type: String}],
});

const Substance = mongoose.model('Substance', substanceSchema);

module.exports = Substance;