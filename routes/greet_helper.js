module.exports = function (client) {
    // the client parameter in this function referes to a pool of clients and not only one
    let greetData = {
        name: '',
        lang: '',
        greeting: ''
    };
    //fix the format of the name
    let fixName = function (inputName) {
        inputName = inputName.toString().toLowerCase();
        let tmpString = inputName.substr(1, inputName.length);
        let firstCh = inputName.charAt(0).toUpperCase();
        let correctName = firstCh + tmpString;
        return correctName;
    };

    // setter functions
    const setName = function (name) {
        greetData.name = fixName(name);
    }
    const setLang = function (language) {
        greetData.lang = language;
    }

    //return greeting given name and language
    let greetNow = function (name, language) {
        if (language === 'English') {
            return 'Hello ' + name + '!';
        };
        if (language === 'Zulu') {

            return 'Saubona ' + name + '!';
        };

        if (language === 'Tsonga') {

            return 'Avuxeni ' + name + '!';
        };
    };

    let processGreeting = async function () {
        let name = greetData.name;
        let language = greetData.lang;
        const sql = 'SELECT id FROM users WHERE username=$1';
        const params = [name];
        let result = await client.query(sql, params);

        if (result.rows.length == 0) {
            const sql = 'INSERT into users (username,greet_count) values ($1,$2)';
            const params = [name, 1];
            let result = await client.query(sql, params);
            return await greetNow(name, language);
        };
        if (result.rows.length == 1) {
            const sql = 'UPDATE users SET greet_count = greet_count+1 WHERE username=$1';
            const params = [name];
            let result = await client.query(sql, params);
            return await greetNow(name, language);
        };
    };

    // return greeted user/all users
    let greetedUsers = async function (name) {
        let result = await client.query('SELECT * FROM users');
        if (name == 'allUsers' || name === "") {
            if (result.rowCount == 0) {
                return [{
                    message: 'Oops! No users have been greeted yet.'
                }]

            } else {
                return await result.rows.reverse();
            }

        } else {
            const params = [name];
            const sql = ('SELECT * FROM users WHERE username=$1');
            let result = await client.query(sql, params)
            return await result.rows[0];
        };
    };


    // return counter
    let counter = async function () {
        let sql = ('SELECT id FROM users');
        let result = await client.query(sql);
        return result.rowCount;
    };


    let deleteUsers = async function () {
        let sql = ('DELETE FROM users');
        let result = await client.query(sql);
        return 'Database cleared successfully.';
    }
    //Routes logic Starts Here
    async function routesLogic0(req, res){
        res.render('index', {
            userData: {
                greeting: ''
            },
            counter: await counter()
        });
    };

    async function routesLogic1(req, res) {

        if (((req.body.userEnteredName === "" && req.body.radioLang !== undefined)) ||
            ((req.body.userEnteredName !== "" && req.body.radioLang === undefined)) ||
            ((req.body.userEnteredName === "" && req.body.radioLang === undefined))) {
            req.flash('info', 'Please enter a name and select a language!');
            res.redirect('/');

        } else {
            setName(req.body.userEnteredName);
            setLang(req.body.radioLang);
            req.flash('info2', "Name succesfully greeted!");
            res.render('index', {
                userData: {
                    greeting: await processGreeting()
                },
                counter: await counter()
            });
        };

    };

    async function routesLogic2(req, res) {
        let result = await greetedUsers('allUsers');
        res.render('greeted', {
            users: result
        });
    };

    async function routesLogic3(req, res) {
        let userName = req.params.user;
        let result = await greetedUsers(userName);
        res.render('counter', result);
    };

    async function routesLogic4(req, res) {
        res.render('admin')
    };

    async function routesLogic5(req, res){
        let message = await deleteUsers()
        res.render('admin', {
            message
        });
    }

    //Routes Logic Ends Here

    return {
        language: setLang,
        name: setName,
        greet: processGreeting,
        format: fixName,
        greetData,
        getCounter: counter,
        greetedUsers,
        reset: deleteUsers,
        routesLogic0,
        routesLogic1,
        routesLogic2,
        routesLogic3,
        routesLogic4,
        routesLogic5
    };
};