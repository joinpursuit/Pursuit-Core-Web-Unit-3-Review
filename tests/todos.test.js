const app = require('../app'); const request = require('supertest');
const Users = require('../models/Users')
const resetDB = require('./resetDB');

const addFewTodos = async () => {
  const todos = [
    {
      text: "Buy milk",
      owner: "JonSnow123",
    },
    {
      text: "Do Laundry",
      owner: "NedStark",
    },
    {
      text: "Pay Energy bill",
      owner: "JonSnow123",
    }
  ]

  let promises = []
  for (let todo of todos) {
    promises.push(
      request(app)
        .post('/todos')
        .send(todo)
    )
  }
  await Promise.all(promises)
}

beforeAll(async () => {
  try {
    await resetDB();
    await Users.createUser({ username: "JonSnow123" })
    await Users.createUser({ username: "NedStark" })
    await addFewTodos()
  } catch (err) {
    throw err
  }
})

describe('Todos functionality and routes', () => {
  it('[POST] to /todos - Should add a new todo and return status 200', (done) => {
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

  it('[POST] to /todos without a pre-registered owner should return 400 status and error message', (done) => {
    expect.assertions(2)

    const todoText = "2nd Todo"
    const todoOwner = "AryaStark"

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

        expect(statusCode).toBe(400)
        expect(data.err).toBeTruthy()
        done()
      })
  })

  it('[POST] to /todos without a `owner` or `text` body data should return a 400 status and error message', (done) => {
    expect.assertions(2)

    request(app)
      .post('/todos')
      .send({})
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(400)
        expect(data.err).toBeTruthy()
        done()
      })
  })

  it('[GET] to /todos successfuly (status 200) retrieves all todos and returns them in an array.', (done) => {
    expect.assertions(4)

    request(app)
      .get('/todos')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data.payload).toEqual(expect.any(Array))
        expect(data.payload.length).toBe(4)
        expect(data.err).toBeFalsy()
        done()
      })
  })

  it('[PUT] to /todos/:id should fully update/replace a todo with status 200', async (done) => {
    expect.assertions(5)

    const addTodoToBeUpdated = async () => {
      const todo = {
        text: "Clean room",
        owner: "NedStark",
      }

      try {
        let { body } = await request(app)
          .post('/todos')
          .send(todo)
        return body.payload
      } catch (err) {
        throw err
      }
    }

    let todoToUpdate = await addTodoToBeUpdated();

    request(app)
      .put(`/todos/${todoToUpdate.id}`)
      .send({
        text: 'Clean Castle',
        owner: 'NedStark',
        completed: true
      })
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data.payload.id).toBe(todoToUpdate.id)
        expect(data.payload.completed).toBe(true)
        expect(data.payload.text).toBe("Clean Castle")
        expect(data.err).toBeFalsy()
        done()
      })
  })

  it('[PUT] to /todos/101 should fully create a new todo with id 101. Return a 201 status', async (done) => {
    expect.assertions(3)

    const todo = {
      text: "Clean room",
      owner: "NedStark",
      completed: "false" // TODO fix backend. If completed true it is not being take into account when PUT
    }


    request(app)
      .put('/todos/101')
      .send(todo)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(201)
        expect(data.payload.completed).toBe(false)
        expect(data.payload.text).toBe(todo.text)
        done()
      })
  })

  it('[PATCH] to /todos/101 should update text and set completed to true on todo 101. Returns a 200 status', async (done) => {
    expect.assertions(4)

    const todo = {
      text: "Clean Patio",
      completed: "true"
    }

    request(app)
      .patch('/todos/101')
      .send(todo)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data.payload.text).toBe(todo.text)
        expect(data.payload.owner).toBe("NedStark")
        expect(data.payload.completed).toBe(true)
        done()
      })
  })

  it('[DELETE] to /todos/101 should remove todo with id 101 and returns 200 status code', async (done) => {
    expect.assertions(5)

    const removedTodoProps = {
      text: "Clean Patio",
      completed: "true"
    }

    request(app)
      .delete('/todos/101')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data.payload.text).toBe(removedTodoProps.text)
        expect(data.payload.id).toBe("101")
        expect(data.payload.owner).toBe("NedStark")
        expect(data.payload.completed).toBe(true)
        done()
      })
  })


  it('[GET] to /todos with `owner` query params retrieves all todos belonging to `owner`. Returns 200 status code', (done) => {
    expect.assertions(4)

    request(app)
      .get('/todos')
      .query({ owner: 'JonSnow123' })
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data.payload).toEqual(expect.any(Array))
        expect(data.payload.length).toBe(3)
        expect(data.err).toBeFalsy()
        done()
      })
  })

  // TODO test deleting a non-existent todo
  // TODO test PUT with a non-existent owner
  // TODO fix put with completed true case mentioned above
  // TODO test getting todos with query string `completed=true`
  // TODO test getting with query string combination of `owner` & `completed`
})
