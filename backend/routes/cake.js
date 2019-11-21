const express = require("express");
const router = express.Router();
const Cake = require('../models/cake')
const extractFile = require('../middleware/file');
const guard = require("../middleware/guard");
const io = require('../socket');

router.post('', guard, extractFile, (req, res, next) => {
    if(req.multerError!==undefined){
        res.status(422);
        next(req.multerError);
    }
    const title = req.body.title;
    const comment = req.body.comment;
    const stars = JSON.parse(req.body.stars);
    const creator = res.userData.id;

    const protocol = req.protocol;
    const host = req.get('host');
    const filename = req.file.filename;
<<<<<<< HEAD
    const image = `${protocol}://${host}/images/${filename}`;
=======
    const imagePath = `${protocol}://${host}/images/${filename}`;
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c


    const newCake = new Cake({
        title: title,
        comment: comment,
<<<<<<< HEAD
        image: image,
=======
        imagePath: imagePath,
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
        stars: stars,
        creator: creator
    });

    newCake.save()
        .then(cake=>{
            const resCake = {
<<<<<<< HEAD
                id: cake._id, 
                title: cake.title, 
                image: cake.image, 
                stars: cake.stars,
                creator: cake.creator
            }
            
=======
                id:cake._id, 
                title: cake.title, 
                imagePath: cake.imagePath, 
                stars: cake.stars
            }
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c

            io.getIO().emit('cake');
            
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




<<<<<<< HEAD
router.get('', async (req, res,next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;
    try {
        const cakes = await Cake.find({})
        .skip((pageSize * currentPage) - pageSize)
        .limit(pageSize);
        const resCakes = [...cakes].map(x=>{ 
            return {id:x._id, title:x.title, comment:x.comment,image:x.image, stars:x.stars, creator:x.creator}
        });
        const count = await Cake.countDocuments();
        res.status(200).json({
            message: "CAKES RETRIEVED",
            cakes:resCakes,
            count: count
        })
    } catch (error) {
        res.status(500);
        next(error);
    }
=======
router.get('', (req, res,next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;

    Cake.find({})
        .skip((pageSize * currentPage) - pageSize)
        .limit(pageSize)
        .then(cakes=>{
            Cake.countDocuments()
                .then(count=>{
                    const resCakes = cakes.map(x=>{
                        return {
                            id:x._id,
                            title: x.title,
                            comment:x.comment, 
                            imagePath: x.imagePath, 
                            stars:x.stars,
                            creator:x.creator
                        }
                    });
                    res.status(200).json({
                        message: "CAKES RETRIEVED",
                        cakes:resCakes,
                        count: count
                    })
                })
                .catch(err=>{
                    res.status(500);
                    next(err);
                })
            
        })
        .catch(err=>{
            res.status(500);
            next(err);
        });
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
})

router.put('/:id', guard, extractFile,(req, res, next)=> {
    if(req.multerError!==undefined){
        res.status(422);
        next(req.multerError);
    }
    
    const id = req.params.id;
<<<<<<< HEAD
    console.log(id);
=======
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
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
    const userId = res.userData.id;
    const creator = req.body.creator;

    if(userId===creator){
<<<<<<< HEAD
        Cake.findByIdAndUpdate(id, {title:title, comment:comment, image:image, stars:stars})
=======
        Cake.findByIdAndUpdate(id, {title:title, comment:comment, imagePath:image, stars:stars})
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
        .then(cake=>{
            if(cake){
                io.getIO().emit('cake');
                res.status(202).json({
                    message:`CAKE WITH ${id} UPDATED!`
                });
            }
            else{
                res.status(404).json({
                    message: "NO SUCH CAKE!"
                })
            }
        })
        .catch(err=>{
            next(err);
        });
    }
    else{
<<<<<<< HEAD
        res.status(401).json(
=======
        res.status(403).json(
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
            {message:"YOU ARE UNAUTHORIZED!"
        });
    }
   
});

router.delete('/:id', guard, (req, res, next) => {
    const id = req.params.id;
    const userId = res.userData.id;

    Cake.findOne({_id : id})
        .then(cake=>{
            if(cake){
                if(cake.creator.toString()===userId){
                    Cake.findByIdAndDelete(id)
                        .then(cake=>{
                            io.getIO().emit('cake');
                            res.status(200).json({
                                message: `CAKE WITH ${id} SUCCESSFULLY DELETED`
                            })
                        })
                        .catch(err=>{
                            res.status(500)
                            next(err);
                        })
                }
                else{
                    res.status(403).json({
                        message:"YOU ARE UNAUTHORIZED!"
                    });
                }
            }
            else{
                res.status(404).json({
                    message: "NO SUCH CAKE!"
                })
            }
        })
        .catch(err=>{
            res.status(500);
            next(err);
        })
});


<<<<<<< HEAD
router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try{
        const cake = await Cake.findOne({_id:id});
        const resCake = [cake].map(x=>{return {id:x._id, title:x.title, comment:x.comment,image:x.image, stars:x.stars, creator:x.creator}})[0];
        if(cake){
            res.status(200).json({
                message: `CAKE WITH ${id} RETRIEVED SUCCESSFULLY`,
                cake: resCake
            })
        }
        else{
            res.status(404).json({
                message: "CAKE NOT FOUND"
            })
        }
    }
    catch(err){
        res.status(500);
        next(err);
    }

    
});

=======
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c

module.exports = router;