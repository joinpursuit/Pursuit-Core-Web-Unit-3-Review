const { db, helpers, errors } = require("../db/index.js");

const optionalCol = col => ({
  name: col,
  skip: (col) => col.value === null || col.value === undefined || !col.exists
})

const getAllTodos = async (params) => {
  let { owner, completed } = params
  let SQL = "SELECT * FROM todos"

  if (owner && completed) {
    SQL += " WHERE owner = $/owner/ AND completed = $/completed/"
  } else if (owner) {
    SQL += " WHERE owner = $/owner/"
  } else if (completed) {
    SQL += " WHERE completed = $/completed/"
  }

  let todos;
  try {
    todos = await db.any(SQL, params);
    return todos;
  } catch (err) {
    throw err;
  }
}

const getTodo = async (id) => {
  let todo;

  try {
    todo = await db.one("SELECT * FROM todos WHERE id = $/id/", { id });
    return todo;
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
      err.code === errors.queryResultErrorCode.noData) {
      todo = false
      return todo;
    }
    throw (err)
  }
}

const createTodo = async (todo) => {
  let newTodo;
  try {
    newTodo = await db.one(`INSERT INTO todos(id, owner, text) 
      VALUES($/id/, $/owner/, $/text/) RETURNING *`, todo)
    return newTodo;
  } catch (err) {
    let customErr = `owner '${todo.owner}' doesn't exist.`
    if (err.code === "23503") {
      err = customErr
    }
    throw err;
  }
}

const removeTodo = async (id) => {
  let todo;
  try {
    todo = await db.one(`DELETE FROM todos WHERE id = $/id/ RETURNING *`, { id });
    return todo;
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
      err.code === errors.queryResultErrorCode.noData) {
      todo = false
      return todo;
    }
    throw (err)
  }
}

const updateTodo = async (id, todoEdits) => {
  const columnSet = new helpers.ColumnSet([
    optionalCol("text"),
    optionalCol("completed"),
    optionalCol("owner"),
  ], { table: "todos" })

  const updateQuery = `${helpers.update(todoEdits, columnSet)} 
    WHERE id = $/id/ RETURNING *`;

  let todo;
  try {
    todo = await db.one(updateQuery, { id })
    return todo
  } catch (err) {
    if (
      (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData)
      ||
      (err.code === "23503") //New owner not in table 
    ) {
      todo = false
      return todo;
    }
    throw (err)
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  removeTodo,
  updateTodo,
};
