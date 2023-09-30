const mongoose = require('mongoose');

const testiSchema = mongoose.Schema({
    name: String,
    img: String,
    details: String,
    postedDate: Date,
    status: ({ type: String, default: 'Unpublished' })
})

module.exports = mongoose.model('testiModel', testiSchema)