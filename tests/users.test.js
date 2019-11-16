const app = require('../app');
// const expect = require('chai').expect;
const request = require('supertest');
const resetDB = require('./resetDB');

beforeAll(() => {
  return resetDB()
})

describe('User functionality and routes', () => {
  it('[POST] to /users - Should add a new user', (done) => {
    expect.assertions(3)
    request(app)
      .post('/users/signup')
      .send({ username: "JonSnow123" })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(201)

        const data = res.body
        expect(data.payload).toEqual({
          msg: "User created",
          user: {
            id: 1,
            username: "JonSnow123"
          }
        })
        expect(data.err).toBeFalsy()
        done()
      })
  })

  it('[GET] to /users - Should get all users', (done) => {
    expect.assertions(3)
    request(app)
      .get('/users')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)

        const data = res.body
        expect(data.payload).toEqual(expect.any(Array))
        expect(data.err).toBeFalsy()
        done()
      })
  })
})
