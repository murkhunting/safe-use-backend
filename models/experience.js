const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' , default: null},
  substance:{type: Schema.Types.ObjectId, ref:'Substance'},
  addedSubstances:[{type: String}],
  duration: {type: String},
  emotionStatus:{type:String, enum: ["Much Better", "Better", "Same", "Worse", "Much worse"]},
  moodStatus: {type: String, enum: ["Calm", "Energized", "Fearful", "Confident", "Tense", "Happy", "Sad", "Depressed"]},
  eatStatus: {type: String, enum: ["Empty", "Normal", "Full"]},
  intention: {type: String, enum: ["Discover", "Grow", "Fun", "Transform", "Heal", "Concentration", "Relax"]},
  userexperience: {type: String, enum: ["First Time", "Occasionally", "Often", "Habitually"]},
  notes: [{type: String}],
  voiceNotes: []
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
