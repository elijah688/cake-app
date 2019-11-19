const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email)
    console.log(password)

    bcrypt.hash(password, 12)
        .then(hash=>{
            const user = new User({
            email:email,
            password:hash
         }).save()
            .then(usr=>{
                res.status(200).json({
                    message: "USER CREATED SUCCESSFULLY!"
                 })
             })
            .catch(err=>{
                res.status(500)
                 next(err);
            })
        })
        .catch(err=>{
            res.status(500)
            next(err);
        });
});

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;


    User.findOne({email:email})
        .then(user=>{
            bcrypt.compare(password, user.password)
                .then(isAuth=>{
                    if(isAuth===true){
                        const id = user._id;
                        const email = user.email;
                        const token = jwt.sign({id: id, email: email}, process.env.JWT_KEY, { expiresIn: '1h' });
                        
                        res.status(200).json({
                            message: "USER LOGGED IN!",
                            token: token
                        })
                    }
                    else{
                        res.status(401).json({
                            message:"YOU ARE UNAUTHORIZED!"
                        })
                    }
                })
                .catch(err=>{
                    res.status(500);
                    next(err);
                })
        })
        .catch(err=>{
            res.status(500);
            next(err);
        })

});



module.exports = router;