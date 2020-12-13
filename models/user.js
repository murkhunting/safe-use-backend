const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String},
  password: { type: String, minlength: 2, required: true }, //change to 6 at the end
  email: { type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, required: true, unique: true },
  phoneNumber: {type:Number},
  weight: { type: String},
  age: { type: Number, min: 18 }, 
  profilepic: { type: String, default: '/icons/default.png' },
  pathologies: [{type: String}],
  experiences:[{type:Schema.Types.ObjectId, ref: "Experince"}],
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

