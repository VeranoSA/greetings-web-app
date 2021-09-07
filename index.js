const express = require('express');
const app = express();
const colors = require('colors');
const helperfunction = require('./greet_helper');
const flash = require('express-flash');
const session = require('express-session')
const exphbs  = require('express-handlebars');
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});
var bodyParser = require('body-parser');

let fullPage = {
    userData: {
        greeting: ''
    },
    counter: 0
}

app.use(session({
    secret : "Tebogo Seanego",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

// DB Setup 
//Set up an configaration on were we want to connect the database
const {
    Pool
} = require('pg');
// Heroku pool
const pool = new Pool({
    user: 'tcjuiobxjjyuem',
    host: 'ec2-44-197-94-126.compute-1.amazonaws.com',
    database: 'd4t968b5v0lopc',
    password: '4453f68486dd6981ce17e604f18a4d0b7dfb16a410de1c7cf0d6e20a22a6d8d4',
    port: 5432
});

app.use(session({
    secret : "Error Message",
    resave: false,
    saveUninitialized: true
}));

let greetings = helperfunction(pool);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.urlencoded({extended: false}));

app.use(flash());

// Routes
app.get('/', async function (req, res) {
    fullPage.counter = await greetings.getCounter();
    res.render('index', fullPage);
});

app.post('/greet', async function (req, res) {

    if (((req.body.userEnteredName === "" && req.body.radioLang !== undefined)) ||
    ((req.body.userEnteredName !== "" && req.body.radioLang === undefined)))
    {
        req.flash('info', 'Please enter a name and select a language!');
        res.redirect('/');

    } else {
        greetings.name(req.body.userEnteredName);
        greetings.language(req.body.radioLang);
        req.flash('info', "Name succesfully greeted!");
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

const PORT = process.env.PORT || 3012; //Make my port number configurable

app.listen(PORT, function () {
    console.log("App Started at", PORT)
});