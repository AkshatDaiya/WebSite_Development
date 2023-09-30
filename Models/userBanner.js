const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    title:String,
    datails:String,
    image:String
})


module.exports=mongoose.model('userBanner',bannerSchema)