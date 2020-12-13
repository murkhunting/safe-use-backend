const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' , default: null},
  substances:[{type: Schema.Types.ObjectId, ref:'Substances'}],
  duration: {type: Date},
  date: {type: Date},
  emotionStatus:{type:String, enum: ["Much Better", "Better", "Same", "Worse", "Much worse"]},
  moodStatus: {type: String, enum: ["Calm", "Energized", "Fearful", "Tense", "Happy", "Sad"]},
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
