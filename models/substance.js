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
  mixWith: [{type: String}],
  nonMixWith: [{type: String}],
  experience: {type: Schema.Types.ObjectId, ref: 'Experience'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Substance = mongoose.model('Substance', substanceSchema);

module.exports = Substance;