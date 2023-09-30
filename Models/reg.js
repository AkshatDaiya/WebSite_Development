const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:String,
    pass:String
})


module.exports=mongoose.model('reg',adminSchema)