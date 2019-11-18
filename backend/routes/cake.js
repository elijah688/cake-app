const express = require("express");
const router = express.Router();
const Cake = require('../models/cake')
const extractFile = require('../middleware/file');

router.post('', extractFile, (req, res, next) => {
    if(req.multerError!==undefined){
        res.status(422);
        next(req.multerError);
    }
    const title = req.body.title;
    const comment = req.body.comment;
    const stars = JSON.parse(req.body.stars);

    const protocol = req.protocol;
    const host = req.get('host');
    const filename = req.file.filename;
    const imagePath = `${protocol}://${host}/images/${filename}`;

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

router.patch('/:id', extractFile,(req, res, next)=> {
    if(req.multerError!==undefined){
        res.status(422);
        next(req.multerError);
    }
    
    const id = req.params.id;
    const title = req.body.title;
    const comment = req.body.comment;
    const stars = JSON.parse(req.body.stars);
    let image;
        if(req.file!==undefined){
            const protocol = req.protocol;
            const host = req.get('host');
            const name = req.file.filename;
            image = `${protocol}://${host}/images/${name}`;
        }
        else{
            image = req.body.image;
        }

    Cake.findByIdAndUpdate(id, {title:title, comment:comment, imagePath:image, stars:stars})
        .then(cake=>{
            if(cake===undefined){
                res.status(404).json({
                    message: "NO SUCH CAKE!"
                })
            }
            else{
                res.status(202).json({
                    message:`CAKE WITH ${id} UPDATED!`
                });
            }
        })
        .catch(err=>{
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Cake.findByIdAndDelete(id)
        .then(cake=>{
            if(cake===undefined){
                res.status(404).json({
                    message: "NO SUCH CAKE!"
                })
            }
            else{
                res.status(200).json({
                    message: `CAKE WITH ${id} SUCCESSFULLY DELETED`
                })
            }
        })
        .catch(err=>{
            res.status(500)
            next(err);
        })
        
});



module.exports = router;