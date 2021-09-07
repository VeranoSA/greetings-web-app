'use strict'

const assert = require('assert');
const helperfunction = require('../greet_helper');
const pg = require('pg');
const Pool =pg.Pool;

const pool = new Pool({
    user: 'tcjuiobxjjyuem',
    host: 'ec2-44-197-94-126.compute-1.amazonaws.com',
    database: 'd4t968b5v0lopc',
    password: '4453f68486dd6981ce17e604f18a4d0b7dfb16a410de1c7cf0d6e20a22a6d8d4',
    port: 5432,
    ssl: true
});

const greet = helperfunction(pool);

describe('Greetings Web Unit Testing' , function(){
    beforeEach(async function () {
        await pool.query('delete from users;');
    });
    // Testing first case functionality
    it('Should greet Cara with proper first letter capital when given a all lowercase name', async function () {
        await greet.name('cara');
        await greet.language('English');
        assert.equal(await greet.greet(), 'Hello Cara!');
    });

    it('Should greet Makho with proper first letter capital when given a all UPPERCASE name', async function () {
        await greet.name('makho');
        await greet.language('English');
        assert.equal(await greet.greet(), 'Hello Makho!');
    })

    // Testing languages

    it('Should greet Pholisa in English', async function () {
        await greet.name('Pholisa');
        await greet.language('English');
        assert.equal(await greet.greet(), 'Hello Pholisa!');
    });
    it('Should greet Andre in xiTsonga', async function () {
        await greet.name('Andre');
        await greet.language('Tsonga');
        assert.equal(await greet.greet(), 'Avuxeni Andre!');
    });
    it('Should greet Thabang in Afrikaans', async function () {
        await greet.name('Thabang');
        await greet.language('Zulu');
        assert.equal(await greet.greet(), 'Saubona Thabang!');
    });

    // Testing for name storage in database
    it('Should add a user into the database when greeting', async function () {
        await greet.name('Amogelang');
        await greet.language('English');
        await greet.greet();
        let result = await greet.greetedUsers('Amogelang');
        assert.equal(result.username, 'Amogelang');
    });
    // Testing for counter
    it('Should return a count of all people greeted', async function () {
        await greet.name('Pholisa');
        await greet.language('English');
        await greet.greet();
        await greet.name('Andre');
        await greet.language('English');
        await greet.greet();
        await greet.name('Cara');
        await greet.language('English');
        await greet.greet();

        let result = await greet.getCounter();
        assert.equal(result, 3);
    });
    it('Should return the correct number of times a certain user was greeted', async function () {
        await greet.name('Pholisa');
        await greet.language('English');
        await greet.greet();
        await greet.greet();
        await greet.greet();
        await greet.greet();
        await greet.greet();
        await greet.name('Cara');
        await greet.language('English');
        await greet.greet();
        await greet.greet();
        await greet.greet();
        await greet.name('Andre');
        await greet.language('English');
        await greet.greet();

        let result = await greet.greetedUsers('Pholisa');
        assert.equal(result.greet_count, 5);

        let result2 = await greet.greetedUsers('Cara');
        assert.equal(result2.greet_count, 3);

        let result3 = await greet.greetedUsers('Andre');
        assert.equal(result3.greet_count, 1);
    });
    // Testing for deletion
    it('Should delete all records from the database', async function () {
        let result = await greet.reset();
        assert.equal(result, 'Reccords have been cleared successfully.');
        assert.equal(await greet.getCounter(), 0);
    })

});
