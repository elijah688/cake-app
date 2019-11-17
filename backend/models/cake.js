const mongoose = require('mongoose');


var CakeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comment: { type: String, required: true },
    imagePath: { type: String, required: true },
    stars: { type: [Boolean], required: true },
});


module.exports = mongoose.model('Cake', CakeSchema );
