const express = require('express');
const router = express.Router();
const User = require('../models/user');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


router.post('/settings/account', async (req, res) => {
    const { username, email } = req.body;
    const userId = req.session.user.id;  

    try {
        await User.findByIdAndUpdate(userId, { username, email });
        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false });   
    }
});

module.exports = router;