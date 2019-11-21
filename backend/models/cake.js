const mongoose = require('mongoose');


var CakeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comment: { type: String, required: true },
    image: { type: String, required: true },
    stars: { type: [Boolean], required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Cake', CakeSchema );