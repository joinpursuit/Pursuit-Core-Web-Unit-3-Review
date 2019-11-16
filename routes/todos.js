const express = require('express');
const router = express.Router();

const Todos = require("../models/Todos");
const helpers = require("../db/helpers")

router.get('/', async (req, res, next) => {
  const queryParams = req.query;
  try {
    const todos = await Todos.getAllTodos(queryParams);
    res.json({
      payload: todos,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.post('/', async (req, res, next) => {
  const newTodo = {
    id: helpers.genId(),
    ...req.body
  }
  const expectedProps = ["owner", "text"];
  const missingProps = helpers.missingProps(expectedProps, newTodo)

  if (missingProps.length) {
    return res.status(400).json({
      payload: `Expected valid values for todo [${missingProps}]`,
      err: true
    })
  }

  try {
    const todo = await Todos.createTodo(newTodo);
    res.status(201).json({
      payload: todo,
      err: false
    })
  } catch (err) {
    if (typeof err === "string") {
      res.status(400).json({
        payload: err,
        err: true
      })
    } else {
      next(err)
    }
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await Todos.getTodo(id);
    if (!todo) {
      return res.status(404).json({
        payload: {
          msg: "Todo not found"
        },
        err: true
      })
    }

    res.json({
      payload: todo,
      err: false
    })

  } catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todos.removeTodo(id);
    if (deletedTodo) {
      return res.json({
        payload: deletedTodo,
        err: false
      })
    }

    res.status(418).json({})
  } catch (err) {
    next(err)
  }
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const todo_edits = req.body
  try {
    const updatedTodo = await Todos.updateTodo(id, todo_edits);
    let awardedUser;
    if (updatedTodo) {
      return res.json({
        payload: updatedTodo,
        user: awardedUser,
        err: false
      })
    }

    res.status(404).json({
      payload: {
        msg: "Todo not found"
      },
      err: true
    })
  } catch (err) {
    next(err)
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const todo_edits = req.body
  const expectedProps = ["owner", "text", "completed"];
  const missingProps = helpers.missingProps(expectedProps, todo_edits)

  if (missingProps.length) {
    return res.status(400).json({
      payload: `Missing valid values to put todo [${missingProps}]`,
      err: true
    })
  }

  try {
    const todo = await Todos.getTodo(id);

    if (todo) { // Todo already exits, trying to update
      const updatedTodo = await Todos.updateTodo(id, todo_edits);
      if (!updatedTodo) {
        return res.status(400).json({
          payload: {
            msg: "New owner doesn't exist. Verify your data and try again"
          },
          err: true
        })
      }

      return res.json({
        payload: updatedTodo,
        err: false
      })
    } else { // create todo with id in params
      const newTodo = await Todos.createTodo({
        id,
        ...todo_edits
      });
      return res.status(201).json({
        payload: newTodo,
        err: false
      })
    }

  } catch (err) {
    next(err)
  }
});

router.all('/', (req, res, next) => {
  res.status(405).json({
    payload: "Nah, nah, nah",
    err: true
  })
})

module.exports = router;
