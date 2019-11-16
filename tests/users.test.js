const app = require('../app');
// const expect = require('chai').expect;
const request = require('supertest');
const resetDB = require('./resetDB');

beforeAll(() => {
  return resetDB()
})

describe('User functionality and routes', () => {
  it('[POST] to /users - Should add a new user', (done) => {
    expect.assertions(4)
    request(app)
      .post('/users/signup')
      .send({ username: "JonSnow123" })
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(201)
        expect(data.payload.msg).toEqual("User created")
        expect(data.payload.user.username).toEqual("JonSnow123")
        expect(data.err).toBeFalsy()
        done()
      })
  })

  it('[POST] to /users with repeated username should return error', (done) => {
    expect.assertions(2)
    request(app)
      .post('/users/signup')
      .send({ username: "JonSnow123" })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(409)
        expect(res.body.err).toBeTruthy()
        done()
      })
  })

  it('[POST] to /users - Adding a second new user should succeeds', (done) => {
    expect.assertions(4)
    request(app)
      .post('/users/signup')
      .send({ username: "AryaStark" })
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(201)
        expect(data.payload.msg).toEqual("User created")
        expect(data.payload.user.username).toEqual("AryaStark")
        expect(data.err).toBeFalsy()
        done()
      })
  })

  it('[GET] to /users - Should get all users', (done) => {
    expect.assertions(4)
    request(app)
      .get('/users')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status;
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data.payload).toEqual(expect.any(Array))
        expect(data.payload.length).toBe(2)
        expect(data.err).toBeFalsy()
        done()
      })
  })

  it('[POST] to /users/signup without `username` in body data should return bad request error', (done) => {
    expect.assertions(2)
    request(app)
      .post('/users/signup')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status;
        const data = res.body

        expect(statusCode).toBe(400)
        expect(data.err).toBeTruthy()
        done()
      })
  })
})
