'use strict'

const assert = require('assert');
const helperfunction = require('../routes/greet_helper');
const pg = require('pg');
const Pool =pg.Pool;


const connectionString = 'postgres://tcjuiobxjjyuem:4453f68486dd6981ce17e604f18a4d0b7dfb16a410de1c7cf0d6e20a22a6d8d4@ec2-44-197-94-126.compute-1.amazonaws.com:5432/d4t968b5v0lopc'

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

/*
//Database Set Up
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'greetings',
    password: 'Tebogo13#',
    port: 5432,

});
*/
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
    it('Should greet Andre in Tshitsonga', async function () {
        await greet.name('Andre');
        await greet.language('Tsonga');
        assert.equal(await greet.greet(), 'Avuxeni Andre!');
    });
    it('Should greet Thabang in Afrikaans', async function () {
        await greet.name('Thabang');
        await greet.language('Zulu');
        assert.equal(await greet.greet(), 'Saubona Thabang!');
    });

    // Testing for deletion
    it('Should delete all records from the database', async function () {
        let result = await greet.reset();
        assert.equal(result, 'Database cleared successfully.');
        assert.equal(await greet.getCounter(), 0);
    })

});