const request = require('supertest');
const server = require('./server');

describe('server.js', function() {

    describe('GET /', function() {
        it ('should return a 200 OK', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
            })
        });
        
        it ('should return Welcome to the users API', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body.message).toBe('Welcome to the users API')
            });
        });
    
    });
    
    describe('POST /', function() {
        it.skip ('Auth example', function() {
            return request(server).post('/login')
                .send({ username: 'me', password: 'pass' })
                .then(res => {
                    const token = res.body.token
                    .get('/')
                    .set('Authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(Array.isArray(res.body)).toBe(true)
                    })
            });
        });
    });

});