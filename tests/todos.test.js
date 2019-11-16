const app = require('../app'); const request = require('supertest');
const Users = require('../models/Users')
const resetDB = require('./resetDB');

beforeAll(async () => {
  try {
    await resetDB();
    await Users.createUser({ username: "JonSnow123" })
  } catch (err) {
    throw err
  }
})

describe('Todos functionality and routes', () => {
  it('[POST] to /todos - Should add a new todo', (done) => {
    expect.assertions(5)

    const todoText = "1st Todo"
    const todoOwner = "JonSnow123"

    request(app)
      .post('/todos')
      .send({
        text: todoText,
        owner: todoOwner
      })
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(201)
        expect(data.payload.text).toEqual(todoText)
        expect(data.payload.owner).toEqual(todoOwner)
        expect(data.payload.completed).toBe(false)
        expect(data.err).toBeFalsy()
        done()
      })
  })

})
