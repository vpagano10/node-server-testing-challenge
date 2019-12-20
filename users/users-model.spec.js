const request = require('supertest');
const server = require('../api/server');
const Users = require('./users-model');
const db = require('../data/dbConfig');

describe('users model', function() {
    describe('users', function() {
        describe('GET /', function() {
            it ('should return status 200', function() {
                return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                });
            });
        });
        

    });
});