const mongoose = require('mongoose');
const Empschema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
         type: Number,
        required:true
    }
  })
  
  const empdata = mongoose.model('EMPDATA', Empschema);
  module.exports = empdata;