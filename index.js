const express = require('express');
const app = express();
const greetLangRadio = require("./greet");
const helperfunction = require('./greet_helper');
const exphbs  = require('express-handlebars');
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});
var bodyParser = require('body-parser');

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



app.get('/', (req, res) => {
    res.render('index', {
        greeting : helper.getMsg(),
        counter : helper.getCounter(),
        errormessages : helper.allErrors()
    });
});

app.post('/greeted', (req, res) => {
    helper.greeting(req.body.Names, req.body.languageRadio);

    res.redirect('/')
});

app.post('/greeting', (req, res) => {

    res.send("thanks for greeting this name.")
});

app.get("/results", (req, res) => {
    res.send("please enter a correct name!")
})

app.listen(3012);