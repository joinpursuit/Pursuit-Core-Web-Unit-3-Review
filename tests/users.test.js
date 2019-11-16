const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('User functionality and routes', () => {
  it('[GET] to /users - Should get all users', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
