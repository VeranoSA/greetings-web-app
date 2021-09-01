const express = require('express');
const app = express();
const greetLangRadio = require("./greet");
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

app.use(session({
    secret : "Error Message",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

let helper = helperfunction();

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

app.get('/', (req, res) => {
    if(req.body.Names==="" && req.body.languageRadio===undefined){
        req.flash('info', "Please enter a name and Select a language!");
    }
    res.render('index', {
        greeting : helper.getMsg(),
        counter : helper.getCounter(),
    });
});

app.post('/greeted', (req, res) => {
    helper.greeting(req.body.Names, req.body.languageRadio);
    if(req.body.Names==="" && req.body.languageRadio===undefined){
        req.flash('info', "Please enter a name and select a language!");
    } else if(req.body.languageRadio===undefined){
        req.flash('info', "Please select a language!");
    } else if(req.body.Names===""){
        req.flash('info', "Please enter a name!");
    }
    else if(req.body.Names!=="" && req.body.languageRadio!==undefined){
        req.flash('info', "Name succesfully greeted!");
    }
    res.redirect('/')
});

app.post('/greeting', (req, res) => {

    res.send("")
});

app.get("/results", (req, res) => {
    res.send("")
})

const PORT = process.env.PORT || 3012; //Make my port number configurable

app.listen(PORT, function () {
    console.log("App Started at", PORT)
});