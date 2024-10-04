const express = require('express');
const path = require('path');
const router = express.Router();
const Task = require('../models/task');
// const bodyParser = require('body-parser');
const User = require('../models/user');

const app = express();

app.use(express.json());

const authorizer = (req,res,next) => {
    if(!req.session.user){
        return res.status(401).send('You need to login first');
    };
    next();
};

router.get('/tasks', authorizer, async (req, res) => {
    const { year, month } = req.query; 
    const userId = req.session.user.id;
    try {
        const tasks = await Task.find({
            user:userId,
            duedate: {
                $gte: new Date(year, month - 1, 1),
                $lt: new Date(year, month, 1)       
            }
        });
        res.json(tasks); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});


router.get('/user-details',authorizer,async(req,res) => {
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