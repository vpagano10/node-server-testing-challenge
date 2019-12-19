const Users = require('./users-model');
const db = require('../data/dbConfig');

describe('users model', function() {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('insert()', function() {
        it ('should add the user to the database', async function() {
            await Users.insert({ name: 'Vinny' });
            await Users.insert({ name: 'vinny2' });
            const Users = await db('users');
            expect(users).toHaveLength(2);
        });
    });

});