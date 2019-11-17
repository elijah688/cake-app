const express = require("express");
const router = express.Router();
const Cake = require('../models/cake')
const extractFile = require('../middleware/file');

router.post('', extractFile, (req, res, next) => {
    const title = req.body.title;
    const comment = req.body.comment;
    const stars = JSON.parse(req.body.stars);

    const protocol = req.protocol;
    const host = req.get('host');
    const filename = req.file.filename;
    const imagePath = `${protocol}://${host}/images/${filename}`;
    console.log(imagePath);


    const newCake = new Cake({
        title: title,
        comment: comment,
        imagePath: imagePath,
        stars: stars
    });

    newCake.save()
        .then(cake=>{
            const resCake = {
                id:cake._id, 
                title: cake.title, 
                imagePath: cake.imagePath, 
                stars: cake.stars
            }
            res.status(200).json({
                message: "SUCCESS: CAKE CREATED!",
                cake: resCake
            })
        })
        .catch(err=>{
            res.status(500);
            next(err);
        })
});




router.get('', (req, res,next) => {
    Cake.find({})
        .then(cakes=>{

            const resCakes = cakes.map(x=>{
                return {
                    id:x._id,
                    title: x.title,
                    comment:x.comment, 
                    imagePath: x.imagePath, 
                    stars:x.stars
                }
            });

            res.status(200).json({
                message: "CAKES RETRIEVED",
                cakes:resCakes
            })
        })
        .catch(err=>{
            res.status(500);
            next(err);
        });
})




module.exports = router;