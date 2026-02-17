const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  mobileNo: {
    type: String
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'Employee']
  },
  profileImage: {
    type: String
  },
  isDelete: {
    type: Boolean,
    default: false
  }
},
  {
    versionKey: false
  });

module.exports = mongoose.model('User', userSchema);