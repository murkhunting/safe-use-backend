const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required: true},
  password: { type: String, minlength: 2, required: true }, //change to 6 at the end
  email: { type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, required: true, unique: true },
  phoneNumber: {type:Number, required: true},
  weight: { type: String, required: true},
  age: { type: Number, min: 18, required: true }, 
  profilepic: { type: String, default: '/icons/default.png' },
  pathologies: {type: String, enum: ["None"]},
  experiences:[{type:Schema.Types.ObjectId, ref: "Experince"}],//typo en Experience
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

