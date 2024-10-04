const express = require('express');
const connectDB = require('./db.js'); 
const path = require('path');
const signup = require('./routes/sign-up');//For signup page
const log_in = require('./routes/login.js');
const dashboard = require('./routes/dashboard-routes.js')
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { Cookie } = require('express-session');
const calendar = require('./routes/calendar.js');
const sus = require('./routes/sign-up-success.js');
const notification = require('./routes/notification.js');

connectDB();
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// First route the sign up page
const signup_path = path.join(__dirname,'views','sign-up.html');
const public_path = path.join(__dirname,'public');
const webpack_path = path.join(__dirname,'dist');

app.use(express.static(public_path));
app.use(express.static(webpack_path)); //For my webpack files

// Creating a session for my user
app.use(session({
    secret: process.env. xSESSION_SECRET || 'sup33448!', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        // mongoUrl: 'mongodb+srv://excellentayomide:excell@pomo.4swla.mongodb.net/Pomo?retryWrites=true&w=majority&ssl=true',
        mongoUrl: 'mongodb://localhost:27017/Task_Manager',
        collectionName: 'sessions'
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 3} // 3 hours
}));


app.get('/',(req,res) => {
    res.sendFile(signup_path);
});

// For sign up page
app.use('/', signup);

app.get('/sign-up',(req,res) => {
    const signup_page = path.join(__dirname,'views','sign-up.html');
    res.sendFile(signup_page);
});

// sign up success
app.get('/sign-up-success',(req,res) => {
    const success_page = path.join(__dirname,'views','sign-up-success.html');
    res.sendFile(success_page);
});0


// Handling my dashboard routes
app.use('/',dashboard);

app.get('/dashboard',(req,res) => {
    const dashboard_path = path.join(__dirname, 'views', 'index.html');
    res.sendFile(dashboard_path);
});

// For sign up success page
app.use('/',sus);

// For login page
app.get('/login',(req,res) => {
    const pathway = path.join(__dirname,'views','login.html');
    res.sendFile(pathway);
});
app.use('/',log_in);

// for my calendar routing
app.use('/',calendar);
app.get('/calendar',(req,res) => {
    const calendar_path = path.join(__dirname,'views','calendar.html');

    res.sendFile(calendar_path);
});

// For my settings routing

app.get('/settings',(req,res) => {
    const settings_path = path.join(__dirname,'views','settings.html');
    res.sendFile(settings_path);
});

// For my notifications
app.use('/',notification);
app.get('/notification',(req,res) => {
    const notification_path = path.join(__dirname,'views','notification.html');
    res.sendFile(notification_path);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});