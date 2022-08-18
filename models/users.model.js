const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true,
  },
  address: {
    street: {
      type: String
    },
    suite: {
      type: String
    },
    city: {
      type: String
    },
    zipcode: {
      type: String
    },
    geo: {
      lat: String,
      lng: String
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  company: {
    name: {
      type: String
    },
    catchPhrase: {
      type: String
    },
    bs: {
      type: String
    }
  }
});


var User = mongoose.model('User', userSchema, 'users');

module.exports = User;
