const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    add:String,
    mobile:Number,
    email:String,
    insta:String,
    facebook:String
})

module.exports = mongoose.model('address', addressSchema)