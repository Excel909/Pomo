const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const app = express();

app.use(express.json());

const authorizer = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send('You need to login first');
    }
    next();
};

router.get('/due-tasks', authorizer, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const currentDate = new Date();

        const dueTasks = await Task.find({ user: userId, duedate: { $lte: currentDate } });

        // console.log(dueTasks);
        res.json(dueTasks);
        // console.log(dueTasks.length);
    } catch (err) {
        res.status(500).send('Server side error');
        console.log(err.message);
    }
});

router.delete('/delete-task/:notId', authorizer, async (req, res) => {
    try {
        const { notId } = req.params;

        const deletion = await Task.findByIdAndDelete(notId); 
        if (deletion) {
            res.json({ msg: 'Task has been deleted' });
        } else {
            res.status(404).json({ msg: 'Task not found' });
        }
    } catch (err) {
        res.status(500).send('Server side error');
        console.log(err.message);
    }
});

module.exports = router;
