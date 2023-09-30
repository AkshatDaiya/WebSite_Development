const mongoose = require('mongoose');

const servicSchema = mongoose.Schema({
    title: String,
    details: String,
    img: String,
    postedDate:Date,
    status: { type: String, default: 'Unpublished' }
})


module.exports = mongoose.model('service', servicSchema)