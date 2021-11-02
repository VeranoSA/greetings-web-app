'use strict'

let express = require('express');
let app = express();
let PORT = process.env.PORT || 3012; //Make my port number configurable
let helperfunction = require('./routes/greet_helper');
const flash = require('express-flash');
let session = require('express-session')
let exphbs  = require('express-handlebars');
let bodyParser = require('body-parser');

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
//separated routes logic to greet_helper
app.get('/', greetings.routesLogic0);
app.post('/greet', greetings.routesLogic1);
app.get('/greeted', greetings.routesLogic2);
app.get('/counter/:user', greetings.routesLogic3);
app.get('/admin', greetings.routesLogic4);
app.post('/admin', greetings.routesLogic5);


app.listen(PORT, function () {
    console.log("App Started at", PORT)
});