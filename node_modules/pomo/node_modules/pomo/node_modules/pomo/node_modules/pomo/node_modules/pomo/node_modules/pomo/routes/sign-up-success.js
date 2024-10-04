const express = require('express');
const router = express.Router();
const User = require('../models/user');

const authorizer = (req,res,next) => {
    if(!req.session.user){
        return res.status(401).send('You need to login first');
    };
    next();
};

router.get('/user',authorizer,async(req,res) => {
    const userId = req.session.user.id;

    try{
        const user = await User.findById(userId);

        if(user){
            res.json({
                user: user.username,
                profile:user.profilepic,
                ptype: user.profilepicType
            });
        }
    } catch(err){
        console.log(err.message);
        res.status(500).send('User not found');
    }
});



module.exports = router;