const express = require("express");
const router = express.Router();
const Cake = require('../models/cake')


router.post('', (req, res, next) => {
    const title = req.body.title;
    const comment = req.body.comment;
    const imagePath = req.body.imagePath;
    const stars = req.body.stars;

    const newCake = new Cake({
        title: title,
        comment: comment,
        imagePath: imagePath,
        stars: stars
    });

    newCake.save()
        .then(cake=>{
            res.status(200).json({
                message: "SUCCESS: CAKE CREATED!",
                cake: {...cake, id:cake._id}
            })
        })
        .catch(err=>{
            res.status(500);
            next(err);
        })
});

module.exports = router;