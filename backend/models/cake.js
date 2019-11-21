const mongoose = require('mongoose');


var CakeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comment: { type: String, required: true },
<<<<<<< HEAD
    image: { type: String, required: true },
=======
    imagePath: { type: String, required: true },
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
    stars: { type: [Boolean], required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Cake', CakeSchema );
