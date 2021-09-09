'use strict';

let express = require('express');
let app = express();
let PORT = process.env.PORT || 3012; //Make my port number configurable
let helperfunction = require('./greet_helper');
const flash = require('express-flash');
let session = require('express-session')
let exphbs  = require('express-handlebars');
let bodyParser = require('body-parser');

/*
let fullPage = {
    userData: {
        greeting: ''
    },
    counter: 0
}
*/
// DB Setup 
//Set up an configaration on were we want to connect the database
const {
    Pool
} = require('pg');

let ssl = false
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:12345@localhost:5432/greetings';

if(process.env.DATABASE_URL){
    ssl = { rejectUnauthorized: false }
}

const pool = new Pool({
    connectionString,
    ssl
});

/*
// Heroku pool
const pool = new Pool({
    user: 'tcjuiobxjjyuem',
    host: 'ec2-44-197-94-126.compute-1.amazonaws.com',
    database: 'd4t968b5v0lopc',
    password: '4453f68486dd6981ce17e604f18a4d0b7dfb16a410de1c7cf0d6e20a22a6d8d4',
    port: 5432,
});
/*
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'greetings',
    password: 'Tebogo13#',
    port: 5432,

});
*/
app.use(session({
    secret : "Error Message",
    
}));

let greetings = helperfunction(pool);

app.use(flash());

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Routes
app.get('/', async function (req, res) {
    res.render('index', {
        userData: {
            greeting: ''
        },
        counter: await greetings.getCounter()
    });
});

app.post('/greet', async function (req, res) {

    if (((req.body.userEnteredName === "" && req.body.radioLang !== undefined)) ||
    ((req.body.userEnteredName !== "" && req.body.radioLang === undefined)) ||
    ((req.body.userEnteredName === "" && req.body.radioLang === undefined)))
    {
        req.flash('info', 'Please enter a name and select a language!');
        res.redirect('/');

    } else {
        greetings.name(req.body.userEnteredName);
        greetings.language(req.body.radioLang);
        req.flash('info2', "Name succesfully greeted!");
        res.render('index', {
            userData: {
                greeting: await greetings.greet()
            },
            counter: await greetings.getCounter()
        });
    };

});


app.get('/greeted', async function (req, res) {
    let result = await greetings.greetedUsers('allUsers');
    res.render('greeted', {
        users: result
    });

});

app.get('/counter/:user', async function (req, res) {
    let userName = req.params.user;
    let result = await greetings.greetedUsers(userName);
    res.render('counter', result);
});

app.get('/admin', async function (req, res) {
    res.render('admin')
});
app.post('/admin', async function (req, res) {
    let message = await greetings.reset()
    res.render('admin', {
        message
    });
})

app.listen(PORT, function () {
    console.log("App Started at", PORT)
});